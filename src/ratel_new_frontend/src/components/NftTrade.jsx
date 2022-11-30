import React from "react"
import { Image, Col, Row } from "react-bootstrap";

export default function Nfttrade() {

    const content = [
        {
            "key": 1,
            "title": "Entrepot",
            "p": [
                {
                    "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "Buy@12.0 ICP",
                    "text2": "2022-12-11 12:00"
                },
                {
                    "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "Sale@12.0 ICP",
                    "text2": "2022-12-11 12:00"
                }
            ]

        },
        {
            "key": 2,
            "title": "ICPSwap",
            "p": [
                {
                    "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "Buy@12.0 ICP",
                    "text2": "2022-12-11 12:00"
                },
                {
                    "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "Sale@12.0 ICP",
                    "text2": "2022-12-11 12:00"
                }
            ]

        },
        {
            "key": 3,
            "title": "CCC",
            "p": [
                {
                    "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "Buy@12.0 ICP",
                    "text2": "2022-12-11 12:00"
                },
                {
                    "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "Sale@12.0 ICP",
                    "text2": "2022-12-11 12:00"
                }
            ]

        }

    ]

    return (
        <section className="my-5">
            <h2 className="my-3 text-center text-md-start"> Nft Trade  </h2>
            {
                content.map(item => {
                    return <div className="bg-light rounded p-4 my-3" key={item.key}>
                        <h3 className="text-center text-md-start mb-4">{item.title}</h3>

                        <Row className="align-middle">
                            <Col xs={12} md={6} className="text-center">
                                <Image src={item.p[0].src} className="rounded d-block d-md-inline text-center mx-auto mb-2" width={80} height={80} />
                                <p className="d-inline-block ms-3 me-auto text-center text-md-start">{item.p[0].text1}</p>
                            </Col>
                            <Col xs={12} md={6}><p className="align-middle text-center text-md-end p-3">{item.p[0].text2}</p></Col>
                        </Row>
                    </div>
                })
            }

        </section>
    )
}