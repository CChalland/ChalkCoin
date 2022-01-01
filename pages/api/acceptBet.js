import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import { UserWallet } from "../../helpers/UserWallet";

export default AcceptBet = async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "POST") {
		const bet = req.body;
		if (session) {
			try {
				const userData = await UserWallet({ id: session.user.id }, prisma);
				const usersBet = userData.requester.some((reqBet) => reqBet.id === bet.id);
				if (!usersBet) {
					if (userData.balance - parseFloat(bet.amount) >= 0) {
						const user = await prisma.user.update({
							where: { id: session.user.id },
							data: { balance: { decrement: parseFloat(bet.amount) } },
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
				// console.log(e);
				if (e.code === "P2002") {
					return res.json({
						error: true,
						message: `There's already an account with that ${e.meta.target[0]}`,
					});
				}
				return res.json({ error: true, message: "There was a problem with your request" });
			}
		} else {
			return res.json({ error: true, message: "User is not signned in" });
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
