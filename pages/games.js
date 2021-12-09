import { useRouter } from "next/router";
import { useContext, useRef, useEffect } from "react";
import { getSession } from "next-auth/client";
import { Container, Row } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { UserContext } from "../contexts/User.Context";
import GameCard from "../components/Game/GameCard";
import NotificationAlert from "react-notification-alert";

export default function Games({ query, users }) {
	const router = useRouter();
	const currentUser = useContext(UserContext);
	const sportsData = useContext(SportContext);
	const notificationAlertRef = useRef(null);
	let sportData = sportsData.find((sport) => {
		return sport.abbrv === query.sport?.toUpperCase();
	});

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
		router.replace(`${router.pathname}?sport=${query.sport}`, undefined, { shallow: true });
	};

	useEffect(() => {
		if (router.query.error) {
			notify(router.query.error);
		}
	}, [router.query.error]);

	let gameItems;
	if (sportData?.data.events) {
		gameItems = sportData.data.events.map((game, key) => {
			return (
				<Row className="my-3" key={game.id}>
					<GameCard
						panelKey={key}
						gameData={game}
						sportName={sportData?.display_name}
						users={users}
						currentUser={currentUser}
						completed={game.status.type.completed}
					/>
				</Row>
			);
		});
	} else {
		gameItems = <h1>Loading</h1>;
	}

	return (
		<>
			<div className="rna-container">
				<NotificationAlert ref={notificationAlertRef} />
			</div>
			<Container fluid>
				<h1>{sportData?.display_name}</h1>
				{gameItems}
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
		props: { query: context.query, users },
	};
}
