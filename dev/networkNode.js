const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const uuid = require("uuid/v1");
const port = process.argv[2];
const rp = require("request-promise");
const cors = require("cors");

const nodeAddress = uuid()
  .split("-")
  .join("");

const app = express();
const betoken = new Blockchain();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// get entire blockchain
app.get("/blockchain", function(req, res) {
  res.send(betoken);
});

// create a new transaction
app.post("/transaction", function(req, res) {
  const newTransaction = req.body;
  const blockIndex = betoken.addTransactionToPendingTransactions(
    newTransaction
  );
  res.json({
    note: `Transaction will be added in block ${blockIndex}.`
  });
});

// broadcast transaction
app.post("/transaction/broadcast", function(req, res) {
  const newTransaction = betoken.createNewTransaction(
    req.body.amount,
    req.body.sender,
    req.body.recipient,
    req.body.sport,
    req.body.event_id,
    req.body.event_spread,
    req.body.description
  );
  betoken.addTransactionToPendingTransactions(newTransaction);

  const requestPromises = [];
  betoken.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + "/transaction",
      method: "POST",
      body: newTransaction,
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises).then(data => {
    res.json({
      note: "Transaction created and broadcast successfully."
    });
  });
});

// mine a block
app.get("/mine", function(req, res) {
  const lastBlock = betoken.getLastBlock();
  const previousBlockHash = lastBlock["hash"];
  const currentBlockData = {
    transactions: betoken.pendingTransactions,
    index: lastBlock["index"] + 1
  };
  const nonce = betoken.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = betoken.hashBlock(
    previousBlockHash,
    currentBlockData,
    nonce
  );
  const newBlock = betoken.createNewBlock(nonce, previousBlockHash, blockHash);

  const requestPromises = [];
  betoken.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + "/receive-new-block",
      method: "POST",
      body: {
        newBlock: newBlock
      },
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then(data => {
      const requestOptions = {
        uri: betoken.currentNodeUrl + "/transaction/broadcast",
        method: "POST",
        body: {
          amount: 12.5,
          sender: "00",
          recipient: nodeAddress
        },
        json: true
      };

      return rp(requestOptions);
    })
    .then(data => {
      res.json({
        note: "New block mined & broadcast successfully",
        block: newBlock
      });
    });
});

// receive new block
app.post("/receive-new-block", function(req, res) {
  const newBlock = req.body.newBlock;
  const lastBlock = betoken.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousBlockHash;
  const correctIndex = lastBlock["index"] + 1 === newBlock["index"];

  if (correctHash && correctIndex) {
    betoken.chain.push(newBlock);
    betoken.pendingTransactions = [];
    res.json({
      note: "New block received and accepted.",
      newBlock: newBlock
    });
  } else {
    res.json({
      note: "New block rejected.",
      newBlock: newBlock
    });
  }
});

// register a node and broadcast it the network
app.post("/register-and-broadcast-node", function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  if (betoken.networkNodes.indexOf(newNodeUrl) == -1)
    betoken.networkNodes.push(newNodeUrl);

  const regNodesPromises = [];
  betoken.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + "/register-node",
      method: "POST",
      body: {
        newNodeUrl: newNodeUrl
      },
      json: true
    };

    regNodesPromises.push(rp(requestOptions));
  });

  Promise.all(regNodesPromises)
    .then(data => {
      const bulkRegisterOptions = {
        uri: newNodeUrl + "/register-nodes-bulk",
        method: "POST",
        body: {
          allNetworkNodes: [...betoken.networkNodes, betoken.currentNodeUrl]
        },
        json: true
      };

      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({
        note: "New node registered with network successfully."
      });
    });
});

// register a node with the network
app.post("/register-node", function(req, res) {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = betoken.networkNodes.indexOf(newNodeUrl) == -1;
  const notCurrentNode = betoken.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode)
    betoken.networkNodes.push(newNodeUrl);
  res.json({
    note: "New node registered successfully."
  });
});

// register multiple nodes at once
app.post("/register-nodes-bulk", function(req, res) {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent =
      betoken.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = betoken.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode)
      betoken.networkNodes.push(networkNodeUrl);
  });

  res.json({
    note: "Bulk registration successful."
  });
});

// consensus
app.get("/consensus", function(req, res) {
  const requestPromises = [];
  betoken.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + "/blockchain",
      method: "GET",
      json: true
    };

    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises).then(blockchains => {
    const currentChainLength = betoken.chain.length;
    let maxChainLength = currentChainLength;
    let newLongestChain = null;
    let newPendingTransactions = null;

    blockchains.forEach(blockchain => {
      if (blockchain.chain.length > maxChainLength) {
        maxChainLength = blockchain.chain.length;
        newLongestChain = blockchain.chain;
        newPendingTransactions = blockchain.pendingTransactions;
      }
    });

    if (
      !newLongestChain ||
      (newLongestChain && !betoken.chainIsValid(newLongestChain))
    ) {
      res.json({
        note: "Current chain has not been replaced.",
        chain: betoken.chain
      });
    } else {
      betoken.chain = newLongestChain;
      betoken.pendingTransactions = newPendingTransactions;
      res.json({
        note: "This chain has been replaced.",
        chain: betoken.chain
      });
    }
  });
});

// get block by blockHash
app.get("/block/:blockHash", function(req, res) {
  const blockHash = req.params.blockHash;
  const correctBlock = betoken.getBlock(blockHash);
  res.json({
    block: correctBlock
  });
});

// get transaction by transactionId
app.get("/transaction/:transactionId", function(req, res) {
  const transactionId = req.params.transactionId;
  const trasactionData = betoken.getTransaction(transactionId);
  res.json({
    transaction: trasactionData.transaction,
    block: trasactionData.block
  });
});

// get address by address
app.get("/address/:address", function(req, res) {
  const address = req.params.address;
  const addressData = betoken.getAddressData(address);
  res.json({
    addressData: addressData
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}...`);
});
