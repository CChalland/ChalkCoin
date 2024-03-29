const sha256 = require("sha256");
const currentNodeUrl = process.argv[3];
const uuid = require("uuid/v1");

function Blockchain() {
	this.chain = [];
	this.pendingTransactions = [];

	this.currentNodeUrl = currentNodeUrl;
	this.networkNodes = [];

	// Genesis Block, the parameters can be arbitrary
	this.createNewBlock(100, "0", "0");
}

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce,
		hash: hash,
		previousBlockHash: previousBlockHash,
	};

	this.pendingTransactions = [];
	this.chain.push(newBlock);

	return newBlock;
};

Blockchain.prototype.getLastBlock = function () {
	return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function (amount, sender, recipient, details) {
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,
		details: details,
		transactionId: uuid().split("-").join(""),
	};

	return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function (transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return { blockIndex: this.getLastBlock()["index"] + 1, transactionData: transactionObj };
};

Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
	const hash = sha256(dataAsString);
	return hash;
};

Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
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

Blockchain.prototype.chainIsValid = function (blockchain) {
	let validChain = true;

	for (var i = 1; i < blockchain.length; i++) {
		const currentBlock = blockchain[i];
		const prevBlock = blockchain[i - 1];
		const blockHash = this.hashBlock(
			prevBlock["hash"],
			{ transactions: currentBlock["transactions"], index: currentBlock["index"] },
			currentBlock["nonce"]
		);
		if (blockHash.substring(0, 4) !== "0000") validChain = false;
		if (currentBlock["previousBlockHash"] !== prevBlock["hash"]) validChain = false; // chain not valid

		// console.log("previousBlockHash =>", prevBlock["hash"]);
		// console.log("currentBlockHash =>", currentBlock["hash"]);
	}

	const genesisBlock = blockchain[0];
	const correctNonce = genesisBlock["nonce"] === 100;
	const correctPreviousBlockHash = genesisBlock["previousBlockHash"] === "0";
	const correctHash = genesisBlock["hash"] === "0";
	const correctTransactions = genesisBlock["transactions"].length === 0;

	if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

	return validChain;
};

Blockchain.prototype.getBlock = function (blockHash) {
	let correctBlock = null;
	this.chain.forEach((block) => {
		if (block.hash === blockHash) correctBlock = block;
	});
	return correctBlock;
};

Blockchain.prototype.getTransaction = function (transactionId) {
	let correctTransaction = null;
	let correctBlock = null;

	this.chain.forEach((block) => {
		block.transactions.forEach((transaction) => {
			if (transaction.transactionId === transactionId) {
				correctTransaction = transaction;
				correctBlock = block;
			}
		});
	});
	return {
		transaction: correctTransaction,
		block: correctBlock,
	};
};

Blockchain.prototype.getAddressData = function (address) {
	const addressTransactions = [];
	this.pendingTransactions.forEach((transaction) => {
		if (transaction.sender === address || transaction.recipient === address) {
			addressTransactions.push(transaction);
		}
	});
	this.chain.forEach((block) => {
		block.transactions.forEach((transaction) => {
			if (transaction.sender === address || transaction.recipient === address) {
				addressTransactions.push(transaction);
			}
		});
	});

	let balance = 0;
	addressTransactions.forEach((transaction) => {
		if (transaction.recipient === address) balance += transaction.amount;
		if (transaction.sender === address) balance -= transaction.amount;
	});

	return {
		addressTransactions: addressTransactions,
		addressBalance: balance,
	};
};

module.exports = Blockchain;
