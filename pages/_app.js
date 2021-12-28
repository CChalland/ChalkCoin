import App from "next/app";
import { Provider } from "next-auth/client";
import { BlockchainProvider } from "../contexts/Blockchain.Context";
import { SportProvider } from "../contexts/Sports.Context";
import { BetProvider } from "../contexts/Bets.Context";
import { UserProvider } from "../contexts/User.Context";
import Layout from "../components/Layout/Layout";
// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/swiper.scss";
import "assets/scss/chalkcoin.scss?v=2.0.0";
import "assets/css/Custom.css";
import "assets/css/swiper.css";

class MyApp extends App {
	// Only uncomment this method if you have blocking data requirements for
	// every single page in your application. This disables the ability to
	// perform automatic static optimization, causing every page in your app to
	// be server-side rendered.
	//
	// static async getInitialProps(appContext) {
	//   // calls page's `getInitialProps` and fills `appProps.pageProps`
	//   const appProps = await App.getInitialProps(appContext);
	//
	//   return { ...appProps }
	// }

	render() {
		const { Component, pageProps } = this.props;
		return (
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
		);
	}
}

export default MyApp;
