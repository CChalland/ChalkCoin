import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Banner from "../components/CryptoModern/Banner";
import Features from "../components/CryptoModern/Features";
import Privacy from "../components/CryptoModern/Privacy";
import WalletSection from "../components/CryptoModern/WalletSection";
import FaqSection from "../components/CryptoModern/FaqSection";

function IndexPage(props) {
	const [session, loading] = useSession();

	useEffect(() => {
		console.log("testing");
	}, []);

	console.log(session);

	return (
		<Container>
			<Banner />
			<Features />
			<Privacy />
			<WalletSection />
			<FaqSection />
		</Container>
	);
}

export default IndexPage;
