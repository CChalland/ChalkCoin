import Head from "next/head";
import { Fragment } from "react";
import { Provider } from "next-auth/client";
import { BlockchainProvider } from "../frontend/contexts/Blockchain.Context";
import { SportProvider } from "../frontend/contexts/Sports.Context";
import { BetProvider } from "../frontend/contexts/Bets.Context";
import { UserProvider } from "../frontend/contexts/User.Context";
import Layout from "../frontend/components/Layout/Layout";
// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/swiper.scss";
import "../assets/scss/chalkcoin.scss?v=2.0.0";
import "../assets/css/Custom.css";
import "../assets/css/swiper.css";

export default function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
			</Head>
			<Provider session={pageProps.session}>
				<BlockchainProvider>
					<SportProvider>
						<BetProvider>
							<UserProvider>
								<Layout>
									<Component {...pageProps} />
								</Layout>
							</UserProvider>
						</BetProvider>
					</SportProvider>
				</BlockchainProvider>
			</Provider>
		</Fragment>
	);
}
