// import {Row, Col} from "react-bootstrap";


export default function DidComponent(props){
    return(
        <>
            <div className="bg-light p-4">
                <h2>{props.title}</h2>
                <p>{props.sub}</p>
            </div>

            <div className="bg-light p-4 my-3">
                <h2>{props.title}</h2>
                <p>{props.sub}</p>
            </div>

            <div className="bg-light p-4 my-3">
                <h2>{props.title}</h2>
                <p>{props.sub}</p>
            </div>
        </>
    )
}