import React from "react";
import App from "next/app";
import { SportProvider } from "../src/contexts/Sports.Context";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "../src/assets/css/demo.css";
import "../src/assets/css/GamePlay.css";
import Admin from "../src/layouts/Admin"

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
			<SportProvider>
				<Admin>
          <Component {...pageProps} />
        </Admin>
			</SportProvider>
		);
	}
}

export default MyApp;
