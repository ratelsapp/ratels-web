import { Row, Col } from "react-bootstrap";
import LeftComponent from "./leftCol";
import RightComponent from "./rightCol";

export default function Main() {
    return (
        <main className="container">
            <Row>
                <Col sm={12} md={6}>
                    <LeftComponent />
                </Col>
                <Col sm={12} md={6} className="">
                    <RightComponent />
                </Col>
            </Row>
        </main>
    )
}