import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export default class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/fermentorium">Fermentorium</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}