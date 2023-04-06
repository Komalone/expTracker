import { NavLink } from "react-router-dom";
import "./main.css";
import { Navbar, Nav  } from 'react-bootstrap';
const Header=()=>{
    return (
        <Navbar bg='light' expand="sm">
            <div className="nav">
            <Navbar.Brand>My Tracker</Navbar.Brand>
            <Navbar.Collapse id="basic">
                <Nav><ul>
                    <li><NavLink to="/main">HOME</NavLink></li>
                    <li><NavLink to="/">Login/ Sign Up</NavLink></li>
                    <li><NavLink to="/main">Daily Expense</NavLink></li>
                    </ul></Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
    );
}
export default Header;