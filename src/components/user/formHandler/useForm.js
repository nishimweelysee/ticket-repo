import { useState, useEffect } from "react";


export const useForm=(validate, registerAction,register)=>{

    const [values, setValues] = useState({
      firstName:'',
      lastName:'',
      phoneNumber:'',
      email:'',
      password:'',
      confirmPassword:''
    }) ;
    const [errors, setErrors] = useState({});

    const handleChange = e =>{
        const  {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
  
        });
    };

    const handleSubmit = e=>{
        e.preventDefault();
        setErrors(validate(values));

        if (Object.keys(errors).length === 0) {

            registerAction(values)
            
      }
  
    }
    

  return {handleChange, values, handleSubmit, errors};
}

