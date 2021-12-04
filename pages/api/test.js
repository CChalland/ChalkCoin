import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import axios from "axios";
import { UserBalance } from "../../helpers/UserBalance";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "POST") {
		const bet = req.body;
		if (session) {
			try {
				const user = await prisma.user.findUnique({
					where: { id: session.user.id },
					select: { id: true, walletAddress: true, balance: true },
				});

				let userBalance = await UserBalance(user, prisma);
				return res.json(userBalance);
			} catch (e) {
				console.log(e);
			}
		}
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
