import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "POST") {
		const reward = req.body;
		if (session) {
			try {
				const getUser = await prisma.user.update({
					where: { walletAddress: reward.recipient },
					data: {
						balance: { increment: parseFloat(reward.amount) },
						rewards: {
							create: {
								amount: reward.amount,
								currency: "ChalkCoin",
								details: reward.details,
								transactionId: reward.transactionId,
							},
						},
					},
					include: {
						rewards: {
							orderBy: {
								id: "desc",
							},
						},
					},
				});
				const mineReward = await getUser.rewards[0];
				return res.json(mineReward);
			} catch (e) {
				console.log(e);
			}
		} else {
			return res.json({ message: "not logged in" });
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
