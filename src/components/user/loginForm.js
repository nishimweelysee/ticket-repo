import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../common/textInput';
import Button from '../common/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import validate from '../validations/validateLoginInfo'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { loginAction } from '../../redux/actions/user/loginAction';
import backimg from '../../../public/img/authimg.jpg';

const loginForm = (props) => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({})

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(values));

        if (Object.keys(errors).length === 0) {
            props.loginAction(values)
        }
    }



    return (
        <div className="relative py-5 px-10  lg:px-30 flex flex-col">
            <div className="px-2 mt-4 lg:px-40"> 
                <div className="w-full grid rounded-2xl bg-maincolor shadow-2xl  sm:grid-cols-2 grid-cols-1">
                    <div className="my-auto">
                        <div className="pt-2 mb-6 text-center ">
                            <h2 className="font-bold text-white ">
                                Login
                            </h2>
                        </div>

                        <div className="flex flex-col justify-center">
                            <form onSubmit={handleSubmit}>
                                <div className="px-4 mb-4">
                                    <TextInput type="Email" label="Email" placeholder="Type your email" icon={["fas", "envelope"]} name="email" value={values.email} onInput={handleChange} error={errors.email} />
                                </div>
                                <div className="px-4 mb-8">
                                    <TextInput type="password" label="Password" placeholder="Type your password" icon={["fas", "lock"]} name="password" value={values.lastName} onInput={handleChange} error={errors.password} />
                                </div>
                                <div className="px-4 mb-4">
                                    {props.login.loading ? (<Button><CircularProgress /></Button>) : (<Button type="submit" >Login</Button>)}
                                </div>
                            </form>
                            <div className="flex px-4 mb-4">
                                <p className="text-sm text-white md:text-lg">Forgot password?</p>
                                <Link to="/reset" className="inline px-1 text-sm font-bold text-green-color md:text-lg" > Reset</Link>
                            </div>
                            <div className="flex gap-3 px-4 mb-4">
                                <p className="text-white ">Login with</p>
                                <a href={`${process.env.BACKEND_URL}/users/login/google`} className="space-x-1 justify">
                                    <FontAwesomeIcon icon={["fab", "google"]} className="text-white " />
                                </a>
                            </div>
                            <div className="flex px-4 ">
                                <p className="mb-8 text-sm text-white md:text-lg">Don't have an account?</p>
                                <Link to="/register" className="px-1 text-sm font-bold text-green-color md:text-lg" > Register</Link>
                            </div>
                        </div>

                    </div>
                    <div className="sm:block hidden">
                        <img src={backimg} className="rounded-r-2xl object-cover h-full w-full" />
                    </div>
                </div>
            </div>
        </div>

    )
}
loginForm.protoTypes = {
    loginAction: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps, { loginAction })(loginForm);