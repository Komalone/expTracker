import React, { useContext, useRef, useState } from 'react';
import AuthContext from './authContext';
import './auth.css';

const Authentication = () => {
    
    const [isLogin, setIsLogin] = useState(true);
   const emailInput=useRef("");
   const passwordInput=useRef("");
   const confPswdInput=useRef("");
   const authCtx=useContext(AuthContext);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(e)=>{
    e.preventDefault();

    const enteredEmail=emailInput.current.value;
    const enteredPassword=passwordInput.current.value;
    let url;
    if(!isLogin && (enteredPassword !== confPswdInput.current.value)){
        return alert("Password is not same")
    }
    else if(isLogin){
        url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgHb63575x-JMe_nLV3p1wqHRtBRS6j28"
    }
    else{
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgHb63575x-JMe_nLV3p1wqHRtBRS6j28"
    }
    fetch(url,{
        method:'POST',
        body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        if(res.ok){

            console.log("successfully login", res);
            alert("successfully login");
            let data= res.json();
            data.then((resp)=>{
                console.log(resp);
                authCtx.login(resp.idToken)
            })
        }else{
            const data= res.json();
            data.then((err)=>{
                alert(err.error.message);
            })
        }
    })
  };



  return (
    <section>
    <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
    <form className='form' onSubmit={submitHandler}>
      <div className='control'>
        <label htmlFor='email'>Your Email </label><br/>
        <input type='email' id='email' required ref={emailInput} />
      </div>
      <div className='control'>
        <label htmlFor='password'>Your Password</label><br/>
        <input type='password' id='password' required ref={passwordInput} />
      </div>
      {!isLogin && <div className='control'>
        <label htmlFor='password'>Confirm Password</label><br/>
        <input type='password' id='password2' required ref={confPswdInput} />
      </div>}
      <div className='actions'>
       {<button>{isLogin ? 'Login' : 'Create Account'}</button>}
        <button
          type='button'
          className='toggle'
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      </div>
    </form>
  </section>
  )
}

export default Authentication;