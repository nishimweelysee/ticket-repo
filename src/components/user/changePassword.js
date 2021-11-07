import React,{useState,useEffect} from 'react';
import H5 from '@material-tailwind/react/Heading5';
import { Link, useLocation } from 'react-router-dom';
import TextInput from '../common/textInput';
import Button from '../common/button';
import PropTypes from 'prop-types';
import { validatePassword } from '../validations/validateInfo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { changePasswordAction } from '../../redux/actions/user/changePasswordAction';
import {connect} from 'react-redux';

let token;
const changePassword = (props)=>{
    const location = useLocation();
    
    useEffect(()=>{
        token = location.search.replace('?token=','');
    },[])
    const [errors, setErrors] =useState({})
    const [values, setValues] = useState({
        password:'',
        confirmPassword: ''
      });
  
      const handleChange = e =>{
        const  {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    
    const handleSubmit = e =>{
        e.preventDefault();
        setErrors(validatePassword(values))
        if(Object.keys(errors).length === 0){
           props.changePasswordAction(token,values)
        }
    }

    return(
        <div className="relative flex flex-col ">
         <div className="px-2 mt-4 md:px-8">
            <div className=" md:w-96">
            <div className="rounded-2xl bg-maincolor">
                    <div className="pt-2 text-center">
                        <H5 color="white" style={{ marginBottom: 0 }}>
                            Change Password
                        </H5>
                    </div>

                    <div >
                       
                      <form onSubmit={handleSubmit}>
                      <div className="px-4 ">
                        <TextInput type="password" label="Password" placeholder="Type your password" icon={["fas", "lock"]} onInput={handleChange}  name="password" error={errors.password}/>
                        </div>
                        <div className="px-4 ">
                        <TextInput type="password" label="Confirm password" placeholder="Type your password" icon={["fas", "lock"]} onInput={handleChange}  name="confirmPassword" error={errors.confirmPassword}/>
                        </div>
                        <div className="px-4 mb-4">
                          {props.changePassword.loading ? (<Button><CircularProgress /></Button>):(<Button type="submit" >Change Password</Button>)}
                        </div>
                      </form>
                    
                         <div className="flex px-4 mb-8">
                          <p className="mb-8 text-sm text-white md:text-lg">if you remember ?</p>
                          <Link to="/login" className="px-1 text-sm font-bold text-green-color md:text-lg" > Login</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

    )
}
changePassword.protoTypes = {
    changePasswordAction: PropTypes.func.isRequired,
    changePassword: PropTypes.object.isRequired,
   
}
const mapStateToProps = state => ({
    changePassword: state.changePassword,
   
})
export default connect(mapStateToProps, {changePasswordAction}) (changePassword);