import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function dataList({
  onInput, name, value, label, rules = null, error = null, icon,options,list,id,placeholder,type
}) {
  const update = (evt) => {
    onInput(evt);
  };
  const border = (error == null) ? 'b-secondcolor' : 'border-red-500';
  const stl = icon?"px-4 pl-10":"";
  return (
    <div className="w-full">
      <div className="w-full text-black space-y-1 p-3">
        <label className="relative text-gray-400 focus-within:text-gray-600 block">
        {icon && <FontAwesomeIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 text-black" icon={icon} />}
          <input list={list}  id={id} valid={rules} othervalue="1"  name={name}  onChange={update} placeholder={placeholder} type={type} className={`block w-full  bg-transparent focus:outline-none border-b-2  ${border}  p-3  appearance-none w-full block  focus:outline-none ${stl}`} />
          <datalist id={list} className={`w-full`} > 
            {
                _.map(options,(op,index)=>{
                    return <option key={index}>{op}</option>
                })
            }
          </datalist>
          </label>
        <label className="block text-red-500 text-xs"> {error}</label>
      </div>
    </div>
  );
}