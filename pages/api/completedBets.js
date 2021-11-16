import prisma from "../../contexts/prisma";
import axios from "axios";

export default async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	} else if (req.method === "POST") {
		let bets = req.body;
		try {
			bets = await Promise.all(
				bets.map(async (bet) => {
					const winner = bet.event.competitions[0].competitors[0].winner
						? bet.event.competitions[0].competitors[0].team.shortDisplayName
						: bet.event.competitions[0].competitors[1].team.shortDisplayName;
					const winnerId = bet.details.winner === winner ? bet.requesterId : bet.accepterId;
					const transactionBody = {
						amount: bet.amount,
						sender: bet.details.winner === winner ? bet.requester.walletAddress : bet.accepter.walletAddress,
						recipient:
							bet.details.winner === winner ? bet.accepter.walletAddress : bet.requester.walletAddress,
						details: {
							sport: bet.details.sport,
							betId: bet.id,
							gameId: bet.details.gameId,
							date: bet.details.date,
							name: bet.details.name,
							winner: winner,
						},
					};

					const res = await axios.post(
						`${process.env.BLOCKCHAIN_URL}/transaction/broadcast`,
						transactionBody
					);
					if (res.data.transactionData) {
						let transactionData = res.data.transactionData;
						return await prisma.bet.update({
							where: {
								id: bet.id,
							},
							data: {
								completed: true,
								transactionId: transactionData.transactionId,
								winner: {
									connect: {
										id: winnerId,
									},
								},
							},
							include: {
								accepter: {
									select: {
										walletAddress: true,
									},
								},
								requester: {
									select: {
										walletAddress: true,
									},
								},
							},
						});
					} else {
						return await prisma.bet.findUnique({
							where: {
								id: bet.id,
							},
							include: {
								accepter: {
									select: {
										walletAddress: true,
									},
								},
								requester: {
									select: {
										walletAddress: true,
									},
								},
							},
						});
					}
				})
			);
		} catch (err) {
			console.log(err.message);
		}
		res.json(bets);
	}
};
