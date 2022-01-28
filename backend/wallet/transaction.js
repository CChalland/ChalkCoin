import { v4 as uuidv4 } from "uuid";
import Wallet from "./wallet";
import { MINING_REWARD, MINING_REWARD_INPUT } from "../config";

class Transaction {
	/* Document of an exchange in currency from a sender to one
   or more recipients. */
	constructor(sender_wallet = null, recipient = null, amount = null, id = null, output = null, input = null) {
		this.id = id || "";
		this.output = output || this.createOutput(sender_wallet, recipient, amount);
		this.input = input || this.createInput(sender_wallet, recipient, amount);
	}
}

export default Transaction;
