import { getSession } from "next-auth/client";
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
	const session = await getSession({ req });
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	} else if (req.method === "GET") {
		let openBets, recipientBets, acceptedBets, completedBets;
		if (req.query.type === "currentUser") {
			if (session) {
				openBets = await prisma.bet.findMany({
					where: { AND: [{ accepted: false, completed: false, requesterId: session.user.id }] },
				});
				recipientBets = await prisma.bet.findMany({
					where: { AND: [{ accepted: false, completed: false, recipientId: session.user.id }] },
				});
				acceptedBets = await prisma.bet.findMany({
					where: {
						OR: [{ requesterId: session.user.id }, { accepterId: session.user.id }],
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
				completedBets = await prisma.bet.findMany({
					where: {
						AND: [
							{ accepted: true, completed: true },
							{ OR: [{ requesterId: session.user.id }, { accepterId: session.user.id }] },
						],
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

				return res.json({
					pendingBets: { openBets: await betSorter(openBets), recipientBets: await betSorter(recipientBets) },
					acceptedBets: await betSorter(acceptedBets),
					completedBets: await betSorter(completedBets),
				});
			} else {
				return res.json({ error: true, message: "You are not logged in." });
			}
		} else if (req.query.type === "all") {
			openBets = await prisma.bet.findMany({
				where: {
					AND: [{ accepted: false, completed: false }, { recipientId: null }],
				},
			});
			recipientBets = await prisma.bet.findMany({
				where: {
					accepted: false,
					completed: false,
					NOT: {
						recipientId: null,
					},
				},
			});
			acceptedBets = await prisma.bet.findMany({
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
			completedBets = await prisma.bet.findMany({
				where: {
					AND: [{ accepted: true, completed: true }, { transactionId: null }],
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
			return res.json({
				pendingBets: { openBets: await betSorter(openBets), recipientBets: await betSorter(recipientBets) },
				acceptedBets: await betSorter(acceptedBets),
				completedBets: completedBets,
			});
		}
	}
};
