import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";

export default async (req, res) => {
	const session = await getSession({ req });

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

					return await prisma.bet.update({
						where: {
							id: bet.id,
						},
						data: {
							completed: true,
							winner: {
								connect: {
									id: winnerId,
								},
							},
						},
					});
				})
			);
		} catch (err) {
			console.log(err.message);
		}
		res.json(bets);
	}
};
