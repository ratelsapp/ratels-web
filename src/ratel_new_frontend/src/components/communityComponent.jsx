import {Row, Col} from "react-bootstrap";


export default function CommunityComponent(props){
    return(
       <>
         <div className="bg-light p-4 my-2">
            {props.title && <h4>FDAO</h4>}
            <Row className="my-4">
                <Col md={9}>
                    <p>Do you want to drop them all?</p>
                    <a href="/">Voted 1.Yes</a>
                </Col>
                <Col md={3}>2022-12-11 12:00</Col>
            </Row>

            <Row className="my-4">
                <Col md={9}>
                    <p>Do you want to drop them all?</p>
                    <a href="/">Voted 1.Yes</a>
                </Col>
                <Col md={3}>2022-12-11 12:00</Col>
            </Row>

        </div>
       </>
    )
}