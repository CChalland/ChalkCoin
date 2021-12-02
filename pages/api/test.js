import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import axios from "axios";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "POST") {
		const bet = req.body;
		if (session) {
			try {
				const userBalance = await prisma.user.findUnique({
					where: { id: session.user.id },
					select: { balance: true },
					include: {
						requester: { select: { amount: true } },
						accepter: { select: { amount: true } },
					},
				});

				if (userBalance - parseFloat(bet.amount) > 0) {
				}
			} catch (e) {
				console.log(e);
			}

			try {
				let betData = {
					amount: parseFloat(bet.amount),
					details: bet.details,
					currency: bet.currency,
					requester: {
						connect: {
							id: session.user.id,
						},
					},
				};

				// if (bet.recipientId) betData.recipient = { connect: { id: bet.recipientId } };
				// const createdBet = await prisma.bet.create({
				// 	data: betData,
				// });
				// return res.json(createdBet);
			} catch (e) {
				console.log(e);
				// if (e.code === "P2002") {
				// 	return res.json({ error: `There's already an bet with that ${e.meta.target[0]}` });
				// }
				// throw e;
			}
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
