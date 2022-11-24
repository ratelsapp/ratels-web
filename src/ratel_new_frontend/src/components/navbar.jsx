import { Row, Col } from "react-bootstrap";
import { FaWallet } from "react-icons/fa";


export default function SiteMenu() {
    return (
        <>
            <div className="p-3 container-fluid">
                <Row>
                    <Col>Stargate</Col>
                    <Col className="text-end">
                        <a href="/">
                            <FaWallet className="mx-2" />
                            connect wallet
                        </a>
                    </Col>
                </Row>
            </div>
        </>
    )
}