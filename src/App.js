import React,{ Fragment, 
  //useContext
} from 'react';
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Authentication from './component/Auth File/AuthPage';
import Main from './component/Pages/Main';
import Header from './component/Pages/Header';
import Profile from './component/Pages/Profile';
//import AuthContext from './component/Auth File/authContext';
import ForgetPassword from './component/Auth File/ForgetPswd';
import {useSelector} from 'react-redux'

function App() {
  //const auth= useContext(AuthContext);
 // const isLogin= auth.isLoggedIn;
 const isLogin= useSelector(state=> state.auth.isAuthenticated);
 

  return (
    <Fragment>
        <Header/>
  <main>
        <Routes>
        <Route path='/' element={!isLogin ? <Authentication/> : <Main/>}/>  
        <Route path='/completeprofile' element={!isLogin ? <Authentication/> : <Profile/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
