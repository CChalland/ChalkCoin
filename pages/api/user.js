import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import { hashSync } from "bcrypt";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "GET") {
		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				requester: true,
				accepter: true,
			},
		});
		return res.json(user);
	} else if (req.method === "POST") {
		const user = req.body;
		user.password = hashSync(user.password, 10);
		const updatedUser = await prisma.user.update({
			where: {
				id: session.user.id,
			},
			data: user,
		});
		return res.json(updatedUser);
	}
};
