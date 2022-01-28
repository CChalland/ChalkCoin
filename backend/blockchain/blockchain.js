import Block from "./block";
import Transaction from "../wallet/transaction";
import Wallet from "../wallet/wallet";
import { MINING_REWARD_INPUT } from "../config";

class Blockchain {
	/* Blockchain: a public ledger of transactions.
    Implemented as a list of blocks - data sets of transactions */
	constructor() {
		this.chain = [Block.genesis()];
	}
}

export default Blockchain;
