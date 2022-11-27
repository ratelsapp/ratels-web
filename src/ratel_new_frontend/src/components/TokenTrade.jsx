import React from "react"
import {Image, Row, Col} from "react-bootstrap";

export default function TokenTrade() {

    const content = [
        {
            "title": "ICPSwap",
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
        <section className="my-5">

            <h2 className="text-center text-md-start"> Token Trade</h2>

            {content.map(item => {
                return <div className="bg-light p-4 my-3">
                    <h4 className="mb-4">{item.title}</h4>

                    {
                        item.p.map(row => {
                            // each row in the container
                            return <Col className="d-flex mb-4 justify-content-between align-items-center align-middle">
                                {/* first img with text */}
                                <Col>
                                    <Image src={row.src1} className=" rounded-circle me-2 d-inline" width={80} height={80} />
                                    {/*  */}
                                    <div className="d-inline-block align-middle">
                                        <p className="d-inline">{row.text1}</p>
                                        <br />
                                        <p className="d-inline">{row.text2}</p>
                                    </div>
                                </Col>

                                {/* arrow col */}


                                {/* second img with text */}
                                <Col>
                                    <Image src={row.src2} className=" rounded-circle me-2 d-inline" width={80} height={80} />
                                    {/*  */}
                                    <div className="d-inline-block align-middle">
                                        <p className="d-inline">{row.text1}</p>
                                        <br />
                                        <p className="d-inline">{row.text2}</p>
                                    </div>
                                </Col>

                                <Col>{row.date}</Col>
                            </Col>
                        })
                    }
                </div>
            })}

        </section>
    )
}