import React from "react";
import Commnuity from "./Community";
import Nfttrade from "./NftTrade";
import Ratel from "./Ratel";
import TokenTrade from "./TokenTrade";
import Social from "./Social";
import Token from "./Token";
import Comment from "./Comment";
import Did from "./Did";
import Nft from "./Nft";
import {Row, Col} from "react-bootstrap";

export default function Main(){
    return(
        <section className="mt-4 container">
            <Row>
                <Col sm={12} md={5}></Col>
                <Col sm={12} md={7}>
                    <Ratel />
                    <Nft />
                    <Nfttrade />
                    <Token />
                    <TokenTrade />
                    <Commnuity />
                    <Did />
                    <Social />
                    <Comment />
                </Col>
            </Row>
        </section>
    )
}