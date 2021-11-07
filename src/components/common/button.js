import React from 'react';

const Button = (props)=>{
    return(
        <div>
            <div>
               <button type={props.type} disabled={props.disabled} onClick={props.onClick} className="w-full p-2 text-white rounded-md bg-buttonColor " > 
                {props.children}
               </button>
            </div>
        </div>
    )
}
export default Button;