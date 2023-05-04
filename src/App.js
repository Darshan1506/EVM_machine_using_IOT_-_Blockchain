
import './App.css';
import { useEffect, useState } from 'react';
import {Navigate, Route,Routes} from "react-router-dom"
import LandingPage from './pages/LandingPage';
import Voting from './pages/Voting';
import Results from './pages/Results';
import NavbarApp from '../src/Component/Navbar'
function App() {
  

  return (
    <>
          <NavbarApp/>



      <Routes>
        
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/voting' element={<Voting/>}/>
        <Route path='/results' element={<Results/>}/>


      </Routes>
  
   </> 

  );
}

export default App;