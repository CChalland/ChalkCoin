import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Banner from "../components/CryptoModern/Banner";
import Features from "../components/CryptoModern/Features";
import Privacy from "../components/CryptoModern/Privacy";
import WalletSection from "../components/CryptoModern/WalletSection";
import FaqSection from "../components/CryptoModern/FaqSection";

function IndexPage({ currentUser }) {
	useEffect(() => {}, []);

	return (
		<Container>
			<Banner user={currentUser} />
			<Features />
			<Privacy />
			<WalletSection />
			<FaqSection />
		</Container>
	);
}

export default IndexPage;

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	let currentUser = {};
	if (session) {
		currentUser = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
			include: {
				requester: {
					select: { id: true },
				},
				accepter: {
					select: { id: true },
				},
				recipient: {
					select: { id: true },
				},
			},
		});
		delete currentUser.password;
		delete currentUser.paypal;
		delete currentUser.emailVerified;
		delete currentUser.createdAt;
		delete currentUser.updatedAt;
	}

	return {
		props: { currentUser },
	};
}
