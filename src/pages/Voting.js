import React, { useEffect, useState } from 'react'
import './Voting.css'
import vote from '../Images/Vote.png'
import { Button } from '@mui/material'
// import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers'
import ABI from './ABI.json'
const Voting = () => {
    const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
    const [candidate1Vote, setCandidate1Vote] = useState(0);
    const [candidate2Vote, setCandidate2Vote] = useState(0);
    const [candidate3Vote, setCandidate3Vote] = useState(0);
    const [candidate4Vote, setCandidate4Vote] = useState(0);
    const [total,setTotal] = useState(0);

    
    const voteHandler = async()=>{
        

        if(candidate1Vote >= 1){
            await contract.voteForCandidate("0x666f6f0000000000000000000000000000000000000000000000000000000000")
        }
        if(candidate2Vote>=1){
              await contract.voteForCandidate("0x6261720000000000000000000000000000000000000000000000000000000000")
        }
        if(candidate3Vote>=1){
              await contract.voteForCandidate("0x666f120000000000000000000000000000000000000000000000000000000000")

        }
        if(candidate4Vote>=1){
              await contract.voteForCandidate("0x6261130000000000000000000000000000000000000000000000000000000000")
        }
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

   useEffect(()=>{
    const intervalID = setInterval(async() => {
        const candidate1 = fetch('https://blr1.blynk.cloud/external/api/get?token=AU6Jc0tYV-Wgfg4o4I3Wl0Ucs_sjBxJB&v1');
        const candidate2 = fetch('https://blr1.blynk.cloud/external/api/get?token=AU6Jc0tYV-Wgfg4o4I3Wl0Ucs_sjBxJB&v2');
        const candidate3 = fetch('https://blr1.blynk.cloud/external/api/get?token=AU6Jc0tYV-Wgfg4o4I3Wl0Ucs_sjBxJB&v3');
        const candidate4 = fetch('https://blr1.blynk.cloud/external/api/get?token=AU6Jc0tYV-Wgfg4o4I3Wl0Ucs_sjBxJB&v4');
        const candidate1Value = await(await candidate1).json(); // Store the candidate 1 value
        const candidate2Value = await(await candidate2).json() // Store the candidate 2 value
        const candidate3Value = await(await candidate3).json() // Store the candidate 3 value
        const candidate4Value = await(await candidate4).json()
       
        if(candidate1Value==1){
            setCandidate1Vote(candidate1Value);
            setTotal(total + 1);
            console.log("candidate",candidate1Vote)
            // await contract.voteForCandidate("0x666f6f0000000000000000000000000000000000000000000000000000000000")

            clearInterval(intervalID); // stop the interval
        }
        if(candidate2Value==1){
            setCandidate2Vote(1);
            setTotal(total + 1);
            console.log('vote received 2')

            clearInterval(intervalID); // stop the interval
        }
        if(candidate3Value==1){
            setCandidate3Vote(1);
            setTotal(total + 1)
            console.log('vote received 3')

            clearInterval(intervalID); // stop the interval
        }
        if(candidate4Value==1){
            setCandidate4Vote(1);
            setTotal(total + 1)
            console.log('vote received 4')

            clearInterval(intervalID); // stop the interval

        }
    }, 2000);


   },[candidate1Vote,candidate2Vote,candidate3Vote,candidate4Vote]);


  return (
    <div>
        {candidate1Vote === 0 && candidate2Vote === 0 && candidate3Vote === 0 && candidate4Vote === 0 ?<div className='voteRemaing'>
            <h1 className='voteHeading'>Please Vote For Your Candidate Through EVM Machine </h1>
            <img src={vote} height={'200px'} />
        </div> : <div className='voteDone'>
            <h1 className='voteHeading'>Please Click On Deploy To Cast Your Vote</h1>
            <Button variant="contained" size="large" onClick={voteHandler}>Deploy</Button>
        </div>}

        
    </div>
  )
}

export default Voting