import React from "react"
import { Row, Col } from "react-bootstrap";

export default function Commnuity() {

    const content = [
        {
            "title": "FDAO",
            "p": [
                {
                    "text": " Do you want to drop them all?",
                    "vote": "Voted 1, Yes",
                    "date": "2022-12-11 12:00"
                },
                {
                    "text": " Do you want to drop them all?",
                    "vote": "Voted 1, Yes",
                    "date": "2022-12-11 12:00"
                }
            ]
        }

    ]

    return (
        <section className="my-5">
            <h4 className="text-center text-md-start">Community Voting</h4>

            {content.map(item => {
                return <div className="p-3 bg-light">
                    <h3>{item.title}</h3>

                    {
                        item.p.map(row => {
                            return <Row>
                                    <div className="col-sm-6">
                                        <p className="">{row.text}</p>
                                        <a href="/" className="">{row.vote}</a>
                                    </div>
                                    <span className=" d-inline-block ms-auto col-sm-6">{row.date}</span>
                            </Row>
                        })
                    }
                </div>
            })}

        </section>
    )
}