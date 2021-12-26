import { useRouter } from "next/router";
import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getSession } from "next-auth/client";
import { Container, Row, Col, Card } from "react-bootstrap";
import { SportContext } from "../contexts/Sports.Context";
import { UserContext } from "../contexts/User.Context";
import moment from "moment";
import axios from "axios";
import GameCard from "../components/Game/GameCard";
import NotificationAlert from "react-notification-alert";
import Loading from "../components/Utility/Loading";

export default function Games({ query, users }) {
	const router = useRouter();
	const currentUser = useContext(UserContext);
	const sportsData = useContext(SportContext);
	const notificationAlertRef = useRef(null);
	const [selectedDate, setSelectedDate] = useState({});
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

	const getData = useCallback(async (league, date) => {
		axios
			.get(
				`http://site.api.espn.com/apis/site/v2/sports/${league.sport}/${league.league_name}/scoreboard?dates=${date.value}`
			)
			.then((response) => {
				console.log(response.data);
			});
	});

	useEffect(() => {
		if (selectedDate.value) getData(sportData, selectedDate);
	}, [selectedDate]);

	useEffect(() => {
		if (router.query.error) {
			notify(router.query.error);
		}
		if (!sportData || !router.query.sport) {
			router.replace("/", undefined, { shallow: true });
		}
	}, [router]);

	let gameItems = sportData?.data.events ? (
		sportData.data.events.map((game, key) => {
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
		})
	) : (
		<Loading />
	);

	const datesData = () => {
		const days = [];
		const dateStart = moment();
		const dateEnd = moment().add(90, "days");
		while (dateEnd.diff(dateStart, "days") >= 0) {
			const str = dateStart.format("ddd,MMM,Do,YYYYMMDD").split(",");
			days.push({ day: str[0], month: str[1], date: str[2], value: str[3] });
			dateStart.add(1, "days");
		}
		return days;
	};

	// console.log("datesData", datesData());
	// console.log("sportData", sportData);
	console.log("sportsData", sportsData);

	return (
		<>
			<div className="rna-container">
				<NotificationAlert ref={notificationAlertRef} />
			</div>
			<Container fluid>
				<Row>
					<Col>
						<h1>{sportData?.display_name}</h1>
					</Col>
				</Row>

				<Row>
					<Col>
						<Swiper
							spaceBetween={5}
							slidesPerView={7}
							breakpoints={{ 480: { slidesPerView: 7 }, 1400: { slidesPerView: 7 } }}
							onSlideChange={() => console.log("slide change")}
							onSwiper={(swiper) => console.log()}
						>
							{datesData().map((item, key) => {
								return (
									<SwiperSlide
										key={key}
										onClick={() => {
											setSelectedDate(item);
										}}
									>
										<Card border="secondary" className="mr-1" style={{ width: "4rem" }}>
											<p className="text-danger text-center my-1 border-bottom">{item.month}</p>
											<p className="text-center my-2">{item.date}</p>
										</Card>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Col>
				</Row>

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
