import { Row, Col, Image, Button } from "react-bootstrap";
import { FaGithub, FaTwitter, FaDiscord, FaCopy } from "react-icons/fa";

export default function Body() {
    return (
        <>
            <Row>
                <Col className="p-0">
                    <Image src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=2000" className="rounded img-fluid " />

                </Col>

                <Col>
                    <div className="row ">
                        <h2 className="col sm-12 col-md-8">
                            Nickname
                            <Button> edit </Button>
                            <span className="mx-3">#123123</span>
                        </h2>

                        <p className="lead">
                            <strong>Account ID:</strong> 0c10afejddif094884490wncmlww9er80ww9e88r8e9r9r9
                            <FaCopy  className="mx-3"/> 
                        </p>

                        <p className="lead">
                            <strong>Principle ID:</strong> 
                            ukfr5-fijfks-climt-s7vndk-vabdb-i2djdkk-qqn77-sjdhg4-sodhe-subngh-qae 
                            <FaCopy className="mx-3" />
                        </p>
                    </div>
                </Col>
            </Row>
        </>
    )
}