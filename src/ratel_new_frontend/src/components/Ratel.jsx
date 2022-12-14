import React from "react"
import {Image} from "react-bootstrap"
import m1 from '../assets/images/banner/m1.svg';
import m2 from '../assets/images/banner/m2.svg';
import m3 from '../assets/images/banner/m3.svg';
import m4 from '../assets/images/banner/m4.svg';
import m5 from '../assets/images/banner/m5.svg';

export default function Ratel() {



    const images = [
        {
            "key": 1,
            "src": m2
        },
        {
            "key": 2,
            "src": m3
        },
        {
            "key": 3,
            "src": m4
        },
        {
            "key": 4,
            "src": m5
        },
        {
            "key": 4,
            "src": m1
        }
    ]

    return (
        <section className="my-5 text-center text-md-start">
            <h2 className="">Ratels</h2>
            <div className=" d-flex justify-content-around mt-5 p-4 bg-light rounded text-center text-md-start">
                {images.map((data) => {return <div className="d-flex " key = {data.key} >
                    <Image src = {data.src} className=" me-2 img-fluid rounded" width={50} height={50} />
                </div>  })}
            </div>
        </section>
    )
}