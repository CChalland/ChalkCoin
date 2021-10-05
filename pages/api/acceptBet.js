import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import axios from "axios";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" });
	} else if (req.method === "POST") {
		const body = req.body;
		console.log(body);
		if (session) {
			try {
				const currentUserBets = await prisma.bet.findMany({
					where: {
						requesterId: session.user.id,
					},
				});
				const betIsUsers = currentUserBets.some((bet) => bet.id === body.betId);
				let message;
				if (!betIsUsers) {
					message = "bet doesn't belong to user";
				} else {
					message = "bet belongs to current user";
				}

				// const acceptedBet = await prisma.bet.update({
				// 	where: {
				// 		id: body.betId,
				// 	},
				// 	data: {
				// 		accepted: true,
				// 		accepter: {
				// 			connect: {
				// 				id: session.user.id,
				// 			},
				// 		},
				// 	},
				// });
				return res.json({ message });
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
