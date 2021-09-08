import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method not allowed" });
	}

	let users = await prisma.user.findMany();
	users = users.map((user) => {
		return {
			username: user.name,
			image: user.image,
		};
	});

	res.json(users);
};
