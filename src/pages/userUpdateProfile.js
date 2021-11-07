import React, { useState } from 'react';
import PageAuthWrapper from '../components/Layout/AuthorizedLayout';
import profileImg from '../../public/img/profileImg.png';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextInput from '../components/common/textInput';
import TextSelect from '../components/common/textSelect';
import { connect } from 'react-redux';
import { FileUpload } from 'primereact/fileupload';
import { httpRequest } from '../helpers/httpRequest';
import cogoToast from 'cogo-toast';
import { Button } from 'primereact/button';

function userUpdateProfile(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        large: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
    }));
    const classes = useStyles();

    const handleOnInput = (e) => {
        const prop = e.target;
        setData({ ...data, [prop.name]: e.target.value });
    }
    const [data, setData] = useState({ ...props.login.data })

    const uploadProfile = async (e) => {
        const res = await JSON.parse(e.xhr.response)
        data.profilePicture = res.data.url;
        setData({ ...data, ...data })
    }
    const updateProfile = async () => {
        const { error, response } = await httpRequest("PUT", '/users/updateProfile', { ...data }, { "Authorization": props.login.token });
        if (!error) {
            cogoToast.success("Profile updated");
        }
    }
    return (
        <PageAuthWrapper >
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }} className="p-4 flex flex-col justify-center gap-4">
                <div>
                    <p className="text-center text-base">Update Profile Information</p>
                </div>
                <div className="bg-maincolor w-full flex flex-col gap-16 justify-center p-8">
                    <div style={{ margin: "auto" }} className={classes.root}>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={<label><FileUpload style={{ display: "none" }} name="demo" onUpload={uploadProfile} url={`${process.env.BACKEND_URL}/users/upload`} mode="basic" auto accept="image/*" /><FontAwesomeIcon className="bg-gray-200 text-maincolor p-1 rounded-3xl" size="2x" icon={faPencilAlt} /></label>}
                        >
                            <Avatar className={classes.large} alt="profile image" src={data.profilePicture ? data.profilePicture : profileImg} />
                        </Badge>
                    </div>
                    <div>
                        <div>
                            <div className="md:flex ">
                                <div className="w-full md:w-1/2">
                                    <TextInput value={data.firstName} type="text" placeholder="First name" label="FirstName" name="firstName" onInput={handleOnInput} />
                                    <TextInput value={data.lastName} type="text" label="LastName" name="lastName" placeholder="Last name" onInput={handleOnInput} />
                                    <TextInput value={data.phoneNumber} type="tel" placeholder="phone number" label="Phone number" name="phoneNumber" onInput={handleOnInput} />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <TextInput value={data.email} type="email" placeholder="Email" label="Email" name="email" onInput={handleOnInput} />
                                    <TextSelect value={data.category} type="text" placeholder="category" label="Category" options={['Individual', 'Company']} onInput={handleOnInput} name="category" />
                                    <TextInput value={data.campanyName} type="text" label="Company name" name="campanyName" placeholder="Company name" onInput={handleOnInput} />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-40 m-auto">
                        <Button onClick={updateProfile} type="button">Update Profile</Button>
                    </div>

                </div>
            </div>
        </PageAuthWrapper>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    };
}

export default connect(mapStateToProps)(userUpdateProfile);