import React from "react"
import {Image} from "react-bootstrap"


export default function Ratel() {



    const images = [
        {
            "key": 1,
            "src": "https://img.freepik.com/premium-vector/mutant-ape-yacht-club-nft-artwork-collection-set-unique-bored-monkey-character-nfts-variant_361671-259.jpg?w=2000"
        },
        {
            "key": 2,
            "src": "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
        },
        {
            "key": 3,
            "src": "https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=400x300"
        },
        {
            "key": 3,
            "src": "https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=400x300"
        },
        {
            "key": 4,
            "src": "https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=400x300"
        },
        {
            "key": 5,
            "src": "https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png?compress=1&resize=400x300"
        }
    ]

    return (
        <section className="my-5 text-center text-md-start">
            <h2 className="">Ratels</h2>
            <div className=" d-flex justify-content-around mt-5 p-4 bg-light rounded container text-center text-md-start">
                {images.map((data) => {return <div className="d-flex ">
                    <Image key = {data.key} src = {data.src} className=" me-2 img-fluid rounded" width={60} height={80} />
                </div>  })}
            </div>
        </section>
    )
}