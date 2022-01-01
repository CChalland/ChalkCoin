import prisma from "../../contexts/prisma";
import axios from "axios";

export default CompletedBets = async (req, res) => {
	if (req.method === "POST") {
		let bets = req.body;
		if (req.query.type === "accepted") {
			try {
				bets = await Promise.all(
					bets.map(async (bet) => {
						const winnerTeam = bet.event.competitions[0].competitors[0].winner
							? bet.event.competitions[0].competitors[0].team.shortDisplayName
							: bet.event.competitions[0].competitors[1].team.shortDisplayName;
						const winnerUser =
							bet.details.winner === winnerTeam
								? await prisma.user.update({
										where: { id: bet.requesterId },
										data: { balance: { increment: parseFloat(bet.amount) } },
										select: { id: true, balance: true, walletAddress: true },
								  })
								: await await prisma.user.update({
										where: { id: bet.accepterId },
										data: { balance: { increment: parseFloat(bet.amount) } },
										select: { id: true, balance: true, walletAddress: true },
								  });
						const loserUser =
							bet.details.winner === winnerTeam
								? await await prisma.user.findUnique({
										where: { id: bet.accepterId },
										select: { id: true, balance: true, walletAddress: true },
								  })
								: await prisma.user.findUnique({
										where: { id: bet.requesterId },
										select: { id: true, balance: true, walletAddress: true },
								  });
						const transactionBody = {
							amount: bet.amount,
							sender: loserUser.walletAddress,
							recipient: winnerUser.walletAddress,
							details: {
								sport: bet.details.sport,
								betId: bet.id,
								gameId: bet.details.gameId,
								date: bet.details.date,
								name: bet.details.name,
								winner: winnerTeam,
							},
						};

						const res = await axios.post(
							`${process.env.BLOCKCHAIN_URL}/transaction/broadcast`,
							transactionBody
						);
						if (res.data.transactionData) {
							return await prisma.bet.update({
								where: {
									id: bet.id,
								},
								data: {
									completed: true,
									transactionId: res.data.transactionData.transactionId,
									winner: {
										connect: {
											id: winnerUser.id,
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
		} else if (req.query.type === "open") {
			try {
				bets = await Promise.all(
					bets.map(async (bet) => {
						return await prisma.bet.update({
							where: { id: bet.id },
							data: {
								completed: true,
							},
						});
					})
				);
			} catch (err) {
				console.log(err.message);
			}
			res.json(bets);
		} else if (req.query.type === "recipient") {
			try {
				bets = await Promise.all(
					bets.map(async (bet) => {
						return await prisma.bet.update({
							where: { id: bet.id },
							data: {
								completed: true,
							},
						});
					})
				);
			} catch (err) {
				console.log(err.message);
			}
			res.json(bets);
		} else {
			res.json({ bets, message: "not a type listed" });
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
