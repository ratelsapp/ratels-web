import {Row, Col} from "react-bootstrap";


export default function NftTrade(props){
    return(
        <div className="bg-light p-4 my-2">
            {props.title && <h6>{props.title}</h6>}
            <Row className="align-items-center ">
                <Col md={2}>{props.img}</Col>
                <Col md={7}>{props.price}</Col>
                <Col md={3}>{props.date}</Col>
            </Row>
        </div>
    )
}