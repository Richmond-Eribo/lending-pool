import React,{useEffect, useState,useRef}from 'react';
import { useWalletContext } from '../hooks';
import LoadingIcon from './LoadingIcon';
import ModalOverlay from './ModalOverlay';
import Symbol from './Symbol';
import TxButtons from './TxButtons';
import TxDetailsList from './TxDetailsList';
import TxDetailsListItem from './TxDetailsListItem';
import TxDetailsModal from './TxDetailsModal';
import BrtPool from '../contracts/BrtPool';

export default function Burrow(){
    // const [loan,setLoan]=useState(0);
    // const [collateral,setCollateral]=useState(0);
    const loan=useRef();
    const collateral=useRef();
    const [showModal,setShowModal]=useState(false);
    const {web3,selectedNetwork}=useWalletContext();
    const [fetching,setFetching]=useState(false);
    const [info,setInfo]=useState({
      loan:"",
      borrowTime:"",
      collateral:""
    });
    const closeModal=()=>{
      setShowModal(false);
    }

    const changeCollateral=async()=>{
      const ln=loan.current.value
      if(ln > 0 && `${ln}`.length > 0){
          const contract= new BrtPool();
          setFetching(true)
          const col=await  contract.calculateCollateral(ln);
          const borrowTime=await contract.borrowTime();
          const data={
            loan:ln,
            collateral:col  /(10 ** 18),
            borrowTime
          }
         
         
          collateral.current.value = col /(10 ** 18);
          setFetching(false)
          setInfo(data);
       

      }
      else{
        collateral.current.value =0;
        setInfo({
          loan:"",
          borrowTime:"",
          collateral:""
        })
      }
     
     
    }

    const changeLoan=async()=>{
      const col=collateral.current.value;
      if(col > 0 && `${col}`.length){
          const contract= new BrtPool();
          setFetching(true)
        
          const ln=await  contract.calculateLoan(col);
          const borrowTime=await contract.borrowTime();
          const data={
            loan:ln / (10 ** 18),
            borrowTime,
            collateral:col
          }
          loan.current.value=ln /(10 ** 18);
          setFetching(false)
          setInfo(data);

      }
      else{
        loan.current.value =0;
        setInfo({
          loan:"",
          borrowTime:"",
          collateral:""
        })
      }
      
     
     
    }

    return(
      
        <div className="space-y-5 relative">
             
              <div className="md:flex md:items-center md:space-x-10 space-y-2">
              <label>
            <p className="md:text-xl"> Loan</p>
            <Symbol symbol="BRT" bgColor="bg-gray-400" padding="p-2 md:p-3 "/>
            <input type="number" min="0" ref={loan} placeholder="loan amount" className=" p-2 md:p-3 border-2 border-dashed rounded text-gray-900" disabled={selectedNetwork ==1} onChange={()=>{changeCollateral()}}/>
    

            </label>

            <div className="">
            <svg className="w-6 h-6 md:invisible "xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <svg className="w-6 h-6 invisible md:visible " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
            </div>

            
            <label>
            <p className="md:text-xl "> Collateral</p>
            <Symbol symbol="ETH" bgColor="bg-gray-400" padding="p-2 md:p-3"/>
            <input type="number" min="0" ref={collateral} placeholder="collateral amount" className="p-2 md:p-3 border-2 border-dashed text-gary-900" disabled={selectedNetwork ==1} onChange={()=>{changeLoan()}}/>
           
           
            </label>
            
            <div className="">
            <label className="text-xl">Interest Rate</label>
            <p className="text-2xl md:text-3xl font-bold text-green-400">5%</p>
            </div>
           
              </div>
             {fetching?"please wait...":null}
            
             {selectedNetwork != 1?
              <button className="bg-gray-900  md:block p-2 rounded text-white  button-disabled" disabled={info.loan == ""} onClick={()=>{setShowModal(true)}} >Continue</button>
              :<></>
             }
            
            
             <ModalOverlay show={showModal}>

          
                   <TxDetailsModal show={true} headerTitle="Transaction Overview" >
                  <TxDetailsList>
                      <TxDetailsListItem title="Loan Amount" state={`${info.loan} BRT`}/>
                      <TxDetailsListItem title="Interest" state="5%"/>
                      <TxDetailsListItem title="Collaterization Ratio" state="150%"/>
                      <TxDetailsListItem title="Collateral Amount" state={`${info.collateral} ETH`}/>
                      <TxDetailsListItem title="Expires" state={`${info.borrowTime} seconds`}/>
                  </TxDetailsList>
                  <TxButtons close={closeModal} pending={true}>
                  
                      <button className="border-2 border-solid border-gray-900  text-gray-900 p-2 flex button-disabled" disabled >
                        Borrow
                        <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                       </svg>
                      </button>
                      
                  </TxButtons>
                  
                 
              </TxDetailsModal> 
        
            </ModalOverlay>
       </div>
       
     )
}