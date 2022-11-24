// import {Row} from "react-bootstrap";
import BtnComponent from "./button";
import {FaGithub, FaTwitter, FaDiscord} from "react-icons/fa";

export default function TopSection(){
    const style = {
        width:"30",
        height:"30",
        margin:"5"
    }
    return(
        <>
            <div className="top-info row ">
                <h2 className="colsm-12 col-md-8">
                    Nickname
                    <BtnComponent text="edit" />
                    <span className="mx-3">#123123</span>
                </h2>

                <p className="lead">Account ID: 0c10afejddif094884490wncmlww9er80ww9e88r8e9r9r9 <span></span></p>

                <p className="lead">Principle ID: ukfr5-fijfks-climt-s7vndk-vabdb-i2djdkk-qqn77-sjdhg4-sodhe-subngh-qae <span></span></p>
            </div>

            {/* font icons */}
            <div>
                <a href="/"><FaTwitter  style={style} /></a>
                <a href="/"><FaDiscord style={{color:"purple", ...style}} /></a>
                <a href="/"><FaGithub style={style} /></a>
            </div>

            <div className="d-sm-block d-md-flex my-3 justify-sm-content-center">
                <div className="">
                    <p>312</p>
                    <small>following</small>
                </div>
                <div className="mx-4">
                    <p>12131</p>
                    <small>Followers</small>
                </div>
            </div>
            <BtnComponent text = "Follow on STARGATE" />

            {/* <Row></Row> */}
        </>
    )
}