import axios from "axios";

export async function UserWallet(user, prisma) {
	try {
		const userData = await prisma.user.findUnique({
			where: { id: user.id },
			select: { id: true, balance: true, walletAddress: true, requester: { select: { id: true } } },
		});
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

		const userBlockchainData = await axios.get(
			`${process.env.BLOCKCHAIN_URL}/address/${userData.walletAddress}`
		);
		const userRewards = userBlockchainData.data.addressTransactions
			?.filter((transaction) => transaction.details.type)
			.reduce((prev, cur) => prev + cur.amount, 0);

		const balance =
			userRewards +
			winningBets.reduce((prev, cur) => prev + cur.amount, 0) -
			losingBets.reduce((prev, cur) => prev + cur.amount, 0);

		return {
			id: userData.id,
			balance: userData.balance,
			address: userData.walletAddress,
			requester: userData.requester,
		};
	} catch (error) {
		return error;
	}
}

export async function UpdateWinner(user) {}
