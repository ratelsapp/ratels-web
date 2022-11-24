import {Container, Row, Col} from "react-bootstrap";
import Lside from "./components/Lside";
import Img from "./components/Img";
import GroupImg from "./components/groupImages";
// import "./App.css";


function App() {
  return (
    <>
    <Container className="">
        <Row className="my-3">
          <Col xs={12} md={4}>
            <Img src="https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg?w=2000" className="img-fluid" />
            <div>
              <GroupImg />
            </div>
          </Col>

          <Col xs={12} md={8}>
            <Lside />
          </Col>
        </Row>
    </Container>
    </>
  );
}

export default App;