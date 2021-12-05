import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "POST") {
		const bet = req.body;
		if (session) {
			try {
				const userData = await prisma.user.findUnique({
					where: { id: session.user.id },
					select: { id: true, walletAddress: true, balance: true, requester: { select: { id: true } } },
				});
				const NotUsersBet = userData.requester.some((reqBet) => reqBet.id !== bet.id);

				if (NotUsersBet) {
					if (userData.balance - parseFloat(bet.amount) >= 0) {
						const user = await prisma.user.update({
							where: { id: session.user.id },
							data: { balance: userData.balance - parseFloat(bet.amount) },
						});
						const acceptedBet = await prisma.bet.update({
							where: {
								id: bet.id,
							},
							data: {
								accepted: true,
								accepter: {
									connect: {
										id: user.id,
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
						return res.json(acceptedBet);
					} else {
						return res.json({ error: true, message: "You don't have enough funds!" });
					}
				} else {
					return res.json({ error: true, message: "This bet belongs to current user" });
				}
			} catch (e) {
				console.log(e);
				if (e.code === "P2002") {
					return res.json({ error: `There's already an account with that ${e.meta.target[0]}` });
				}
				// throw e;
			}
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
