import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextInput from '../common/textInput';
import Button from '../common/button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from './formHandler/useForm';
import { validateInfo } from '../validations/validateInfo'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { registerAction } from '../../redux/actions/user/registerAction';
import backimg from '../../../public/img/authimg.jpg';

const RegisterForm = (props) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        validateInfo, props.registerAction, props.register
    );




    if (props.register.success) {
        return (
            <div className="relative flex flex-col ">
                <div className="px-2 mt-10 mb-12 md:px-40">
                    <div className=" md:w-96">

                        <div className="w-full h-64 max-w-xs overflow-hidden transition-shadow duration-300 ease-in-out bg-white rounded-lg shadow-md hover:shadow-xl bg-maincolor"
                        >
                            <p className="p-10 text-center text-white  top-1/2">{props.register.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="relative py-5 px-10  lg:px-40 md:px-20 flex flex-col">
                <div className="px-2 mt-4 lg:px-40">
                    <div className=" w-full grid rounded-2xl bg-maincolor   sm:grid-cols-2 grid-cols-1">
                        <div className="my-auto">

                            <div className="pt-2 text-center">
                                <h2 className="text-lg font-bold text-white ">
                                    Register
                                </h2>
                            </div>

                            <div >
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="px-4 ">
                                        <TextInput type="text" label="First name"
                                            placeholder="Type your First name" icon={["fas", "user-tie"]}
                                            name="firstName" value={values.firstName} onInput={handleChange} error={errors.firstName} />
                                    </div>
                                    <div className="px-4">
                                        <TextInput type="text" label="Last name" placeholder="Type your Last name" icon={["fas", "user-tie"]} name="lastName" value={values.lastName} onInput={handleChange} error={errors.lastName} />
                                    </div>
                                    <div className="px-4">
                                        <TextInput type="tel" label="Phone number" placeholder="Type your phoneNumber" icon={["fas", "phone-square-alt"]} value={values.phoneNumber} name="phoneNumber" onInput={handleChange} error={errors.phoneNumber} />
                                    </div>
                                    <div className="px-4 ">
                                        <TextInput type="Email" label="Email" placeholder="Type your Email" icon={["fas", "envelope"]} name="email" value={values.email} onInput={handleChange} error={errors.email} />
                                    </div>
                                    <div className="px-4 ">
                                        <TextInput type="password" label="Password" placeholder="Type your password" icon={["fas", "lock"]} name="password" value={values.password} onInput={handleChange} error={errors.password} />
                                    </div>
                                    <div className="px-4 ">
                                        <TextInput type="password" label="Confirm password" placeholder="Type your password" icon={["fas", "lock"]} name="confirmPassword" value={values.confirmPassword} onInput={handleChange} error={errors.confirmPassword} />
                                    </div>
                                    <div className="justify-center px-4 mb-4">
                                        {props.register.loading ? (<Button>
                                            <CircularProgress /> </Button>) : (<Button type="submit" >Register</Button>)}
                                    </div>
                                </form>
                                <div className="flex px-8 mb-4">
                                    <p className="text-sm text-white">Forgot password?</p>
                                    <Link to="/reset" className="inline px-1 text-sm font-bold text-green-color" > Reset</Link>
                                </div>
                                <div className="flex gap-3 px-8 mb-4">
                                    <p className="text-sm text-white">Register with</p>
                                    <a href={`${process.env.BACKEND_URL}/users/login/google`} className="space-x-1 justify">
                                        <FontAwesomeIcon icon={["fab", "google"]} className="text-white " />
                                    </a>
                                </div>
                                <div className="flex px-8 mb-8">
                                    <p className="mb-8 text-sm text-white">have an account?</p>
                                    <Link to="/login" className="px-1 text-sm font-bold text-green-color" > Login</Link>
                                </div>

                            </div>

                        </div>
                        <div className="sm:block hidden">
                            <img src={backimg} className="rounded-r-2xl h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
RegisterForm.protoTypes = {
    registerAction: PropTypes.func.isRequired,
    register: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    register: state.register
})

export default connect(mapStateToProps, { registerAction })(RegisterForm);