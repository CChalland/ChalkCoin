import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	} else if (req.method === "POST") {
		const bet = req.body;
		if (session) {
			try {
				let betData = {
					amount: parseFloat(bet.amount),
					details: JSON.stringify(bet.details),
					currency: bet.currency,
					requester: {
						connect: {
							id: session.user.id,
						},
					},
				};
				if (bet.recipientId) betData.recipient = { connect: { id: bet.recipientId } };
				const createdBet = await prisma.bet.create({
					data: betData,
				});
				return res.json(createdBet);
			} catch (e) {
				console.log(e);
				if (e.code === "P2002") {
					return res.json({ error: `There's already an account with that ${e.meta.target[0]}` });
				}
				// throw e;
			}
		}
	}
};