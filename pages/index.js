import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useContext, useEffect, useState, useRef } from "react";
import { Alert, Container, Col, Row } from "react-bootstrap";
import { UserContext } from "../contexts/User.Context";
import { BetContext } from "../contexts/Bets.Context";
import { SportContext } from "../contexts/Sports.Context";
import { BlockchainContext } from "../contexts/Blockchain.Context";
// Components
import NotificationAlert from "react-notification-alert";
import Loading from "../components/Utility/Loading";
import Banner from "../components/Index/CryptoModern/Banner";
import Features from "../components/Index/CryptoModern/Features";
import Privacy from "../components/Index/CryptoModern/Privacy";
import WalletSection from "../components/Index/CryptoModern/WalletSection";
import FaqSection from "../components/Index/CryptoModern/FaqSection";
// User Components
import UserCard from "../components/Index/User/UserCard";
import ExpiringBets from "../components/Index/User/ExpiringBets";
import UpcomingGames from "../components/Index/User/UpcomingGames";
import PendingTransactions from "../components/Index/User/PendingTransactions";

export default function IndexPage({ users }) {
	const router = useRouter();
	const currentUser = useContext(UserContext);
	const bets = useContext(BetContext);
	const games = useContext(SportContext);
	const blockchain = useContext(BlockchainContext);
	const [expiringBets, setExpiringBets] = useState([]);
	const [pendingTransactions, setPendingTransactions] = useState(blockchain.pendingTransactions);
	const [welcomeState, setWelcomeState] = useState(true);
	const [mineState, setMineState] = useState(false);
	const notificationAlertRef = useRef(null);
	const notify = (errMsg) => {
		let options = {
			place: "tc",
			message: (
				<div>
					<div>
						<b>{errMsg}</b>
					</div>
				</div>
			),
			type: "danger",
			icon: "nc-icon nc-bell-55",
			autoDismiss: 7,
		};
		notificationAlertRef.current.notificationAlert(options);
		router.replace("/", undefined, { shallow: true });
	};

	useEffect(() => {
		if (router.query.error) {
			notify(router.query.error);
		}
	}, [router.query.error]);

	useEffect(() => {
		setPendingTransactions(blockchain.pendingTransactions);
		if (pendingTransactions.length >= 10) setMineState(true);
		else setMineState(false);
	}, [blockchain.pendingTransactions]);

	useEffect(() => {
		setExpiringBets(
			bets.pendingBets.openBets
				.map((sport) => {
					return sport.bets;
				})
				.flat()
				.filter((bet) => bet.requesterId !== currentUser.id)
		);
	}, [bets.pendingBets.openBets]);

	let welcomeAlert, mineAlert;
	if (welcomeState) {
		welcomeAlert = (
			<Alert className="alert-with-icon" variant="primary">
				<button
					aria-hidden={true}
					className="close"
					data-dismiss="alert"
					type="button"
					onClick={() => {
						setWelcomeState(false);
					}}
				>
					<i className="nc-icon nc-simple-remove"></i>
				</button>
				<span data-notify="icon" className="nc-icon nc-bell-55"></span>
				<span data-notify="message">
					{"Please keep in mind that this is a personal project and has no company backing it."}
				</span>
			</Alert>
		);
	}
	if (mineState) {
		mineAlert = (
			<Alert className="alert-with-icon" variant="success">
				<button
					aria-hidden={true}
					className="close"
					data-dismiss="alert"
					type="button"
					onClick={() => {
						setMineState(false);
					}}
				>
					<i className="nc-icon nc-simple-remove"></i>
				</button>
				<span data-notify="icon" className="nc-icon nc-bell-55"></span>
				<span data-notify="message">{"There's enough pending transactions to be mined."}</span>
			</Alert>
		);
	}

	return (
		<>
			<div className="rna-container">
				<NotificationAlert ref={notificationAlertRef} />
			</div>
			<Container fluid>
				{currentUser.id ? (
					<>
						<Row>
							<Col>{welcomeAlert}</Col>
						</Row>
						<Row>
							<Col>{mineAlert}</Col>
						</Row>
						<Row>
							<UserCard user={currentUser} bets={bets.userBets} />
							<ExpiringBets user={currentUser} bets={expiringBets} loaded={bets.initialized} />
							<UpcomingGames
								games={games
									.map((sport) => {
										return sport.data.events?.map((event) => {
											return { ...event, sport: sport.display_name };
										});
									})
									.flat()
									.filter((event) => event?.status.type.state === "pre")}
								currentUser={currentUser}
								users={users}
							/>
							<PendingTransactions
								pendingTransactions={pendingTransactions}
								mineState={mineState}
								user={currentUser}
								loaded={blockchain.initialized}
							/>
						</Row>
					</>
				) : (
					<>
						<Banner />
						<Features />
						<Privacy />
						{/* <WalletSection /> */}
						<FaqSection />
					</>
				)}
			</Container>
		</>
	);
}

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	let users = [];
	if (session) {
		users = await prisma.user.findMany();
		users = users
			.map((user) => {
				delete user.password;
				delete user.balance;
				delete user.paypal;
				delete user.emailVerified;
				delete user.createdAt;
				delete user.updatedAt;

				return user;
			})
			.filter((user) => {
				return user.id !== session.user.id;
			});
	}

	return {
		props: { users },
	};
}
