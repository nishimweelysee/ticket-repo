import React ,{useState} from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../common/textInput';
import Button from '../common/button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux'
import { forgotPasswordAction } from '../../redux/actions/user/forgotPasswordAction';
import PropTypes from 'prop-types';


const resetPassword = (props)=>{
    const [values, setValues] = useState({
        email:'',
      });
  
    const handleChange = e =>{
        const  {name, value} = e.target;
        setValues({
            [name]: value
        });
    };
    const handleSubmit = e=>{
        e.preventDefault();
       props.forgotPasswordAction(values)
    }
    return(
        <div className="relative flex flex-col mb-8 ">
         <div className="px-2 mt-4 md:px-8">
            <div className=" md:w-96">
            <div className="rounded-2xl bg-maincolor">
                    <div className="pt-2 text-center">
                        <h2 className="font-bold text-white ">
                            Reset Password
                        </h2>
                    </div>

                    <div>
                       <form onSubmit={handleSubmit}>
                       <div className="px-4 mb-4">
                            <TextInput type="Email" label="Email" placeholder="Type your email" icon={["fas", "envelope"]}  onInput={handleChange} name="email" />
                        </div>
                        <div className="px-4 mb-4">
                         {props.reset.loading ? (<Button> <CircularProgress /></Button>) : (<Button type="submit">Reset Password</Button>)}
                        </div>
                       </form>
                         <div className="flex px-4">
                          <p className="mb-8 text-sm text-white md:text-lg">if you remember?</p>
                          <Link to="/login" className="px-1 text-sm font-bold text-green-color md:text-lg" > login</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>

    )
}
resetPassword.protoTypes = {
    forgotPasswordAction: PropTypes.func.isRequired,
    reset: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    reset: state.reset
})
export default connect(mapStateToProps, {forgotPasswordAction})(resetPassword)