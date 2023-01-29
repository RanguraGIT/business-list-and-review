
import { Nav, Navbar } from "react-bootstrap";

function resNav() {
    return (
        <Navbar bg="dark" variant="dark" className="px-5">
            <Navbar.Brand href="/">
                <img src={process.env.PUBLIC_URL + '/image/logo.png'} alt="logo" width="30" height="30" className="d-inline-block align-top"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="nav-menu"/>
            <Navbar.Collapse id="nav-menu" className="justify-content-end">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default resNav;