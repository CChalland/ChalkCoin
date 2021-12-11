import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import axios from "axios";
import { UserWallet } from "../../helpers/UserWallet";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "POST") {
		const reward = req.body;
		if (session) {
			try {
				return res.json(reward);
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
