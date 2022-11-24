import {Row, Col} from "react-bootstrap";
import {BsArrowRight} from "react-icons/bs";


export default function TokenTrade(props){
    return(
        <div className="bg-light p-4 my-2">
            {props.title && <h6>{props.title}</h6>}
            <Row className="align-items-center">
                <Col md={10} className="d-flex align-items-center">
                    {props.misc} 
                    <p className="mx-3">Lorem, ipsum.</p>
                    <BsArrowRight width={200} height={200} />
                </Col>
                <Col md={2}>{props.date}</Col>
            </Row>
        </div>
    )
}