import prisma from "../../frontend/contexts/prisma";
import { getSession } from "next-auth/client";
import { hashSync } from "bcrypt";

const CurrentUser = async (req, res) => {
	const session = await getSession({ req });

	if (req.method === "GET") {
		if (session) {
			if (req.query.type === "layout") {
				const user = await prisma.user.findUnique({
					where: {
						id: session.user.id,
					},
					select: {
						id: true,
						username: true,
						email: true,
						name: true,
						image: true,
						balance: true,
						walletAddress: true,
						accepter: true,
						recipient: true,
						requester: true,
					},
				});
				return res.json({
					id: user.id,
					username: user.username,
					email: user.email,
					name: user.name,
					image: user.image,
					balance: user.balance,
					walletAddress: user.walletAddress,
					openBets: [...user.recipient, ...user.requester].filter((bet) => !bet.accepted && !bet.completed),
					acceptedBets: [...user.accepter, ...user.recipient, ...user.requester].filter(
						(bet) => bet.accepted && !bet.completed
					),
					completedBets: [...user.accepter, ...user.recipient, ...user.requester].filter(
						(bet) => bet.accepted && bet.completed
					),
				});
			} else {
				return res.json(
					await prisma.user.findUnique({
						where: {
							id: session.user.id,
						},
						include: {
							requester: true,
							accepter: true,
							recipient: true,
						},
					})
				);
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
export default CurrentUser;
