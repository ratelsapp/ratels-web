import React, { useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { FaPenSquare, FaCopy, FaFacebook, FaDiscord, FaGithub } from "react-icons/fa";

export default function Banner() {

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
            "key": 4,
            "src": "https://media.istockphoto.com/id/1396048367/vector/triple-dots-icon-vector-three-dots-as-a-symbol-of-menu-interface-or-more-options-3-ellipses.jpg?s=612x612&w=0&k=20&c=wCh-lsZlTRtE_AgnmqSmYRARZKfawhtObulGRV_FRd0="
        }
        
    ]

    const handleEdit = () =>{
        setName("Hello world");
    }

    const [followers, SetFollowers] = useState(0);
    const [following, SetFollowing] = useState(0);
    const [name, setName] = useState("NickName");
    

    // set Followers method is called when user follows another user on the site
    // SetFollowers(followers++);
    // SetFollowing(following++);
    
    return (
        <section className="">
            <Container>
                <Row className="h-25">
                    <Col sm={12} md={5}>
                        <div className="position-relative">
                            <Image src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=2000" className="rounded img-fluid w-100 h-100" width={340} height={340} />
                            <FaPenSquare className="position-absolute bottom-0 end-0" width={90} height={90} />
                        </div>

                        <div className=" d-flex justify-content-around mt-2 rounded container text-center text-md-start">
                            {images.map((data) => {
                                return <div className="d-flex" key={data.key} >
                                    <Image src={data.src} className=" me-2 img-fluid rounded" width={80} height={80} />
                                </div>
                            })}
                        </div>
                    </Col>
                    <Col sm={12} md={7} className="align-middle text-center text-md-start">
                        <div className="align-middle my-3">
                            <h1 className="fs-1 d-inline align-middle">{name}</h1>
                            <Button className="bg-light text-gray align-middle text-dark px-4 py-0 mx-1" onClick={handleEdit}>edit</Button>
                            <span className = "align-middle ms-2 fs-bold">#123123</span>
                        </div>

                        <div className="my-3">
                            <p className="account_add">
                                <span className=" d-block d-md-inline" ><strong>Account ID:</strong></span>
                                <span style={{ "wordBreak": "break-all" }}>0c10afejddif094884490wncmlww9er80ww9e88r8e9r9r9 <FaCopy /> </span>
                            </p>
                            <p>
                                <span className=" d-block d-md-inline "><strong>Principle ID:</strong></span>
                                <span>ukfr5-fijfks-climt-s7vndk-vabdb-i2djdkk-qqn77-sjdhg4-sodhe-subngh-qae <FaCopy /> </span>
                            </p>
                        </div>

                        <div className="icons my-4">
                            <FaFacebook className="me-2" style={{ "width": "40", "height": "40", "color":"#4CA0EB" }} />
                            <FaDiscord className="me-2" style={{ "width": "40", "height": "40", "color":"#5A65EA" }} />
                            <FaGithub className="me-2" style={{ "width": "40", "height": "40", "color" : "#537DAA" }} />
                        </div>

                        <Row className="social-stat justify-content-center justify-content-md-start align-items-center text-center text-md-start">
                            <Col className="" xs={3} md={3}>
                                <h3>{following}</h3>
                                <p>Followings</p>
                            </Col>
                            <Col className="" xs={3} md={2}>
                                <h3>{followers}</h3>
                                <p>Followers</p>
                            </Col>
                        </Row>
                        <Button className="bg-dark text-white border-none mt-4">Follow on STARGATE</Button>
                    </Col>

                </Row>
            </Container>
        </section>
    )
}
