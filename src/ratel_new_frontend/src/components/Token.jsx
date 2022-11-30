import React from "react"
import { Image, Badge, Row, Col } from "react-bootstrap";

export default function Token() {

    const content = [
        {
            "title": "-$10000.222",
            "p": [{
                "Key": 1,
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "ICP",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": false,
            },
            {
                "Key": 2,
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "WICP",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": true,
            },
            {
                "Key": 3,
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "WICP",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": true,
            },
            {
                "Key": 4,
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "XTC",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": false,
            },
            {
                "Key": 5,
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "OGY",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": false,
            }
            ]
        }
    ]

    return (
        <section className="my-5">
            <h2 className="my-3 text-center text-md-start"> Token </h2>

            {
                content.map((item, key) => {
                    return <div className="bg-light p-4" key={key}>
                        <h3 className="text-center my-3">{item.title}</h3>

                        {item.p.map(row => {
                            return <Row key={row.Key} className="bg-light rounded my-2 p-4 d-flex">
                                
                                <Col xs={12} md={6} className="d-flex flex-column flex-md-row align-items-center justify-content-sm-center justify-content-md-start mb-md-0">
                                    <Image src={row.src} width={80} height={80} className="rounded-circle m-md-0" />
                                    <p className="align-middle ms-2">{row.title}</p>
                                    {row.hasBadge && <Badge className="bg-primary rounded ms-2 align-middle"> Ext </Badge>}

                                </Col>

                                <Col xs={12} md={6} className="mx-auto text-center text-md-end">
                                    <h3>{row.text1}</h3>
                                    <p className="text-md-end">{row.text2}</p>
                                </Col>
                            </Row>
                        })}
                    </div>
                })
            }
        </section>
    )
}