import prisma from "../../contexts/prisma";

export default async (req, res) => {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	} else if (req.method === "GET") {
		const openBets = await prisma.bet.findMany({
			where: {
				AND: [{ accepted: false }, { recipientId: null }],
			},
		});
		const recipientBets = await prisma.bet.findMany({
			where: {
				accepted: false,
				NOT: {
					recipientId: null,
				},
			},
		});
		const acceptedBets = await prisma.bet.findMany({
			where: {
				AND: [{ accepted: true }, { completed: false }],
			},
		});
		const completedBets = await prisma.bet.findMany({
			where: {
				AND: [{ completed: true }, { blockHash: null }],
			},
		});
		if (req.query.type === "all") {
			return res.json({
				pendingBets: { openBets, recipientBets },
				acceptedBets,
				completedBets,
			});
		} else if (req.query.type === "open") {
			return res.json(openBets);
		} else if (req.query.type === "recipient") {
			return res.json(recipientBets);
		} else if (req.query.type === "accepted") {
			return res.json(acceptedBets);
		} else if (req.query.type === "completed") {
			return res.json(completedBets);
		}
	}
};
