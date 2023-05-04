import React from 'react'
import NavbarApp from '../Component/Navbar'
import voting from '../Images/voting.png'
import Grid from '@mui/material/Grid'; // Grid version 1
import './Landing.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();
  const handleResults = ()=>{
    navigate('/results')
  }
  const handleVoting = ()=>{
    navigate('/voting')
  }
  return (
    <div className='landingPage'>
      <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={6}>
          <p className='mainHead'>Let's Vote For Our Nation In a New way</p>
          <div className='btnHead' spacing={2}>
          <Button variant="contained" size="large" onClick={handleResults}>Results</Button>
          <Button variant="outlined" size="large" onClick={handleVoting}>Voting</Button>
          </div>
        </Grid>
        <Grid item xs={6} center>
          <div className='mainImg'>
            <img src={voting} height={'500px'}/>
          </div>
        </Grid>
        
        </Grid>
    </div>
  )
}

export default LandingPage