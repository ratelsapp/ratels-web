import {Row, Col} from "react-bootstrap";
import Img from "./Img";

export default function SmallComponent()
{
    return (
        <>
            <Row>
                <Col>
                    <Img src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=2000" className="img-fluid" />
                </Col>
            </Row>
        </>
    )
}