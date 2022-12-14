import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Form, Modal } from "react-bootstrap";
import { FaPenSquare, FaCopy, FaTwitter, FaDiscord, FaGithub } from "react-icons/fa";
import m1 from '../assets/images/banner/m1.svg';
import m2 from '../assets/images/banner/m2.svg';
import m3 from '../assets/images/banner/m3.svg';
import m4 from '../assets/images/banner/m4.svg';
import m5 from '../assets/images/banner/m5.svg';

import {Principal} from '@dfinity/principal';
import { actor } from "../actors/index.js";

export default function Banner() {

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
        }

    ]

    // for the display of edit form modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [_following, setFollowing] = useState(0);
    const [_follower, setFollower] = useState(0);
    const [code, setCode] = useState('')
    const [updateName, setUpdateName] = useState("");
    const [principalId, setPrincipalId] = useState("")
    const [account, setAccount] = useState('')
    const [isPrincipal, setIsPrincipal] = useState(true)
    const [github, SetGithub] = useState('')
    const [twitter, SetTwitter] = useState('')
    const [discord, SetDiscord] = useState('')

    const [followState, setFollowState] = useState(false)

    // social page links
    var twi = `https://www.twitter.com/${twitter}`
    var dis = `https://www.discord.com/${discord}`
    var git = `https://www.github.com/${github}`

    useEffect(() => {
        fetchCanister();
    }, [updateName, name, _follower, _following, followState])



    // this variable is use to check if another user is viewing user's page or not

    // an async function to call the canister api when the page loads
    async function fetchCanister() {
        const getAccount = await actor.getAccount();
        const _get = await actor.get();
        const { ok: { nickname, code, user: { arr, _isPrincipal }, followers, following } } = getAccount
        const { ok: { account: userAccount, discord, discordTime, github, githubTime, principalId: userPrincipal, twitter, twitterTime, user } } = _get


        // setting values
        setUpdateName(nickname);
        setAccount(userAccount);
        setPrincipalId(userPrincipal);
        setFollower(followers);
        setFollowing(following);
        setCode(code);
        setIsPrincipal(_isPrincipal)
        SetTwitter(twitter[0].replace('@', ''))
        SetDiscord(discord)
        SetGithub(github)
    }

    function handleEdit() {
        handleClose();
    }

    function handleChange(e) {
        setName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { res } = await actor.updateNickname(name);
        setUpdateName(name);
    }

    async function handleUnfollow(){
        const id = Principal.fromText(principalId);
        const { res } = await actor.deleteFollowing(id);
        setFollowState(!followState)
        console.log("unFollow", followState)
    }

    async function handleFollow() {
        const id = Principal.fromText(principalId);
        const { res } = await actor.addFollowing(id);
        console.log("Follow")
        setFollowState(!followState)
        console.log(followState)
    }

    return (
        <section className="p-4">
            <Container>
                <Modal show={show} onHide={handleClose}>
                    <form action="" method="post" onSubmit={handleSubmit} className="p-4 bg-light form-group">
                        <label>Enter nickname</label>
                        <input
                            type="text"
                            placeholder="update nickname"
                            autoFocus
                            className="form-control" onChange={handleChange}
                        />
                        <Button variant="primary" type='submit' onClick={handleEdit}>
                            update
                        </Button>
                    </form>
                </Modal>

                <Row className="h-25">
                    <Col sm={12} md={5}>
                        <div className="position-relative">
                            <Image src={m1} className="rounded img-fluid w-100 h-100" width={340} height={340} />
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
                            <h1 className="fs-1 d-inline align-middle">{updateName}</h1>
                            <Button className="bg-light text-gray align-middle text-dark px-4 py-0 mx-1" onClick={handleShow}>edit</Button>
                            <span className="align-middle ms-2 fs-bold">#{code}</span>
                        </div>

                        <div className="my-3">
                            <p className="account_add">
                                <span className=" d-block d-md-inline" ><strong>Account ID:</strong></span>
                                <span style={{ "wordBreak": "break-all" }}> {account} <FaCopy /> </span>
                            </p>
                            <p>
                                <span className=" d-block d-md-inline "><strong>Principal ID:</strong></span>
                                <span> {principalId} <FaCopy /> </span>
                            </p>
                        </div>

                        <div className="icons my-4">
                            
                            {twitter && <a href = {twi} >
                                <FaTwitter className="me-2" style={{ "width": "40", "height": "40", "color": "#4CA0EB" }} />
                                </a>
                            }
                            {discord != null && <a href = {dis}>
                                <FaDiscord className="me-2" style={{ "width": "40", "height": "40", "color": "#5A65EA" }} />
                                </a>
                            }
                            {github != null && <a href = {git}>
                                <FaGithub className="me-2" style={{ "width": "40", "height": "40", "color": "#537DAA" }} />
                                </a>
                            }
                        </div>

                        <Row className="social-stat justify-content-center justify-content-md-start align-items-center text-center text-md-start">
                            <Col className="" xs={3} md={3}>
                                <h3> {_following.toString()} </h3>
                                <p>Followings</p>
                            </Col>
                            <Col className="" xs={3} md={2}>
                                <h3> {_follower.toString()} </h3>
                                <p>Followers</p>
                            </Col>
                        </Row>
                        {
                            isPrincipal &&
                                <Button className="bg-dark text-white border-none mt-4" onClick={followState ? handleUnfollow : handleFollow }> {followState ? "Unfollow" : "follow on STARGATE" } </Button>
                        }
                    </Col>

                </Row>

            </Container>
        </section>
    )
}
