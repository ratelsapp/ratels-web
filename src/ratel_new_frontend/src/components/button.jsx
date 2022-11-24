import {Button} from "react-bootstrap"

export default function BtnComponent(props){
    return(
        <>
            <Button variant="dark" className="mx-2">{props.text}</Button>
        </>
    )
}