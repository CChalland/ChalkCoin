import axios from "axios";

export async function UserBalance(user, prisma) {
	try {
		const winningBets = await prisma.bet.findMany({
			where: {
				AND: [
					{ OR: [{ requesterId: user.id }, { accepterId: user.id }] },
					{ winnerId: user.id },
					{ accepted: true },
					{ completed: true },
				],
			},
			select: { id: true, amount: true },
		});
		const losingBets = await prisma.bet.findMany({
			where: {
				AND: [
					{ OR: [{ requesterId: user.id }, { accepterId: user.id }] },
					{ OR: [{ winnerId: null }, { NOT: [{ winnerId: user.id }] }] },
				],
			},
			select: { id: true, amount: true },
		});

		const userBlockchainData = await axios.get(`${process.env.BLOCKCHAIN_URL}/address/${user.walletAddress}`);
		const userRewards = userBlockchainData.data.addressTransactions
			?.filter((transaction) => transaction.details.type)
			.reduce((prev, cur) => prev + cur.amount, 0);

		const balance =
			userRewards +
			winningBets.reduce((prev, cur) => prev + cur.amount, 0) -
			losingBets.reduce((prev, cur) => prev + cur.amount, 0);

		const userData = await prisma.user.update({
			where: { id: user.id },
			data: { balance },
			select: { id: true, balance: true, walletAddress: true },
		});

		return { ...userData, winningBets, losingBets };
	} catch (error) {
		return error;
	}
}
