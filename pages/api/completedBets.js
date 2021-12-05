import prisma from "../../contexts/prisma";
import axios from "axios";
import { UserWallet } from "../../helpers/UserWallet";

export default async (req, res) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	} else if (req.method === "POST") {
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
								? await UserWallet({ id: bet.requesterId }, prisma)
								: await UserWallet({ id: bet.accepterId }, prisma);
						const loserUser =
							bet.details.winner === winnerTeam
								? await UserWallet({ id: bet.accepterId }, prisma)
								: await UserWallet({ id: bet.requesterId }, prisma);
						const transactionBody = {
							amount: bet.amount,
							sender: loserUser.address,
							recipient: winnerUser.address,
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
	}
};
