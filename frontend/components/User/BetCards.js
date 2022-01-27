import BetCard from "../Bet/BetCard";
import TransactionCard from "../Blockchain/TransactionCard";
import Loading from "../Utility/Loading";

function BetCards({ tabBets, tabType, currentUser }) {
	if (tabBets) {
		return tabBets.map((bet) => {
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
				return <BetCard bet={bet} currentUser={currentUser} key={bet.id} />;
			}
		});
	} else {
		return <Loading />;
	}
}

export default BetCards;
