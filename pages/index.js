import { getSession } from "next-auth/client";
import { useContext, useState } from "react";
import { Alert, Container, Col, Row } from "react-bootstrap";
import { BetContext } from "../contexts/Bets.Context";
import { SportContext } from "../contexts/Sports.Context";
import Banner from "../components/Index/CryptoModern/Banner";
import Features from "../components/Index/CryptoModern/Features";
import Privacy from "../components/Index/CryptoModern/Privacy";
import WalletSection from "../components/Index/CryptoModern/WalletSection";
import FaqSection from "../components/Index/CryptoModern/FaqSection";
// User Components
import UserCard from "../components/Index/User/UserCard";
import ExpiringBets from "../components/Index/User/ExpiringBets";
import UpcomingGames from "../components/Index/User/UpcomingGames";

function IndexPage({ currentUser, users }) {
	const bets = useContext(BetContext);
	const games = useContext(SportContext);
	const [welcomeState, setWelcomeState] = useState(true);
	let welcomeAlert;

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

	return (
		<Container fluid>
			{currentUser.id ? (
				<>
					<Row>
						<Col>{welcomeAlert}</Col>
					</Row>
					<Row>
						<UserCard user={currentUser} bets={bets.userBets} />
						<ExpiringBets
							user={currentUser}
							bets={bets.pendingBets.openBets
								.map((sport) => {
									return sport.bets;
								})
								.flat()
								.filter((bet) => bet.requesterId !== currentUser.id)}
						/>
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
	);
}

export default IndexPage;

export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	let currentUser = {};
	let users = [];
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
				return user.id !== currentUser.id;
			});
	}

	return {
		props: { currentUser, users },
	};
}
