import React ,{useState}from 'react';
import { useWalletContext } from '../hooks';
import ConnectedIcon from './ConnectedIcon';
import EtherIcon from './EtherIcon';
import Identicon from './Identicon';
import ModalOverlay from './ModalOverlay';


export default function Header(){
   const[show,setShow]=useState(false)
   const {connectToWallet,selectedAccount}=useWalletContext();
    return(
        <header className="border-b p-3 flex justify-between item-center ">
        <h1 className="text-xl font-bold ">Lending Pool</h1>
        {!selectedAccount?
        <>
        
        <button className="flex align-items-center border border-gray-500 md:p-2 rounded-full" onClick={async()=>{
          setShow(!show)
          connectToWallet()
         
         
          ;
        }}>
         Connect To Wallet<EtherIcon/>


       </button> 
       <ModalOverlay show={show}>
            <div className="bg-white max-width-500 mb-10 mt-10 rounded  flex justify-center items-center ">
              <div>x</div>
                     
                   <div className="space-y-4">
                   <h2 className="text-center text-2xl">Initailizing Wallet..</h2>
                   <h3 className="text-center text-xl text-red-700">please confirm connection to wallet.Wallet should popup anytime soon</h3>
                 
                   <div className="flex items-center justify-center">
                   <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 330 330"
      version="1.1"
      viewBox="0 0 330 330"
      xmlSpace="preserve"
      className="w-10 h-10 animate-spin"
    >
      <g>
        <path d="M97.5 165c0-8.284-6.716-15-15-15h-60c-8.284 0-15 6.716-15 15s6.716 15 15 15h60c8.284 0 15-6.716 15-15z"></path>
        <path d="M307.5 150h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15z"></path>
        <path d="M172.5 90c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15s-15 6.716-15 15v60c0 8.284 6.716 15 15 15z"></path>
        <path d="M172.501 240c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15v-60c0-8.284-6.716-15-15-15z"></path>
        <path d="M77.04 48.327c-5.856-5.858-15.354-5.857-21.213 0-5.858 5.858-5.858 15.355 0 21.213l42.427 42.428a14.954 14.954 0 0010.606 4.394c3.838 0 7.678-1.465 10.606-4.393 5.858-5.858 5.858-15.355 0-21.213L77.04 48.327z"></path>
        <path d="M246.746 218.034c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.858-5.857 15.355 0 21.213l42.428 42.426a14.953 14.953 0 0010.607 4.393c3.839 0 7.678-1.465 10.606-4.393 5.858-5.858 5.858-15.355 0-21.213l-42.428-42.426z"></path>
        <path d="M98.254 218.034L55.828 260.46c-5.858 5.858-5.858 15.355 0 21.213a14.953 14.953 0 0010.607 4.393 14.95 14.95 0 0010.606-4.393l42.426-42.426c5.858-5.858 5.858-15.355 0-21.213-5.858-5.858-15.356-5.858-21.213 0z"></path>
      </g>
    </svg>
                   </div>

                   <div className="flex justify-center">
                   <button className="bg-red-700 p-2 text-white rounded-full" onClick={()=>{setShow(!show)}}>Go Back</button>
                   </div>

                    </div>

            </div>
         </ModalOverlay>
        </>:
        <></>
        }
       
       {/* <Identicon address="0x47B2812CC92981998C61E4CD63e4Fd5A7C32e585"/> */}
       {selectedAccount?
        <div className="flex bg-gray-100 p-2 rounded-full font-bold  shadow-md">
      {selectedAccount.substr(0,7)}...{selectedAccount.substr(selectedAccount.length -6,selectedAccount.length)}<Identicon address={`${selectedAccount}`}/> 
        </div>:<></>
       }
      
       
        

    
      
      </header>

    )
}