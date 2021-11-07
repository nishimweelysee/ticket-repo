import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import 'react-phone-number-input/style.css'
import PhoneInputWithCountry from 'react-phone-number-input'

export default function textInput({
  onInput, name, type, value, label, rules = null, error = null, placeholder, icon, readOnly = false
}) {
  const update = (evt) => {
    if(!evt)
      return

    if(!evt.target){
      let e = {
        target:{
          name,
          value:evt
        }
        
      }
      evt=e;
    }
    onInput(evt);
  };
  const border = (error == null) ? 'border-white' : 'border-red-500';
  const stl = icon ? "px-4 pl-10" : "";
  return (
    <div className="w-full my-2">
      <div className="w-full space-y-1 px-3">
        <label className="block text-sm text-white">{label}</label>
        {type !== 'tel' ? <label className="relative text-gray-400 focus-within:text-gray-600 block">
          {icon && <FontAwesomeIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 text-white" icon={icon} />}
          <input valid={rules} value={value} name={name} readOnly={readOnly} onChange={update} placeholder={placeholder} type={type} className={`block w-full text-white bg-transparent focus:outline-none border-b-2 ${border}    appearance-none w-full block  focus:outline-none ${stl}`} />
        </label> : <PhoneInputWithCountry id="phonenumber" defaultCountry="RW" placeholder="Enter phone number" value={value} name={name} valid={rules} readOnly={readOnly}  onChange={update} className={` border-b-2 ${border}   appearance-none focus:outline-none`}/>
        }
        <label className="block text-red-500 text-xs"> {error}</label>
      </div>
    </div>
  );
}