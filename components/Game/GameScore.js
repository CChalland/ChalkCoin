import { Row, Col, Image } from "react-bootstrap";

function GameScore({ gameScoreCardData, screenSize }) {
	const style = screenSize === "xs" ? { fontSize: 14 } : null;

	const scoreTableHelper = (scoreCardData) => {
		let title,
			awayPeriods,
			awayScore,
			homePeriods,
			homeScore,
			awayFinalStyle,
			homeFinalStyle,
			awayRecord,
			homeRecord,
			index = 0;
		const titleStyle = scoreCardData.status.type.state === "in" ? "text-danger" : "";
		const linescoresHeader = scoreCardData.away.periods.map((period, key) => {
			index++;
			if ((scoreCardData.sportName == "NHL" && index == 4) || index == 5) {
				return (
					<Col xs={1} className="mx-0 px-0 text-center" style={style} key={key}>
						{"OT"}
					</Col>
				);
			} else if ((scoreCardData.sportName == "NHL" && index > 4) || index > 5) {
				let numberOT = scoreCardData.sportName == "NHL" ? (index - 4).toString() : (index - 5).toString();
				return (
					<Col xs={1} className="mx-0 px-0 text-center" style={style} key={key}>
						{numberOT + "OT"}
					</Col>
				);
			} else {
				return (
					<Col xs={1} className="mx-0 px-0 text-center" style={style} key={key}>
						{index}
					</Col>
				);
			}
		});

		if (
			scoreCardData.status.type.name === "STATUS_SCHEDULED" ||
			scoreCardData.status.type.name === "STATUS_POSTPONED" ||
			scoreCardData.status.type.name === "STATUS_DELAYED"
		) {
			title = <Col className="">{scoreCardData.shortDetail}</Col>;
		} else if (scoreCardData.sportName === "MLB") {
			let awayRuns, homeRuns;

			title = (
				<>
					<Col xs={6} lg={5} className={` ${titleStyle}`} style={style}>
						{scoreCardData.detail}
					</Col>
					<Col xs={3} className="font-weight-bold text-right" style={style}>
						{"R"}
					</Col>
					<Col xs={1} className="text-center" style={style}>
						{"H"}
					</Col>
					<Col xs={1} className="text-center" style={style}>
						{"E"}
					</Col>
				</>
			);

			if (scoreCardData.away.periods.length !== 0) {
				awayPeriods = scoreCardData.away.periods.map((period, key) => {
					if (period?.name === "runs") {
						awayRuns = period.displayValue;
						return (
							<Col xs={3} className="font-weight-bold text-right" style={style} key={key}>
								{period?.displayValue}
							</Col>
						);
					} else if (period?.name === "errors") {
						return (
							<Col xs={1} className="mr-auto text-center" style={style} key={key}>
								{period?.displayValue}
							</Col>
						);
					} else {
						return (
							<Col xs={1} className="text-center" style={style} key={key}>
								{period?.displayValue}
							</Col>
						);
					}
				});
			}
			if (scoreCardData.home.periods.length !== 0) {
				homePeriods = scoreCardData.home.periods.map((period, key) => {
					if (period?.name === "runs") {
						homeRuns = period.displayValue;
						return (
							<Col xs={3} className="font-weight-bold text-right" style={style} key={key}>
								{period?.displayValue}
							</Col>
						);
					} else if (period?.name === "errors") {
						return (
							<Col xs={1} className="mr-auto text-center" style={style} key={key}>
								{period?.displayValue}
							</Col>
						);
					} else {
						return (
							<Col xs={1} className="text-center" style={style} key={key}>
								{period?.displayValue}
							</Col>
						);
					}
				});
			}

			if (scoreCardData.status.type.state === "post") {
				awayFinalStyle = awayRuns > homeRuns ? "winIndicatorMLB" : "text-secondary";
				homeFinalStyle = homeRuns > awayRuns ? "winIndicatorMLB" : "text-secondary";
			}
		} else {
			title = (
				<>
					<Col xs={6} lg={6} className={` ${titleStyle}`} style={style}>
						{scoreCardData.shortDetail}
					</Col>
					{linescoresHeader}
					<Col xs={1} className="mx-0 px-0 font-weight-bold text-center" style={style}>
						{"T"}
					</Col>
				</>
			);
			awayPeriods = (
				<>
					{scoreCardData.away.periods.map((period, key) => {
						return (
							<Col xs={2} className="mx-0 px-0 text-center" style={style} key={key}>
								{period.value}
							</Col>
						);
					})}
				</>
			);
			homePeriods = (
				<>
					{scoreCardData.home.periods.map((period, key) => {
						return (
							<Col xs={2} className="mx-0 px-0 text-center" style={style} key={key}>
								{period.value}
							</Col>
						);
					})}
				</>
			);
			awayScore = (
				<Col xs={2} className="mr-auto px-0 text-center font-weight-bold" style={style}>
					{scoreCardData.away.score}
				</Col>
			);
			homeScore = (
				<Col xs={2} className="mr-auto px-0 text-center font-weight-bold" style={style}>
					{scoreCardData.home.score}
				</Col>
			);

			if (scoreCardData.status.type.state === "post") {
				awayFinalStyle =
					scoreCardData.away.score > scoreCardData.home.score ? "winIndicator" : "text-secondary";
				homeFinalStyle =
					scoreCardData.home.score > scoreCardData.away.score ? "winIndicator" : "text-secondary";
			}
		}

		if (gameScoreCardData.away.records)
			awayRecord =
				"(" +
				gameScoreCardData.away?.records[0].summary +
				", " +
				gameScoreCardData.away?.records[1].summary +
				" Away)";
		if (gameScoreCardData.home.records)
			homeRecord =
				"(" +
				gameScoreCardData.home.records[0].summary +
				", " +
				gameScoreCardData.home.records[1].summary +
				" Home)";

		return {
			title,
			awayPeriods,
			homePeriods,
			awayScore,
			homeScore,
			awayFinalStyle,
			homeFinalStyle,
			awayRecord,
			homeRecord,
		};
	};

	const {
		title,
		awayPeriods,
		awayScore,
		homePeriods,
		homeScore,
		awayFinalStyle,
		homeFinalStyle,
		awayRecord,
		homeRecord,
	} = scoreTableHelper(gameScoreCardData);

	return (
		<Row>
			{/* For sm, md, lg, xl and up screens */}
			<Col className="d-none d-sm-block d-xl-block">
				<Row className="py-2 align-items-center border">{title}</Row>

				<Row className={`my-3 align-items-center ${awayFinalStyle}`}>
					<Col xs={6}>
						<Row>
							<Col xs={4} md={4} lg={4} xl={4} className="text-right">
								<Image width={40} height={40} src={gameScoreCardData.away.logo} rounded />
							</Col>
							<Col xs={8} md={8} lg={6} xl={6} className="">
								<Row className="mb-0 h5">{gameScoreCardData.away.name}</Row>
								<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
									{awayRecord}
								</Row>
							</Col>
						</Row>
					</Col>

					<Col xs={6}>
						<Row>
							{awayPeriods}
							{awayScore}
							<span className={awayFinalStyle}></span>
						</Row>
					</Col>
				</Row>

				<Row className={`mt-4 mb-3 align-items-center ${homeFinalStyle}`}>
					<Col xs={6}>
						<Row>
							<Col xs={4} md={4} lg={4} xl={4} className="text-right">
								<Image width={40} height={40} src={gameScoreCardData.home.logo} rounded />
							</Col>
							<Col xs={8} md={8} lg={6} xl={6} className="">
								<Row className="mb-0 h5">{gameScoreCardData.home.name}</Row>
								<Row className="mb-0 text-secondary" style={{ fontSize: 12 }}>
									{homeRecord}
								</Row>
							</Col>
						</Row>
					</Col>
					<Col xs={6}>
						<Row>
							{homePeriods}
							{homeScore}
							<span className={homeFinalStyle}></span>
						</Row>
					</Col>
				</Row>
			</Col>

			{/* For xs screen */}
			<Col className="d-block d-sm-none">
				<Row className="py-2 align-items-center border">{title}</Row>

				<Row className={`my-3 align-items-center ${awayFinalStyle}`}>
					<Col xs={screenSize === "modal" ? "auto" : 6}>
						<Row>
							<Col xs={"5"} className="mx-0">
								<Image width={40} height={40} src={gameScoreCardData.away.logo} rounded />
							</Col>
							<Col xs={"7"} className="mx-0">
								<Row className="mb-0 h5" style={style}>
									{gameScoreCardData.away.name}
								</Row>
								<Row className="mb-0 text-secondary" style={{ fontSize: 10 }}>
									{awayRecord}
								</Row>
							</Col>
						</Row>
					</Col>
					<Col xs={6}>
						<Row>
							{awayPeriods}
							{awayScore}
							{/* <span className={awayFinalStyle}></span> */}
						</Row>
					</Col>
				</Row>

				<Row className={`mt-4 mb-3 align-items-center ${homeFinalStyle}`}>
					<Col xs={screenSize === "modal" ? "auto" : 6}>
						<Row>
							<Col xs={"5"} className="mx-0">
								<Image width={40} height={40} src={gameScoreCardData.home.logo} rounded />
							</Col>
							<Col xs={"7"} className="mx-0">
								<Row className="mb-0 h5" style={style}>
									{gameScoreCardData.home.name}
								</Row>
								<Row className="mb-0 text-secondary" style={{ fontSize: 10 }}>
									{homeRecord}
								</Row>
							</Col>
						</Row>
					</Col>
					<Col xs={6}>
						<Row>
							{homePeriods}
							{homeScore}
							{/* <span className={homeFinalStyle}></span> */}
						</Row>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default GameScore;
