import React, { useState } from 'react';
import PageWrapper from '../components/Layout/UnAuthorizedLayout';
import { GMapDemo } from '../components/contact/gooogleMap'
import TextInput from '../components/common/textInput';
import TextArea from '../components/common/textArea';
import TextSelect from '../components/common/textSelect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { httpRequest } from '../helpers/httpRequest';
import { errorToast, successToast } from '../helpers/toastMessages';
import { validateContact } from '../components/validations/validateContactMessage';


function contactus(props) {
    const [message,setMessage]= useState({
        email:"",
        fullName:"",
        subject:"",
        message:""
    })
    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        const prop = e.target;
        setMessage({ ...message, [prop.name]: e.target.value })
    }

    const sendMessage = async()=>{
        const valid = validateContact(message);
        setErrors(valid);
        if (Object.keys(valid).length === 0) {
            const resp = await httpRequest("POST","/contacts/save",{...message});
            if(resp.error){
                errorToast("Message Not Sent Try again");
            }
            else{
                successToast("Message Sent");
                setMessage({...message,email:"",fullName:"",subject:"",message:""});
                setErrors({})
            }
        }
    }
    return (
        <PageWrapper >
            <div className="p-4 m-4 ">
                <div className="p-4">
                    <GMapDemo />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 p-4">
                    <div>
                        <div className="flex gap-4 my-10">
                            <FontAwesomeIcon className="md:text-7xl text-maincolor" icon={faEnvelope} size="2x"/>
                            <div className="flex flex-col gap-4">
                                <h4>Physical Address</h4>
                                <small className="text-sm">Phone: +250781182427</small>
                                <small className="text-sm">Fax:  +250781182427</small>
                                <a className="text-sm" href="mailto:intercoregoup@gmail.com">Intercoregroup@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex gap-4 my-10">
                            <FontAwesomeIcon className="md:text-7xl text-maincolor" icon={faMapMarkedAlt} size="2x"/>
                            <div className="flex flex-col gap-4">
                                <h4>Visit Our Office</h4>
                                <small className="text-sm">PO Box 250123 kk st 66</small>
                                <small className="text-sm">Rwandex 12354 Rwanda </small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-maincolor w-full my-4 rounded">

                            <p className="text-center text-white">Send Message </p>
                            <TextInput error={errors.fullName} type={'text'} name="fullName" value={message.fullName} onInput={handleInput} placeholder="Type your name" label="Fullname" />
                            <TextInput error={errors.email} type="email" name="email" value={message.email} onInput={handleInput} placeholder="E-mail" label="Email" />
                            <TextSelect error={errors.subject} name='subject' label={'Subject'} value={message.subject} onInput={handleInput}  options={['Feedback', 'Report a bug', 'Feature request']} />

                            <div className="form-group">
                                <TextArea error={errors.message}  placeholder="Type your message" value={message.message} label="Message" name="message" onInput={handleInput} />
                            </div>
                            <div className="flex gap-4 justify-center p-3">
                                <button onClick={sendMessage} className="bg-buttonColor hover:bg-indigo-600 p-3 text-white hover:opacity-75" type="submit">Send</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default contactus;