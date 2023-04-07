import { Fragment } from "react";
import { Link } from "react-router-dom";
import './main.css'

const Main=()=>{

    const verifyHandler=(e)=>{
        e.preventDefault();

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDgHb63575x-JMe_nLV3p1wqHRtBRS6j28",{
            method:'POST',
            body:JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken:localStorage.getItem('token')
            }),
            headers:{'Content-Type': 'application/json'}
        }).then((res)=>{
            const data=res.json();
            data.then((resp)=>{
                console.log(resp);
            })
        }).catch(err => console.log('error', err))

    }


    return (
        <Fragment>
        <div className="main">
        <div>Welcome to expense Tracker</div>
        <div className="right">Complete your Profile  
        <Link to="/completeprofile"> Complete Now </Link></div>
        </div>
        <div>
            <button className="verifyBtn" onClick={verifyHandler}> Verify Email </button>
        </div>
        </Fragment>
    );
}
export default Main;