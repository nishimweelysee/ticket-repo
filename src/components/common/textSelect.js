import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function textInput({
  onInput, name, value, label, rules = null, error = null, icon,options
}) {
  const update = (evt) => {
    onInput(evt);
  };
  const border = (error == null) ? 'border-white' : 'border-red-500';
  const stl = icon?"px-4 pl-10":"";
  return (
    <div className="w-full my-2">
      <div className="w-full space-y-1 px-3">
        <label className="block text-sm text-white">{label}</label>
        <label className="relative text-gray-400 focus-within:text-gray-600 block">
        {icon && <FontAwesomeIcon className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 left-3 text-white" icon={icon} />}
          <select valid={rules}  value={value} name={name} onChange={update}   className={`block w-full text-white bg-transparent focus:outline-none border-b-2 ${border}   appearance-none w-full block  focus:outline-none ${stl}`} > 
            <option value=""  disabled>Choose option</option>
            {
                options.map((op,index)=>{
                    return <option key={index}>{op}</option>
                })
            }
          </select>
        </label>
        <label className="block text-red-500 text-xs"> {error}</label>
      </div>
    </div>
  );
}