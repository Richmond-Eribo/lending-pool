import React from 'react';

export default function TxDetailsListItem({title,state}){
    return(
        <li>
          <label className="text-xl font-bold">{title}</label>
          <p className="font-hairline ">{state}</p>
        </li>
    )
}