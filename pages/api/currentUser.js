import prisma from "../../contexts/prisma";
import { getSession } from "next-auth/client";
import { hashSync } from "bcrypt";

export default async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "GET") {
		if (session) {
			let user;
			if (req.query.type === "layout") {
				user = await prisma.user.findUnique({
					where: {
						id: session.user.id,
					},
					select: {
						id: true,
						username: true,
						image: true,
						balance: true,
					},
				});
				return res.json(user);
			} else {
				user = await prisma.user.findUnique({
					where: {
						id: session.user.id,
					},
					include: {
						requester: true,
						accepter: true,
						recipient: true,
					},
				});
				return res.json(user);
			}
		} else {
			return res.json({ error: true, message: "Not logged in." });
		}
	} else if (req.method === "POST") {
		const user = req.body;
		delete user.balance;
		if (user.password) user.password = hashSync(user.password, 10);

		try {
			const updatedUser = await prisma.user.update({
				where: {
					id: session.user.id,
				},
				data: user,
			});
			delete updatedUser.password;
			return res.json(updatedUser);
		} catch (e) {
			console.log(e.meta.target);
			if (e.code === "P2002") {
				return res.json({ error: `There's already an account with that ${e.meta.target[0]}` });
			}
			// throw e;
		}
	}
};
