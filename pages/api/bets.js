import prisma from "../../contexts/prisma";

const betSorter = async (bets) => {
	let sportWithBets = [];
	const ncaafBets = bets
		.filter((bet) => bet.details.sport === "NCAA Football")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const nflBets = bets
		.filter((bet) => bet.details.sport === "NFL")
		.sort((a, b) => {
			new Date(a.details.date) - new Date(b.details.date);
		});
	const mlbBets = bets
		.filter((bet) => bet.details.sport === "MLB")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const nbaBets = bets
		.filter((bet) => bet.details.sport === "NBA")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const ncaabBets = bets
		.filter((bet) => bet.details.sport === "NCAA Men's Basketball")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const nhlBets = bets
		.filter((bet) => bet.details.sport === "NHL")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});
	const wnbaBets = bets
		.filter((bet) => bet.details.sport === "WNBA")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});

	const mlsBets = bets
		.filter((bet) => bet.details.sport === "WNBA")
		.sort((a, b) => {
			return new Date(a.details.date) - new Date(b.details.date);
		});

	if (ncaafBets.length > 0)
		sportWithBets.push({
			icon: 1,
			abbrv: "NCAAF",
			sport: "football",
			displayName: "NCAA Football",
			league_name: "college-football",
			bets: ncaafBets,
		});
	if (nflBets.length > 0)
		sportWithBets.push({
			icon: 2,
			abbrv: "NFL",
			sport: "football",
			displayName: "NFL",
			league_name: "nfl",
			bets: nflBets,
		});
	if (mlbBets.length > 0)
		sportWithBets.push({
			icon: 3,
			abbrv: "MLB",
			sport: "baseball",
			displayName: "MLB",
			league_name: "mlb",
			bets: mlbBets,
		});
	if (nbaBets.length > 0)
		sportWithBets.push({
			icon: 4,
			abbrv: "NBA",
			sport: "basketball",
			displayName: "NBA",
			league_name: "nba",
			bets: nbaBets,
		});
	if (ncaabBets.length > 0)
		sportWithBets.push({
			icon: 5,
			abbrv: "NCAAB",
			sport: "basketball",
			displayName: "NCAA Men's Basketball",
			league_name: "mens-college-basketball",
			bets: ncaabBets,
		});
	if (nhlBets.length > 0)
		sportWithBets.push({
			icon: 6,
			abbrv: "NHL",
			sport: "hockey",
			displayName: "NHL",
			league_name: "nhl",
			bets: nhlBets,
		});
	if (wnbaBets.length > 0)
		sportWithBets.push({
			icon: 8,
			abbrv: "WNBA",
			sport: "basketball",
			displayName: "WNBA",
			league_name: "wnba",
			bets: wnbaBets,
		});
	if (mlsBets.length > 0)
		sportWithBets.push({
			icon: 10,
			abbrv: "MLS",
			sport: "soccer",
			displayName: "MLS",
			league_name: "mls",
			bets: mlsBets,
		});

	return sportWithBets;
};

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
		const completedBets = await prisma.bet.findMany({
			where: {
				AND: [{ completed: true }, { transactionId: null }],
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
		if (req.query.type === "all") {
			return res.json({
				pendingBets: { openBets: await betSorter(openBets), recipientBets: await betSorter(recipientBets) },
				acceptedBets: await betSorter(acceptedBets),
				completedBets: completedBets,
			});
		} else if (req.query.type === "open") {
			return res.json({ openBets: await betSorter(openBets) });
		} else if (req.query.type === "recipient") {
			return res.json({ recipientBets: await betSorter(recipientBets) });
		} else if (req.query.type === "accepted") {
			return res.json({ acceptedBets: await betSorter(acceptedBets) });
		} else if (req.query.type === "completed") {
			return res.json({ completedBets: await betSorter(completedBets) });
		}
	}
};
