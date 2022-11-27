import React from "react"
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaWallet } from "react-icons/fa";

export default function CustomNavbar() {
    return (
        <section>
            <Navbar>
                <Container fluid className="p-3">
                    <Navbar.Brand href="#home">Stargate</Navbar.Brand>

                    <Nav
                        className="ml-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" className="text-dark">
                            <FaWallet className="mx-1"/>
                            Connect wallet
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </section>
    )
}

