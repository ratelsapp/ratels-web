import {Row, Col} from "react-bootstrap";


export default function CommentComponent(props){
    return(
        <div className="bg-light p-4">
            {props.title && <h5>{props.title}</h5>}
            <Row className="align-items-center my-4">
                <Col xs={12} md={10}>I have the same NFT collection as you.</Col>
                <Col xs={12} md={2}> <a href="/">Tom.icp</a> </Col>
            </Row>
            <Row className="align-items-center my-4">
                <Col xs={12} md={10}>I have the same NFT collection as you.</Col>
                <Col xs={12} md={2}> <a href="/">Tom.icp</a> </Col>
            </Row>
            <Row className="align-items-center my-4">
                <Col xs={12} md={10}>I have the same NFT collection as you.</Col>
                <Col xs={12} md={2}> <a href="/">Tom.icp</a> </Col>
            </Row>
        </div>
    )
}