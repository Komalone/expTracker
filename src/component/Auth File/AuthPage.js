import React, { 
  //useContext, 
  useRef, useState } from 'react'; 
import {useNavigate, Link} from 'react-router-dom';
//import AuthContext from './authContext';
import './auth.css';
import {useDispatch} from 'react-redux'
import { authAction } from '../../store/auth-slice';

const Authentication = () => {
  const dispatch= useDispatch();

    
    const [isLogin, setIsLogin] = useState(true);
   const emailInput=useRef("");
   const passwordInput=useRef("");
   const confPswdInput=useRef("");
   //const authCtx=useContext(AuthContext);
    const navigate= useNavigate();

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
        url= "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbLh47cYiIULS75nREIYr4JKrs7RQ-Bsk"
    }
    else{
        url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbLh47cYiIULS75nREIYr4JKrs7RQ-Bsk"
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
                //authCtx.login(resp.idToken, resp.email);
                //authCtx.isLoggedIn=true;
                dispatch(authAction.login({ token: resp.idToken, email: resp.email}));
                navigate("/")
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
    <form className='form' onSubmit={submitHandler}>
      <h1>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
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
       {isLogin && <Link to='/forgetpassword' > Forget Password ?</Link>}<br/>
       <button>{isLogin ? 'Login' : 'Create Account'}</button>
      </div>
    </form>
    <div className='toggle'>
    <button
          type='button'
          onClick={switchAuthModeHandler}
        >
          {isLogin ? " Don't have an account? Sign Up" : 'Login with existing account'}
        </button>
    </div>
  </section>
  )
}

export default Authentication;