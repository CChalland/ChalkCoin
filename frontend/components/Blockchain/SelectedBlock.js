import { Row, Col } from "react-bootstrap";
import TransactionCard from "./TransactionCard";
import Loading from "../Utility/Loading";

export default function SelectedBlock({ selectedBlock, currentUser, loaded }) {
	return loaded ? (
		<Row>
			<Col>
				<Row className="">
					<Col xs={5} md={3} lg={4} xl={2} className="mx-0 px-0">
						<h2 className="my-0 truncate-hash">{selectedBlock.hash}</h2>
					</Col>
					<Col xs={"auto"} className="ml-0 pl-0">
						<h2 className="my-0">{"'s"}</h2>
					</Col>

					<Col xs={"auto"} className="mx-0 px-0"></Col>
					<h2 className="my-0">Transactions</h2>
				</Row>
				<div className="mx-0 px-0" style={{ overflowY: "auto", maxHeight: "500px" }}>
					{selectedBlock.transactions?.map((transaction, key) => {
						return (
							<TransactionCard
								transactionData={transaction}
								userAddress={currentUser.walletAddress}
								key={key}
								panelKey={key}
							/>
						);
					})}
				</div>
			</Col>
		</Row>
	) : (
		<Loading />
	);
}
