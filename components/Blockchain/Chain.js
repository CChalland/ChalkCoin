import { Row, Col } from "react-bootstrap";
import BlockCard from "./BlockCard";
import Loading from "../Utility/Loading";

export default function Chain({ blocks, selectedBlock, loaded }) {
	return loaded ? (
		<Row>
			<Col>
				<Row>
					<h2>Blockchain</h2>
				</Row>

				<div className="mx-0 px-0" style={{ overflowY: "auto", maxHeight: "250px" }}>
					{blocks.map((block, key) => {
						return (
							<BlockCard
								blockData={block}
								genesisState={block.hash === "0" ? true : false}
								selected={block.index === selectedBlock.index ? true : false}
								key={key}
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
