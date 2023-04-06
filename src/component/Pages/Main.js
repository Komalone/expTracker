import { Fragment } from "react";
import { Link } from "react-router-dom";
import './main.css'

const Main=()=>{
    return (
        <Fragment>
        <div className="main">
        <div>Welcome to expense Tracker</div>
        <div className="right">Complete your Profile  
        <Link to="/completeprofile"> Complete Now </Link></div>
        </div>
        </Fragment>
    );
}
export default Main;