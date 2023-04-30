import { Fragment, 
   // useContext, 
} from "react";
import { Link } from "react-router-dom";
import './main.css'
//import AuthContext from "../Auth File/authContext";
import DailyExpense from "./DailyExpense";
import {useDispatch} from 'react-redux'
import { authAction } from "../../store/auth-slice";

const Main=()=>{
    const dispatch= useDispatch();
     //const authCtx= useContext(AuthContext);
     //const [log,setLog]=useState(false);

    const logoutHandler=()=>{
        dispatch(authAction.logout()); 
        localStorage.removeItem('dark theme');
        localStorage.removeItem('premium');    
    }

    const verifyHandler=(e)=>{
        e.preventDefault();

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDbLh47cYiIULS75nREIYr4JKrs7RQ-Bsk",{
            method:'POST',
            body:JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken:localStorage.getItem('token')
            }),
            headers:{'Content-Type': 'application/json'}
        })
        .then((res)=>{
            const data=res.json();
            data.then((resp)=>{
                console.log(resp);
            })
        })
        .catch(err => console.log('error', err))

    }


    return (
        <Fragment>
        <div className="main">
        <h3>Welcome to expense Tracker</h3>
        <div className="right">Complete your Profile  
        <Link to="/completeprofile"> Complete Now </Link></div>
        </div>
        <div className="mainBtn">
             <button className="verifyBtn" onClick={logoutHandler} >Logout</button><br/>
            <button className="verifyBtn" onClick={verifyHandler}> Verify Email </button>
        </div>
        <div>
            <DailyExpense/>
        </div>
        </Fragment>
    );
}
export default Main;