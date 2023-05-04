import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import politician from '../Images/politician.png'
import { ethers } from 'ethers'
import ABI from './ABI.json'
import { Button } from '@mui/material';
const Results = () => {
  const [candidate1, setCandidate1] = useState(0);
  const [candidate2, setCandidate2] = useState(0);
  const [candidate3, setCandidate3] = useState(0);
  const [candidate4, setCandidate4] = useState(0);
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const voteHandler =async()=>{
    const cand1vote = await contract.totalVotesFor("0x666f6f0000000000000000000000000000000000000000000000000000000000")
    setCandidate1(cand1vote);
    const cand2vote = await contract.totalVotesFor("0x6261720000000000000000000000000000000000000000000000000000000000")
    setCandidate2(cand2vote)
    const cand3vote = await contract.totalVotesFor("0x666f120000000000000000000000000000000000000000000000000000000000")
    setCandidate3(cand3vote)
    const cand4vote = await contract.totalVotesFor("0x6261130000000000000000000000000000000000000000000000000000000000")
    setCandidate4(cand4vote)
  }
  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async()=>{
      if(provider){
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        });

        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        })
        await provider.send("eth_requestAccounts",[]);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xD753265c4f5169F6442783A8e87392e2065362B5";
        const contract = new ethers.Contract(
          contractAddress,ABI,signer
        )
        console.log(provider)
        setContract(contract);
        setProvider(provider);
      }else{
        console.error("Metamask not installed");
      }
    };
    provider && loadProvider();

  },[])

  return (
    <div className='results'>
     <div>
     <Grid container spacing={2}>
      <Grid item xs={3} style={{ textAlign: 'center' }}>
        <img src={politician} height={'300px'}/>
        <h1 style={{'textAlign':'center'}}>Candidate 1</h1>
        <h3>{candidate1.toString()}</h3>
      </Grid>
  <Grid item xs={3} style={{ textAlign: 'center' }}>
  <img src={politician} height={'300px'}/>
  <h1>Candidate 2</h1>
  <h3>{candidate2.toString()}</h3>
  

  </Grid>
  <Grid item xs={3} style={{ textAlign: 'center' }}>
  <img src={politician} height={'300px'}/>
  <h1>Candidate 3</h1>
  <h3>{candidate3.toString()}</h3>

  </Grid>
  <Grid item xs={3} style={{ textAlign: 'center' }}>
  <img src={politician} height={'300px'}/>
  <h1>Candidate 4</h1>
  <h3>{candidate4.toString()}</h3>

  </Grid>
</Grid>
     </div>
<div style={{ textAlign: 'center' }}>
    <Button variant="contained" size="large" onClick={voteHandler}>Get Results</Button>
</div>

    </div>
  )
}

export default Results