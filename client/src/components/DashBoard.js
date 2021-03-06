import React,{useEffect, useState} from 'react';
import BrtPool from '../contracts/BrtPool';
import { useWalletContext } from '../hooks';
import LoadingCard from './LoadingCard';
import LoanCard from './LoanCard';

import LoanListTitle from './LoanListTitle';
import NothingFound from './NothingFound';

export default function DashBoard(){
    const [loading,setLoading]=useState(true);
    const {web3,selectedAccount} =useWalletContext()
    const [loans,setLoans]=useState([]);
    const removeLoan=(id)=>{

     const result=  loans.filter((loan)=>{
        return  loan.id !== id;
       })
       setLoans(result);

    }
    useEffect(()=>{
        (async()=>{
          
            if(selectedAccount){
                const pool=new BrtPool(web3);
                // await contract.borrow({from:selectedAccount,value: 1.2 * (10 ** 18)})
                // await contract.isExpired(0);

                const info=await pool._getActiveLoans(selectedAccount);
                if(info.length >=1){
                    setLoans(info);
                }

                setLoading(false);
    
            }
        })()

    },[selectedAccount])
    if(loading){
        return(
            <LoadingCard/>
        )
    }
    else{
    return(
     <>
                {loans.length >= 1?
                   <>
                   <LoanListTitle/>
                   {loans.map((loan)=>{
                       return(
                           <LoanCard borrowed={loan.collateral /(10 ** 18)} payBack={loan.redemptionPrice  /(10 ** 18)} expires={loan.expires} id={loan.id} removeLoan={removeLoan}/>
                       )
       
                   })}
                   
                   
                   </>:
                  <NothingFound text="You dont have any Active loans" />
                
               }
  


</>
       
    )
}
}