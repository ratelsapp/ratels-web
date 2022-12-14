import React from "react"
import {Badge, Image} from "react-bootstrap";

import m1 from '../assets/images/nft/m1.svg';
import m2 from '../assets/images/nft/m2.svg';
import m3 from '../assets/images/nft/m3.svg';
import m4 from '../assets/images/nft/m4.svg';
import m5 from '../assets/images/nft/m5.svg';

export default function Nft(){

    const content = [
        {
            "key" : 1,
            "title" : "Entrepot",
            "hasBadge": true,
            "images": [m1, m2, m3, m4, m5]
        },
        {
            "key" : 2,
            "title" : "Entrepot",
            "hasBadge": true,
            "images": [m1, m2, m3, m4, m5]
        },
        {
            "key" : 3,
            "title" : "Entrepot",
            "hasBadge": true,
            "images": [m1, m2, m3, m4, m5]
        }
    ]

    return(
        <section className="my-5">
        <h2 className="my-3 text-center text-md-start">Nft</h2>

        <div className="my-3">
            {content.map(item=>{
                return <div key={item.key} className="bg-light my-3 rounded p-4">
                    <h3 className="d-inline my-3">{item.title}</h3>
                    {item.hasBadge && <Badge className="bg-primary ms-2 px-3" style={{"backgroundColor" : "#4CA0EB"}}> Ext </Badge>}

                    <div className="d-flex justify-content-around mt-3">
                        {item.images.map((img, key)=>{
                            return <Image key = {key} src={img} className="me-3 img-fluid rounded" width={50} height={50}/>
                        })}
                    </div>
                </div>
            })}
        </div>
        </section>
    )
}