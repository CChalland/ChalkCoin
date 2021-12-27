import { useRouter } from "next/router";
import { useCallback, useContext, useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getSession } from "next-auth/client";
import { Container, Row, Col, Card } from "react-bootstrap";
import { SportContext, SportDispatch } from "../contexts/Sports.Context";
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
	const dispatch = useContext(SportDispatch);
	const notificationAlertRef = useRef(null);
	const [league, setLeague] = useState({});
	const [games, setGames] = useState([]);
	const [swiperIndex, setSwiperIndex] = useState(7);
	const [selectedIndex, setSelectedIndex] = useState(7);
	const [selectedDate, setSelectedDate] = useState({});

	const getData = useCallback(async (league, date) => {
		axios
			.get(
				`http://site.api.espn.com/apis/site/v2/sports/${league.sport}/${league.league_name}/scoreboard?dates=${date.value}`
			)
			.then((response) => {
				console.log(response.data);
				dispatch({
					type: "SELECTED DATE",
					data: response.data,
					date: selectedDate,
					sport: league.display_name,
				});
			});
	});

	useEffect(() => {
		if (selectedDate.value) getData(league, selectedDate);
	}, [selectedDate]);

	useEffect(() => {
		if (router.query.error) {
			notify(router.query.error);
		}
		if (!league || !router.query.sport) {
			router.replace("/", undefined, { shallow: true });
		}
	}, [router]);

	useEffect(() => {
		const gameData = sportsData.find((sport) => {
			return sport.abbrv === query.sport?.toUpperCase();
		});
		setLeague(gameData);
		if (gameData.data.days.length > 0) {
			const selected = gameData.data.days.find((day) => day.date === selectedDate);
			console.log("games - selected", selected);
			setGames(selected.events);
		} else if (gameData.data.events) setGames(gameData.data.events);
		else setGames([]);
	}, [sportsData]);

	console.log("games - games", games);

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
	const datesData = () => {
		const days = [];
		const today = moment().format("YYYYMMDD");
		const dateStart = moment().subtract(7, "days");
		const dateEnd = moment().add(90, "days");
		while (dateEnd.diff(dateStart, "days") >= 0) {
			const str = dateStart.format("ddd,MMM,Do,YYYYMMDD").split(",");
			days.push({
				day: str[0],
				month: str[1],
				date: str[2],
				value: str[3],
				today: today === str[3] ? true : false,
			});
			dateStart.add(1, "days");
		}
		return days;
	};

	return (
		<>
			<div className="rna-container">
				<NotificationAlert ref={notificationAlertRef} />
			</div>
			<Container fluid>
				<Row>
					<Col>
						<h1>{league.display_name}</h1>
					</Col>
				</Row>

				<Row>
					<Col lg={10}>
						<Swiper
							className=""
							spaceBetween={5}
							slidesPerView={2}
							initialSlide={swiperIndex}
							breakpoints={{
								260: { slidesPerView: 3 },
								320: { slidesPerView: 5 },
								480: { slidesPerView: 7 },
								1400: { slidesPerView: 7 },
							}}
							onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
						>
							{datesData().map((item, key) => {
								return (
									<SwiperSlide
										key={key}
										onClick={() => {
											setSelectedIndex(key);
											setSelectedDate(item);
										}}
									>
										<Row>
											<Col>
												<p className={`${selectedIndex === key ? "" : "text-muted"} mb-1 py-0 ml-2`}>
													{item.day}
												</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<Card border="secondary" className="mr-1" style={{ width: "3rem", height: "4rem" }}>
													<p
														className={`${
															selectedIndex === key ? "text-danger" : "text-danger-muted"
														} text-center my-1 border-bottom`}
													>
														{item.month}
													</p>
													<p className={`${selectedIndex === key ? "" : "text-muted"} text-center my-1`}>
														{item.date}
													</p>
												</Card>
											</Col>
										</Row>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Col>
				</Row>

				{games ? (
					games.map((game, key) => (
						<Row className="my-3" key={game.id}>
							<GameCard
								panelKey={key}
								gameData={game}
								sportName={league?.display_name}
								users={users}
								currentUser={currentUser}
								completed={game.status.type.completed}
							/>
						</Row>
					))
				) : (
					<Loading />
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
		props: { query: context.query, users },
	};
}
