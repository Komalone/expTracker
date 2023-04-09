import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const ForgetPassword=()=>{
    const [email, setEmail]= useState();
    const [send, setSend]= useState(false)

    const navigate=useNavigate()

    const emailHandler=(e)=>{
        setEmail(e.target.value);
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        setSend(true);
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDbLh47cYiIULS75nREIYr4JKrs7RQ-Bsk",{
            method: "POST",
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:email
            }),
            headers:{'Content-Type': 'application/json'}
        }).then((res)=>{
            setSend(false);
            const data=res.json();
            data.then((resp)=>{
                console.log(resp);
                if(resp.error){
                    alert(resp.error.message);
                }else{
                    alert('Check your Mail and Reset Password');
                    navigate('/')
                }
            })
        }).catch((err)=>{
            console.log(err)
            setSend(false);
        })
    }

    return (
        <Fragment>
            <form className='form'>
                <div className='forget'>
                <label>Enter Registered Email ID</label><br/>
                <input type='email' onChange={emailHandler} value={email}/><br/>
                {send && <p>Sending link Request... </p>}
                {!send && <button type='submit' onSubmit={submitHandler}>Send Link</button>}<br/>
                <Link to='/'>Already a user ? Login</Link>
                </div>
            </form>
        </Fragment>
    );
}

export default ForgetPassword;