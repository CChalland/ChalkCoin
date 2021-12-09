import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import axios from "axios";
import { UserWallet } from "../../helpers/UserWallet";

const fetchData = async (sportKey) =>
	await axios
		.get(
			`https://api.the-odds-api.com/v4/sports/${sportKey}/odds/?regions=us&oddsFormat=american&apiKey=${process.env.ODDS_API_KEY}`
		)
		.then((res) => ({
			error: false,
			odds: res.data,
		}))
		.catch((e) => ({
			error: true,
			odds: null,
		}));

export default async (req, res) => {
	const session = await getSession({ req });
	const oddsSportKeys = [
		{ displayName: "NCAA Football", key: "americanfootball_ncaaf" },
		{ displayName: "NFL", key: "americanfootball_nfl" },
		{ displayName: "MLB", key: "baseball_mlb" },
		{ displayName: "NBA", key: "basketball_nba" },
		{ displayName: "NCAA Men's Basketball", key: "" },
		{ displayName: "NHL", key: "icehockey_nhl" },
		{ displayName: "WNBA", key: "" },
		{ displayName: "MLS", key: "soccer_usa_mls" },
	];

	if (req.method === "POST") {
		const bet = req.body;
		if (session) {
			const userData = await prisma.user.findUnique({
				where: { id: session.user.id },
				select: { id: true, walletAddress: true, balance: true },
			});
			const user = await UserWallet(userData, prisma);

			if (user.balance - parseFloat(bet.amount) >= 0) {
				try {
					const oddsKey = oddsSportKeys.find((sport) => sport.displayName === bet.details.sport);
					let sportOdds, betOdds;
					if (oddsKey.key) {
						sportOdds = await fetchData(oddsKey.key);
						betOdds = await sportOdds.odds.find(
							(game) => bet.details.name.includes(game.away_team) && bet.details.name.includes(game.home_team)
						);
					}
					let betData = {
						amount: parseFloat(bet.amount),
						details: bet.details,
						currency: bet.currency,
						requester: {
							connect: {
								id: user.id,
							},
						},
					};
					if (betOdds) betData.odds = await betOdds;
					if (bet.recipientId) betData.recipient = { connect: { id: bet.recipientId } };
					const createdBet = await prisma.bet.create({
						data: betData,
					});

					console.log(betOdds);
					return res.json(createdBet);
				} catch (e) {
					console.log(e);
					// if (e.code === "P2002") {
					// 	return res.json({ error: `There's already an bet with that ${e.meta.target[0]}` });
					// }
					// throw e;
				}
			} else {
				return res.json({ error: true, message: "You don't have enough funds!" });
			}
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
