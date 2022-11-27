import React from "react"


export default function Social(){

    const content = [
        {
            "title" : "DSCVR",
            "text": "Coming soon"
        },
        {
            "title": "Distrikt",
            "text" : "Coming soon"
        },
        {
            "title" : "Duance",
            "text" : "Title list",
            "date": "2022-02-20 12:00"
        }
    ]

    return(
        <section className="my-5">
            <h2 className="my-4 text-center text-md-start">Social</h2>

            {content.map(item=>{
                return <div className="bg-light mt-3 rounded p-3">
                    <h3 className="text-start">{item.title}</h3>
                    <div className={item.text == "Coming soon" ? "p-5 text-center" : "p-2 d-flex justify-content-between"}>
                        <span>{item.text}</span>
                        <span>{item.date && item.date}</span>
                    </div>
                </div>
            })}
        </section>
    )
}