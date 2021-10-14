import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";

const betSorter = (bets) => {
	let sportWithBets = [];
	const nflBets = bets
		.filter((bet) => bet.details.displayName === "NFL")
		.sort((a, b) => {
			new Date(a.details.date) - new Date(b.details.date);
		});
	const mlbBets = bets
		.filter((bet) => bet.details.displayName === "MLB")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const nbaBets = bets
		.filter((bet) => bet.details.displayName === "NBA")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const ncaabBets = bets
		.filter((bet) => bet.details.displayName === "NCAA Men's Basketball")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const nhlBets = bets
		.filter((bet) => bet.details.displayName === "NHL")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const wnbaBets = bets
		.filter((bet) => bet.details.displayName === "WNBA")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});

	if (nflBets.length > 0) sportWithBets.push({ displayName: "NFL", icon: 2, bets: nflBets });
	if (mlbBets.length > 0) sportWithBets.push({ displayName: "MLB", icon: 3, bets: mlbBets });
	if (nbaBets.length > 0) sportWithBets.push({ displayName: "NBA", icon: 4, bets: nbaBets });
	if (ncaabBets.length > 0)
		sportWithBets.push({ displayName: "NCAA Men's Basketball", icon: 5, bets: ncaabBets });
	if (nhlBets.length > 0) sportWithBets.push({ displayName: "NHL", icon: 6, bets: nhlBets });
	if (wnbaBets.length > 0) sportWithBets.push({ displayName: "WNBA", icon: 8, bets: wnbaBets });

	return sportWithBets;
};

export default async (req, res) => {
	const session = await getSession({ req });

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
				pendingBets: { openBets: betSorter(openBets), recipientBets: betSorter(recipientBets) },
				acceptedBets: betSorter(acceptedBets),
				completedBets: betSorter(completedBets),
			});
		} else if (req.query.type === "open") {
			return res.json({ openBets: betSorter(openBets) });
		} else if (req.query.type === "recipient") {
			return res.json({ recipientBets: betSorter(recipientBets) });
		} else if (req.query.type === "accepted") {
			return res.json({ acceptedBets: betSorter(acceptedBets) });
		} else if (req.query.type === "completed") {
			return res.json({ completedBets: betSorter(completedBets) });
		}
	}
};
