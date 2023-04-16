
import "./main.css";
import { Navbar, Nav, Container, Button  } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { expAction } from "../../store/expense-slice";

const Header=()=>{
    const dispatch=useDispatch();
    const isAuth= useSelector(state => state.auth.isAuthenticated)
    const prem=useSelector(state=> state.exp.activePremium)
    const receivedData= useSelector(state => state.exp.items)

    const showDark=()=>{
        localStorage.setItem('dark theme', true);
    }

    const themeBtn=()=>{
        const change= dispatch(expAction.changeTheme());
        console.log(change);
    }

    //console.log(receivedData);

    const download=()=>{
        const cvs= "Category,Description,Amount\n"+
        Object.values(receivedData).map(
            ({category, description, amount})=>
                `${category}, ${description}, ${amount}`
        ).join("\n");

        const blob= new Blob([cvs]);
        
    }

    return (
        <Navbar bg='dark' variant="dark" expand="lg">
            <Container>
            <Navbar.Brand href="/">My Tracker</Navbar.Brand>
                <Nav className="header">
                    {isAuth && <Nav.Link to="/">HOME</Nav.Link>}
                    {prem && <Button variant="warning" onClick={showDark}>Activate Premium</Button>}
                    {isAuth && prem && <Nav.Link to="/" onClick={themeBtn}>Change theme</Nav.Link>}
                    {isAuth && prem && <button onClick={download}><a download='expense.cvs'>download Expense</a></button>}
                    </Nav>
            </Container>
        </Navbar>
    );
}
export default Header;