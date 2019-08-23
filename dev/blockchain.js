const sha256 = require("sha256");
const currentNodeUrl = process.argv[3];
const uuid = require("uuid/v1");

function Betoken() {
  this.chain = [];
  this.completedTransactions = [];
  this.pendingTransactions = [];
  this.openTransactions = [];

  this.currentNodeUrl = currentNodeUrl;
  this.networkNodes = [];

  this.createNewBlock(1, "0", "0");
}

Betoken.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.completedTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash
  };

  this.completedTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

Betoken.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
};

Betoken.prototype.createNewTransaction = function(
  amount,
  sender,
  recipient,
  sport,
  event_id,
  event_spread,
  description
) {
  const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient,
    sport: sport,
    event_id: event_id,
    event_spread: event_spread,
    description: description,
    accepted: false,
    completed: false,
    transactionId: uuid()
      .split("-")
      .join("")
  };

  return newTransaction;
};

Betoken.prototype.addTransactionToCompletedTransactions = function(transactionObj) {
  this.completedTransactions.push(transactionObj);
  return this.getLastBlock()["index"] + 1;
};

Betoken.prototype.addTransactionToPendingTransactions = function(transactionObj) {
  this.pendingTransactions.push(transactionObj);
  return this.getLastBlock()["index"] + 1;
};

Betoken.prototype.addTransactionToOpenTransactions = function(transactionObj) {
  this.openTransactions.push(transactionObj);
  return this.getLastBlock()["index"] + 1;
};

Betoken.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
  const dataAsString =
    previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataAsString);
  return hash;
};

Betoken.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
  // => Repeatedly hash block until it finds correct hash => '0000OIANSDFUI08N9N09ASND9FN0'
  // => uses current block data for the hash, but also previousBlockHash
  // => continuously changes nonce value until it finds the correct hash
  // => returns to us the nonce value that creates the correct hash
  let nonce = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== "0000") {
    // Showing the hash cycling through until the hash's first characters are '0000'
    //console.log(hash);
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};

Betoken.prototype.chainIsValid = function(blockchain) {
  let validChain = true;

  for (var i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const prevBlock = blockchain[i - 1];
    const blockHash = this.hashBlock(
      prevBlock["hash"],
      {
        transactions: currentBlock["transactions"],
        index: currentBlock["index"]
      },
      currentBlock["nonce"]
    );
    if (blockHash.substring(0, 4) !== "0000") validChain = false;
    if (currentBlock["previousBlockHash"] !== prevBlock["hash"]) validChain = false; // chain not valid

    console.log("previousBlockHash =>", prevBlock["hash"]);
    console.log("currentBlockHash =>", currentBlock["hash"]);
  }

  const genesisBlock = blockchain[0];
  const correctNonce = genesisBlock["nonce"] === 100;
  const correctPreviousBlockHash = genesisBlock["previousBlockHash"] === "0";
  const correctHash = genesisBlock["hash"] === "0";
  const correctTransactions = genesisBlock["transactions"].length === 0;

  if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions)
    validChain = false;

  return validChain;
};

Betoken.prototype.getBlock = function(blockHash) {
  let correctBlock = null;
  this.chain.forEach(block => {
    if (block.hash === blockHash) correctBlock = block;
  });
  return correctBlock;
};

Betoken.prototype.getTransaction = function(transactionId) {
  let correctTransaction = null;
  let correctBlock = null;

  this.chain.forEach(block => {
    block.transactions.forEach(transaction => {
      if (transaction.transactionId === transactionId) {
        correctTransaction = transaction;
        correctBlock = block;
      }
    });
  });
  return {
    transaction: correctTransaction,
    block: correctBlock
  };
};

Betoken.prototype.getAddressData = function(address) {
  const addressTransactions = [];
  this.chain.forEach(block => {
    block.transactions.forEach(transaction => {
      if (transaction.sender === address || transaction.recipient === address) {
        addressTransactions.push(transaction);
      }
    });
  });

  let balance = 0;
  addressTransactions.forEach(transaction => {
    if (transaction.recipient === address) balance += transaction.amount;
    if (transaction.sender === address) balance -= transaction.amount;
  });

  return {
    addressTransactions: addressTransactions,
    addressBalance: balance
  };
};

module.exports = Betoken;
