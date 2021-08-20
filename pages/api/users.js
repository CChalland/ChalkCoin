import prisma from "../../prisma/prisma";
import { getSession } from "next-auth/client";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "GET") {
		const user = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
			include: {
				requester: true,
				accepter: true,
			},
		});
		return res.json(user);
	} else if (req.method === "POST") {
		const user = JSON.parse(req.body);

		const updatedUser = await prisma.user.update({
			where: {
				email: session.user.email,
			},
			data: user,
		});
		return res.json(updatedUser);
	}
};
