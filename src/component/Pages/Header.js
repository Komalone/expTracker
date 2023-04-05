import { NavLink } from "react-router-dom";
import "./main.css";
import { Navbar } from 'react-bootstrap';
const Header=()=>{
    return (
        <Navbar bg='dark' expand="sm">
            <Navbar.Brand href="#">My Tracker</Navbar.Brand>
            <Navbar.Collapse id="basic">
                <nav>
                    <NavLink to="/main">Home</NavLink>
                    <NavLink to="/login">Login / Sign Up</NavLink>
                    <NavLink to="/main">Daily Expense</NavLink>
                </nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Header;