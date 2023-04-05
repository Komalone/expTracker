import React,{ Fragment} from 'react';
import {Route, Routes} from 'react-router-dom'
import './App.css';
import Authentication from './component/Auth File/AuthPage';
import Main from './component/Pages/Main';
import Header from './component/Pages/Header';

function App() {
  return (
    <Fragment>
      <header>
        <Header/>
      </header>
  <main>
        <Routes>
        <Route path='/main' element={<Main/>}/>
        <Route path='/login' element={<Authentication/>}/>  
        </Routes>
      </main>
    </Fragment>
  );
}

export default App;
