import {Row} from "react-bootstrap";

export default function SocialComponent(props){
    return(
        <>
            <Row className="bg-light p-4 ">
                {props.title && <h5>{props.title}</h5>}
                <div className="p-3 m-5 text-center">
                    COMING SOON...
                </div>
            </Row>

            <Row className="bg-light p-4 my-2">
                {props.title && <h5>{props.title}</h5>}
                <div className="p-3 m-5 text-center">
                    COMING SOON...
                </div>
            </Row>

            <Row className="bg-light p-4 my-2">
                {props.title && <h5>{props.title}</h5>}
                <div className="p-3 m-5 text-center">
                    COMING SOON...
                </div>
            </Row>
            
        </>
    )
}