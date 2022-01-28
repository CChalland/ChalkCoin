import cryptoHash from "../util/cryptoHash";
import hexToBinary from "../util/hexToBinary";
import CONFIG from "../config";

const GENESIS_DATA = {
	timestamp: 1,
	last_hash: "genesis_last_hash",
	hash: "genesis_hash",
	data: [],
	difficulty: 3,
	nonce: "genesis_nonce",
};

class Block {
	/* Block: a unit of storage.
    Store transactions in a blockchain that supports a cryptocurrency. */
	constructor(timestamp, last_hash, hash, data, difficulty, nonce) {
		this.timestamp = timestamp;
		this.last_hash = last_hash;
		this.hash = hash;
		this.data = data;
		this.difficulty = difficulty;
		this.nonce = nonce;
	}

	mineBlock(last_block, data) {
		/*  Mine a block based on the given last_block and data, until a block hash
        is found that meets the leading 0's proof of work requirement. */
		let timestamp = Date.now();
		let last_hash = last_block.hash;
		let difficulty = this.adjustDifficulty(last_block, timestamp);
		let nonce = 0;
		let hash = cryptoHash(timestamp, last_hash, data, difficulty, nonce);

		while (hexToBinary(hash).slice(0, difficulty) !== "0" * difficulty) {
			nonce += 1;
			timestamp = time.time_ns();
			difficulty = Block.adjust_difficulty(last_block, timestamp);
			hash = cryptoHash(timestamp, last_hash, data, difficulty, nonce);
		}
		return Block(timestamp, last_hash, hash, data, difficulty, nonce);
	}

	genesis() {
		/* Generate the genesis block. */
		return Block(...GENESIS_DATA);
	}

	adjustDifficulty(last_block, new_timestamp) {
		/*  Calculate the adjusted difficulty according to the MINE_RATE.
        Increase the difficulty for quickly mined blocks.
        Decrease the difficulty for slowly mined blocks. */
		if (new_timestamp - last_block.timestamp < CONFIG.MINE_RATE) {
			return last_block.difficulty + 1;
		}
		if (last_block.difficulty - 1 > 0) {
			return last_block.difficulty - 1;
		}
		return 1;
	}

	isValidBlock(last_block, block) {
		/* Validate block by enforcing the following rules:
        - the block must have the proper last_hash reference
        - the block must meet the proof of work requirement
        - the difficulty must only adjust by 1
        - the block hash must be a valid combination of the block fields */
		if (block.last_hash !== last_block.hash) {
			throw new Error("The block last_hash must be correct");
		}

		if (Math.abs(last_block.difficulty - block.difficulty) > 1) {
			throw new Error("The block difficulty must only adjust by 1");
		}

		if (hexToBinary(block.hash).slice(0, block.difficulty) !== "0" * block.difficulty) {
			throw new Error("The proof of work requirement was not met");
		}

		let reconstructed_hash = cryptoHash(
			block.timestamp,
			block.last_hash,
			block.data,
			block.nonce,
			block.difficulty
		);

		if (block.hash !== reconstructed_hash) {
			throw new Error("The block hash must be correct");
		}
	}
}

export default Block;
