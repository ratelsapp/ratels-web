// import {Card} from "react-bootstrap"

function CustomCard(props)
{
    return(
        <div className="p-4 my-4 custom text-center text-md-start">
            {props.title && <h3 className="my-3">{props.title}</h3>}
            {props.item}
        </div>
    )
}
export default CustomCard;