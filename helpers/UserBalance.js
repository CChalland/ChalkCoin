import axios from "axios";

export async function UserBalance(session, prisma) {
	try {
		const winningBets = await prisma.bet.findMany({
			where: {
				AND: [
					{ OR: [{ accepted: true }, { completed: false }] },
					{ OR: [{ requesterId: session.user.id }, { accepterId: session.user.id }] },
					{ winnerId: session.user.id },
				],
			},
			select: { id: true, amount: true },
		});
		const losingBets = await prisma.bet.findMany({
			where: {
				AND: [
					{ OR: [{ accepted: true }, { completed: false }] },
					{ OR: [{ requesterId: session.user.id }, { accepterId: session.user.id }] },
					{ NOT: { winnerId: session.user.id } },
				],
			},
			select: { id: true, amount: true },
		});
		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
			select: { walletAddress: true, balance: true },
		});

		const userData = await axios.get(`${process.env.BLOCKCHAIN_URL}/address/${user.walletAddress}`);
		const userRewards = userData.data.addressTransactions
			?.filter((transaction) => transaction.details.type)
			.reduce((prev, cur) => prev + cur.amount, 0);

		const balance =
			userRewards +
			winningBets.reduce((prev, cur) => prev + cur.amount, 0) -
			losingBets.reduce((prev, cur) => prev + cur.amount, 0);

		return balance;
	} catch (error) {
		return error;
	}
}
