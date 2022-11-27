import React from "react"
import {Image, Badge} from "react-bootstrap";

export default function Token() {

    const content = [
        {
            "title": "-$10000.222",
            "p": [{
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "ICP",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": false,
            },
            {
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "WICP",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": true,
            },
            {
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "WICP",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": true,
            },
            {
                "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000",
                "title": "XTC",
                "text1": "1000.222",
                "text2": "$888.111",
                "hasBadge": false,
            },
            {
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
                content.map(item=>{
                    return <div className="bg-light p-4">
                        <h3 className="text-center">{item.title}</h3>

                        {item.p.map(row => {
                            return <div className="bg-light my-2 p-4 d-flex align-items-center">
                                <Image src={row.src} width={80} height={80} className="rounded-circle d-inline me-2" />
                                <p className="d-inline me-2">{row.title}</p>
                                {row.hasBadge && <Badge className="bg-primary rounded"> Ext </Badge>}

                                <div className="ms-auto text-end">
                                    <h3>{row.text1}</h3>
                                    <p>{row.text2}</p>
                                </div>
                            </div>
                        })}
                    </div>
                })
            }
        </section>
    )
}