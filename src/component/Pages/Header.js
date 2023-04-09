
import "./main.css";
import { Navbar, Nav, Container  } from 'react-bootstrap';
const Header=()=>{

    return (
        <Navbar bg='dark' variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="/">My Tracker</Navbar.Brand>
                <Nav className="header">
                    <Nav.Link to="/">HOME</Nav.Link>
                    <Nav.Link to="/"></Nav.Link>
                    <Nav.Link to="/"></Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
    );
}
export default Header;