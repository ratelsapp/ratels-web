import React from "react"
import {Image, Row, Col} from "react-bootstrap";

export default function TokenTrade() {

    const content = [
        {
            "key" : 1,
            "title": "ICPSwap",
            "p": [
                {
                    "key": 1,
                    "src1": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "10000.222",
                    "text2": "ICPS",
                    "src2": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "date": "2022-12-11 12:00"
                },
                {
                    "src1": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "10000.222",
                    "text2": "ICPS",
                    "src2": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "date": "2022-12-11 12:00"
                },
                {
                    "src1": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "10000.222",
                    "text2": "ICPS",
                    "src2": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "date": "2022-12-11 12:00"
                },

            ]
        },
        {
            "key": 2,
            "title": "Sonic",
            "p": [
                {
                    "src1": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "10000.222",
                    "text2": "ICPS",
                    "src2": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "date": "2022-12-11 12:00"
                },
                {
                    "src1": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "10000.222",
                    "text2": "ICPS",
                    "src2": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "date": "2022-12-11 12:00"
                }
            ]
        },
        {
            "key": 3,
            "title": "Infinity Swap",
            "p": [
                {
                    "src1": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "10000.222",
                    "text2": "ICPS",
                    "src2": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "date": "2022-12-11 12:00"
                },
                {
                    "src1": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "text1": "10000.222",
                    "text2": "ICPS",
                    "src2": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                    "date": "2022-12-11 12:00"
                }
            ]
        }
    ]

    return (
        <section className="my-5 ">

            <h2 className="text-center text-md-start"> Token Trade</h2>

            {content.map(item => {
                return <div className="bg-light p-4 my-3 bg-secondary" key = {item.key}>
                    <h4 className="mb-4 text-center text-md-start">{item.title}</h4>

                    {
                        item.p.map((row, key) => {
                            // each row in the container
                            return <Row className="d-flex mb-4 justify-content-between align-items-center align-middle" key = {key}>
                                {/* first img with text */}
                                <Col xs={12} md={4} className="text-center text-md-start">
                                    <Image src={row.src1} className="rounded-circle mx-auto d-block d-sm-inline" width={80} height={80} />
                                    {/*  */}
                                    <div className="d-inline-block align-middle">
                                        <p className="d-inline">{row.text1}</p>
                                        <br />
                                        <p className="d-inline">{row.text2}</p>
                                    </div>
                                </Col>

                                {/* arrow col */}


                                {/* second img with text */}
                                <Col xs={12} md={4} className="text-center text-md-start my-3">
                                    <Image src={row.src2} className="rounded-circle mx-auto d-block d-inline" width={80} height={80} />
                                    {/*  */}
                                    <div className="d-inline-block align-middle">
                                        <p className="d-inline">{row.text1}</p>
                                        <br />
                                        <p className="d-inline">{row.text2}</p>
                                    </div>
                                </Col>

                                <Col xs={12} md={4} className="text-center text-md-start">{row.date}</Col>
                            </Row>
                        })
                    }
                </div>
            })}

        </section>
    )
}