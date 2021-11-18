import React from "react";
import BetCard from "../Bet/BetCard";
import TransactionCard from "../Blockchain/TransactionCard";

function BetCards({ tabBets, tabType, currentUser }) {
	let betsCards;
	if (tabBets) {
		betsCards = tabBets.map((bet) => {
			// console.log("BetCards - bet", bet);
			if (tabType === "Completed") {
				return (
					<TransactionCard
						transactionData={{
							amount: bet.amount,
							sender:
								bet.winnerId === bet.requesterId ? bet.requester?.walletAddress : bet.accepter?.walletAddress,
							recipient:
								bet.winnerId === bet.requesterId ? bet.accepter?.walletAddress : bet.requester?.walletAddress,
							details: bet.details,
							event: bet.event,
							transactionId: bet.transactionId,
						}}
						userAddress={currentUser.walletAddress}
						panelKey={bet.id}
						key={bet.id}
					/>
				);
			} else {
				return <BetCard acceptState={false} bet={bet} currentUser={currentUser} key={bet.id} />;
			}
		});
	} else {
		betsCards = <h1>Loading</h1>;
	}

	return betsCards;
}

export default BetCards;
