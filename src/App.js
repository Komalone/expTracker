import React,{ Fragment} from 'react';
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Authentication from './component/Auth File/AuthPage';
import Main from './component/Pages/Main';
import Header from './component/Pages/Header';
import Profile from './component/Pages/Profile';

function App() {
  return (
    <Fragment>
      <headers>
        <Header/>
      </headers>
  <main>
        <Routes>
        <Route path='/main' element={<Main/>}/>
        <Route path='/' element={<Authentication/>}/>  
        <Route path='/completeprofile' element={<Profile/>}/>
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
