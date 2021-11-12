import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import BetCard from "../Bet/BetCard";
import TransactionCard from "../Blockchain/TransactionCard";

function BetCards({ tabBets, tabType, currentUser }) {
	let betsCards;
	if (tabBets) {
		betsCards = tabBets.map((bet, key) => {
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
						key={key}
					/>
				);
			} else {
				return <BetCard acceptState={false} bet={bet} currentUser={currentUser} key={key} />;
			}
		});
	} else {
		betsCards = <h1>Loading</h1>;
	}

	return betsCards;
}

export default BetCards;
