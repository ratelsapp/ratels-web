import {Image} from "react-bootstrap";

export default function Img(props)
{
    return (
        <>
            <Image src={props.src} className="rounded img-fluid" height={props.h} width={props.w} />
        </>
    )
}
