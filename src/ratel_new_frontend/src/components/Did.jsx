import React from "react"


export default function Did(){

    const content = [
        {
            "key": 1,
            "title" : "ICNS",
            "text": "tomada.icp"
        },
        {
            "key": 2,
            "title": "ICNAMING",
            "text" : "tomada.icp"
        },
        {
            "key": 3,
            "title" : "Dmail",
            "text" : "topme111@dmail.icp | tomada.icp "
        }
    ]
    return(
        <section className="my-4">
        <h2 className="my-3 text-center text-md-start">DID</h2>

        {
            content.map(item=>{
                return <div className="bg-light p-3 my-4 rounded text-center text-md-start" key={item.key}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                </div>
            })
        }
        </section>
    )
}