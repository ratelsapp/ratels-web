// import data from "../data";
import Img from "./Img";
import {Row, Col} from "react-bootstrap";

export default function GroupImageWithText(props){

    const li = [
        "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=2000",
        "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
        "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=2000",
        "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=2000"
        // "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=2000",
        // "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg?w=2000",
    ]
    const Images = li.map((src, key)=>{
        return(
            <Col>
                <Img key={key} src={src} h={props.h} w={props.w} />
            </Col>
        )
    })

    return(
        <div className=" p-3 bg-light my-2 text-start ">
            {props.title && <h6> {props.title} </h6>}
            <Row className="">
                {Images}
            </Row>
        </div>
    )
}