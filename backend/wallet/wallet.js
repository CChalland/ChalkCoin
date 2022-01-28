import { v4 as uuidv4 } from "uuid";

import CONFIG from "../config";

class Wallet {
	/*  An individual wallet for a miner.
    Keeps track of the miner's balance.
    Allows a miner to authorize transactions. */
	constructor(blockchain = null) {
		this.blockchain = blockchain;
		this.address = "";
		this.private_key = "";
		this.public_key;
		this.serialize_public_key;
	}
}

export default Wallet;
