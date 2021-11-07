import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
import { getUserAction } from '../../../redux/actions/dashboardActions/getUsersAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { Avatar, IconButton, MenuItem } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { httpRequest } from '../../../helpers/httpRequest';
import cogoToast from 'cogo-toast';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    margin: 'auto'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));



const userRoles = (props) => {
    const [users, setUsers] = useState(props.getUsers.data);
    const [anchorEls, setAnchorEls] = useState([]);
    const [anchorEls1, setAnchorEls1] = useState([]);
    const [value, setValue] = useState(0);
    const [globalFilter, setGlobalFilter] = useState("");
    const [showModal, setShowModal] = React.useState(false);


    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        status: "",
        category: "",
        campanyName: "",
        profilePicture: ""
    });

    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, data) => {
        anchorEls[data.id] = null;
        setAnchorEls({ anchorEls });
        setShowModal(true)
        setUserInfo({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            status: data.status,
            profilePicture: data.profilePicture,
            campanyName: data.campanyName,
            category: data.category

        });
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        props.getUserAction(props.login.token);
    }, []);
    useEffect(() => {
        setUsers(props.getUsers.data);
    }, [props.getUsers.data])

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const handleUpdateMenuItem = (id, evt) => {
        anchorEls[id] = null;
        setAnchorEls({ anchorEls });
        anchorEls1[id] = evt.target;
        setAnchorEls1({ ...anchorEls1, ...anchorEls1 });
    }
    const handleActionClick = (id, evt) => {
        anchorEls[id] = evt.target;
        setAnchorEls({ ...anchorEls, ...anchorEls });
    }
    const handleActionClose = (id, evt) => {
        anchorEls[id] = null;
        setAnchorEls({ anchorEls });
    }
    const handleUpdateMenuItemClose = (id, evt) => {
        anchorEls1[id] = null;
        setAnchorEls1({ anchorEls1 });
    }
    const handleUpdate = async (rowData) => {
        let roleId = parseInt(value)
        const resp = await httpRequest("PUT", `/users/changeRole/${rowData.id}`, { roleId }, {
            "Authorization": `${props.login.token}`
        });
        if (!resp.error) {
            cogoToast.success(resp.response.data.message);
            props.getUserAction(props.login.token);
        }
    }
    const statusBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">status</span>
                {
                    rowData.status === 'broked' ?
                        <Badge value={rowData.status} severity="danger" className="p-mr-2"></Badge>
                        :
                        <Badge value={rowData.status} severity="success" className="p-mr-2"></Badge>
                }
            </React.Fragment>
        )
    }

    const handleBrokeUser = async (rowData) => {
        const resp = await httpRequest("PUT", `/users/brokeUser/${rowData.id}`, {}, {
            "Authorization": `${props.login.token}`
        });
        if (!resp.error) {
            cogoToast.success(resp.response.data.message);
            props.getUserAction(props.login.token);
        }
    }

    const header = (
        <div className="flex justify-center ">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Type keyword" />
            </span>
        </div>
    );



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <IconButton
                    size="small"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={e => handleActionClick('a' + rowData.id, e)}
                >
                    <div className="flex justify-center">
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                        <FontAwesomeIcon size="sm" className="text-maincolor" icon={faDotCircle} />
                    </div>
                </IconButton>
                <Menu
                    id={'a' + rowData.id}
                    anchorEl={anchorEls['a' + rowData.id]}
                    keepMounted
                    open={Boolean(anchorEls['a' + rowData.id])}
                    onClose={e => handleActionClose('a' + rowData.id, e)}
                >
                    <div className="grid w-64 gap-3 p-3 grid-col justify-items-start">
                        <button className="font-bold hover:bg-gray-200" onClick={e => handleUpdateMenuItem('a' + rowData.id, e)}><em className="m-auto">update user role</em></button>
                        <button className="font-bold hover:bg-gray-200" onClick={e => handleBrokeUser(rowData)}><em className="m-auto">Block/Unbroke user</em></button>
                        <button className="font-bold hover:bg-gray-200" onClick={() => onClick('displayResponsive', rowData)}><em className="m-auto">User info</em></button>

                    </div>
                </Menu>
                <Menu
                    id={'a' + rowData.id}
                    anchorEl={anchorEls1['a' + rowData.id]}
                    keepMounted
                    open={Boolean(anchorEls1['a' + rowData.id])}
                    onClose={e => handleUpdateMenuItemClose('a' + rowData.id, e)}
                >

                    <div className="flex flex-col gap-2 p-6 text-blue-600">
                        <span className="font-bold">Update role</span>
                        <FormControl component="fieldset">
                            {/* <FormLabel component="legend">Gender</FormLabel> */}
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio color="primary" />} label="Admin" />
                                <FormControlLabel value="3" control={<Radio color="primary" />} label="Manager" />
                                <FormControlLabel value="4" control={<Radio color="primary" />} label="Guest" />
                            </RadioGroup>
                        </FormControl>
                        <button className="p-2 text-white border rounded-3xl bg-maincolor" onClick={e => handleUpdate(rowData)}>Update</button>
                    </div>
                </Menu>


            </React.Fragment>
        );
    }
    const classes = useStyles();

    return (
        <div>
            <div className="text-lg font-bold text-center lg:text-2xl">
                <h1>Users Roles and Permission</h1>
            </div>
            <div style={{ border: '2px solid rgb(119, 119, 243)' }} className="p-3 m-2 rounded-3xl md:m-5 datatable-responsive-demo">
                <DataTable value={users} className="p-datatable-responsive-demo p-datatable-sm" paginator header={header}
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} globalFilter={globalFilter}>
                    <Column field="firstName" header="First Name" body="" />
                    <Column field="lastName" header="Last Name" body="" />
                    <Column style={{ width: "230px" }} field="email" header="Email" />
                    <Column style={{ width: "50px" }} field="RoleId" header="Role" />
                    <Column field="status" header="Status" body={statusBodyTemplate} />
                    <Column field="action" header="Actions" body={actionBodyTemplate} />
                </DataTable>
                <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                    <ModalHeader toggler={() => setShowModal(false)}>
                        USER INFO
                    </ModalHeader>
                    <ModalBody>
                        <div className="bg-maincolor md:w-full">
                            <div className="flex flex-col justify-center">
                                <div className={classes.root}>
                                    <Avatar className={classes.large} src={userInfo.profilePicture}/>
                                </div>
                                <div className="text-white p-4">
                                    <div className="flex gap-2 md:gap-4">
                                        <p className="font-bold">Names</p>
                                        <p>:</p>
                                        <p>{userInfo.firstName} {userInfo.lastName}</p>
                                    </div>
                                    <div className="flex gap-2 md:gap-4">
                                        <p className="font-bold ">Email</p>
                                        <p>:</p>
                                        <p>{userInfo.email}</p>
                                    </div>
                                    <div className="flex gap-2 md:gap-4">
                                        <p className="font-bold ">Phone Number</p>
                                        <p>:</p>
                                        <p>{userInfo.phoneNumber}</p>
                                    </div>
                                    <div className="flex gap-2 md:gap-4">
                                        <p className="font-bold ">Status</p>
                                        <p>:</p>
                                        <p>{userInfo.status}</p>
                                    </div>
                                    <div className="flex gap-2 md:gap-4">
                                        <p className="font-bold ">Category</p>
                                        <p>:</p>
                                        <p>{userInfo.category}</p>
                                    </div>
                                    <div className="flex gap-2 md:gap-4">
                                        <p className="font-bold ">CompanyName</p>
                                        <p>:</p>
                                        <p>{userInfo.campanyName}</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="red"
                            buttonType="link"
                            onClick={(e) => setShowModal(false)}
                            ripple="dark"
                        >
                            Close
                        </Button>

                    </ModalFooter>
                </Modal>

            </div>
        </div>

    )
}
userRoles.protoTypes = {
    getUserAction: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    getUsers: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        getUsers: state.getUsers
    };
}

export default connect(mapStateToProps, { getUserAction })(userRoles);
