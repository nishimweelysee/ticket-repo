import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Badge, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, OutlinedInput, Select } from '@material-ui/core';
import TextInput from '../common/textInput';
import { faEnvelope, faIdCard, faUser } from '@fortawesome/free-regular-svg-icons';
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { errorToast, successToast } from '../../helpers/toastMessages';
import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';
import { httpRequest } from '../../helpers/httpRequest';
import mtn from '../../../public/img/mtnmomo.png'
import airtel from '../../../public/img/airtelMoney.png'
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { RaveProvider, RavePaymentButton } from "react-ravepayment";
import { validateTicket } from '../validations/ticketValidation';
import cogoToast from 'cogo-toast';
import Heading3 from '@material-tailwind/react/Heading4';

var _ = require('lodash');

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "rgb(31, 41, 55)",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Container >
                    <Box>
                        {children}
                    </Box>
                </Container>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}
let i = 0;
export default function NavTabs(props) {
    const [errors, setErrors] = React.useState({})
    const [showModal, setShowModal] = React.useState(false);
    const [value, setValue] = React.useState(0);
    const [typeName, setTypeName] = React.useState("")
    const [loading, setLoading] = React.useState(false);
    const [ticket, setTicket] = React.useState({
        pay: {
            tx_ref: `MP_${uuidv4()}`,
            order_id: `OD_${uuidv4()}`,
            amount: 0,
            currency: "RWF",
            email: "",
            phone_number: "",
            fullname: "",
            paymenttype: ""
        },
        buyer: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: ""
        },
        attender: {

        }
    })
    const [tick, setTick] = React.useState({ price: "", type: "", fullName: "", phoneNumber: "", email: "", nationalId: "" })
    const [eventType, setEventType] = React.useState([]);
    const [eventSitt, setEventSitt] = React.useState({});
    const [eventPayment, setEventPayment] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    let [token,setToken]=useState(props.token)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    };
    
    const loginfunction = async () => {
        const resp = await httpRequest("POST", "/users/login", { email: process.env.EMAIL, password: process.env.password });
        token = resp.response.data.data.authToken;
        setToken(token);
    }
    
    useEffect(async() => {
        window.onload = () => {
            let savedTickets = JSON.parse(window.localStorage.getItem("ticket"));
            if (savedTickets) {
                i = Object.keys(savedTickets.attender).length + 1;
                setTicket({ ...ticket, ...savedTickets })
            }
        }
        let user = props.user;
        token=props.token;
        if (Object.keys(user).length<=0) {
            loginfunction();
        }
        ticket.buyer.email = user.email;
        ticket.buyer.phoneNumber = user.phoneNumber;
        ticket.buyer.firstName = user.firstName;
        ticket.buyer.lastName = user.lastName;
        ticket.pay.email = user.email;
        ticket.pay.phone_number = user.phoneNumber;
        ticket.pay.fullname = user.firstName + " " + user.lastName;
        setTicket({ ...ticket, ...ticket });
    }, [])

    useEffect(async () => {
        let types = [];
        props.event.EventPayments.map((row) => {
            types.push({ key: row.id, value: row.id, text: row.name })
        })
        setEventType(types);


        let methods = [];
        props.event.PaymentMethods.map((row) => {
            methods.push({
                id: row.flutterId, transaction_charge_type: "flat_subaccount",
                transaction_charge: (Number(ticket.pay.amount) * (Number(row.value) / 100)).toString()
            })
        })
        setEventPayment(methods);

    }, [typeName])

    const handleInput = (e) => {
        const prop = e.target;
        setTick({ ...tick, [prop.name]: e.target.value })
    }
    const handleBuyerInput = (e) => {
        let fullname = "";
        const prop = e.target;
        if (prop.name === "firstName") {
            fullname = fullname + prop.value
            ticket.pay.fullname = fullname;
            ticket.buyer.firstName = prop.value;
        }
        if (prop.name === "lastName") {
            fullname = fullname + " " + prop.value
            ticket.pay.fullname = fullname;
            ticket.buyer.lastName = prop.value;
        }
        if (prop.name === "email") {
            ticket.pay.email = prop.value;
            ticket.buyer.email = prop.value;
        }
        if (prop.name === "phoneNumber") {
            ticket.pay.phone_number = prop.value;
            ticket.buyer.phoneNumber = prop.value;
        }
        setTicket({ ...ticket, ...ticket })

    }

    const addToCat = () => {
        if (tick.type == "") {
            errorToast("Please Select Ticket Type")
        } else {
            const valid = validateTicket(tick);
            setErrors(valid);
            if (Object.keys(valid).length === 0) {
                let isExist = _.find(ticket.attender, at => {
                    if (at.nationalId == tick.nationalId) {
                        return true;
                    }
                })
                if (isExist) {
                    cogoToast.error("The NationalID/Passport was registered Before !!");
                    return;
                }
                ticket.attender[`attender${i}`] = tick;
                ticket.pay.amount = Number(ticket.pay.amount) + Number(tick.price);
                i++;
                console.log(ticket.attender)
                window.localStorage.setItem("ticket", JSON.stringify(ticket));
                successToast("Ticket Added");
                setTick({ ...tick, price: "", fullName: "", phoneNumber: "", email: "", nationalId: "" })
                setTypeName("");
                setErrors({})
            }
        }
    }
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange21 = (e) => {
        let j = e.target.value;
        let payt = _.find(props.event.EventPayments, ek => {
            if (ek.id == j) {
                return ek;
            }
        });
        setTick({ ...tick, "price": payt.price, "type": payt.id })
        setTypeName(payt.name);
        successToast(`${payt.name} is Selected`)
        updateEventSitt(payt.name);
    }

    const updateEventSitt = (name) => {
        let eveSitti = _.find(props.event.EventSittingPlaces, es => {
            if (es.name == name) {
                return es;
            }
        })
        setEventSitt(eveSitti)
        if (eveSitti.placesLeft <= 0) {
            setShowModal(false);
            cogoToast.info("No Ticket left in this Type");
        }
    }


    const getDataTable = (e) => {
        const row = e.target.parentNode.parentNode.querySelectorAll('td');
        const id = row[0].innerText;
        const name = row[2].innerText;
        const price = row[3].innerText;
        setTypeName(name);
        setTick({ ...tick, "price": price, "type": id })
        successToast(`${name} is Selected`)
        setShowModal(true)
        updateEventSitt(name);

    }
    const addNewTicket = (event) => {
        setTick({ ...tick, "price": event.price, "type": event.type })
        setShowModal(true)
    }

    let calculateNUmber = (type, attenders) => {
        return Object.values(attenders).filter(e => e.type == type).length;
    };
    let calculateCost = (num, price) => {
        return Number(num) * Number(price);
    }
    const removeTicket = (tt) => {
        let k = Object.keys(ticket.attender).find(key => ticket.attender[key] === tt);
        delete ticket.attender[k]
        ticket.pay.amount = Number(ticket.pay.amount) - (tt.price)
        setTicket({ ...ticket, ...ticket })
        window.localStorage.setItem("ticket", JSON.stringify(ticket));
    }

    const handleSubmit = async () => {
        console.log(token)
        setLoading(true)
        try {
            const resp = await httpRequest("POST", `events/tickets/newTicket/validate/${props.event.id}`, { ...ticket }, { "Authorization": token })
            if (!resp.error) {
                document.getElementById('ravebutton').click();
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
    }
    const config = {

        txref: ticket.pay.tx_ref,
        customer_email: ticket.pay.email,
        customer_phone: ticket.pay.phone_number,
        amount: ticket.pay.amount,
        PBFPubKey: process.env.FRUTTER_PUBLIC_KEY,
        currency: ticket.pay.currency,
        orderRef: ticket.pay.order_id,
        subaccounts: eventPayment,
        production: false,
        onSuccess: async (e) => {
            ticket.pay.paymenttype = e.data.transactionobject.paymentType;
            const resp = await httpRequest("POST", `events/tickets/newTicket/${props.event.id}`, { ...ticket }, { "Authorization": token })
            if (!resp.error) {
                cogoToast.success(resp.response.data.message);
                window.localStorage.removeItem("ticket");
                setTicket({
                    ...ticket, pay: {
                        tx_ref: `MP_${uuidv4()}`,
                        order_id: `OD_${uuidv4()}`,
                        amount: 0,
                        currency: "RWF",
                        email: "",
                        phone_number: "",
                        fullname: "",
                        paymenttype: ""
                    },
                    attender: {

                    }
                })
            }
        },
        onClose: () => {
            window.location.reload();
        }
    };

    return (
        <div style={{ flexGrow: 1, }} className="p-3 m-3  border-purple-600">
            <Modal size="base" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    <div className="text-sm flex flex-col">
                        <div className="flex flex-col">
                            <div>FIll Ticket Information IN  {typeName} or <Button className="bg-maincolor p-2 text-white rounded underline mx-1" onClick={handleClickOpen}>select new</Button></div>
                            <div><Badge color="primary">{eventSitt.placesLeft} Tickets Left</Badge></div>
                        </div>
                        <div>
                            <Dialog className="text-maincolor" disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>Fill the form</DialogTitle>
                                <DialogContent >
                                    <Box className="w-full" component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
                                        <FormControl className="w-full" sx={{ m: 1, minWidth: 500 }}>
                                            <InputLabel htmlFor="demo-dialog-native">Event Type</InputLabel>
                                            <Select

                                                className="w-full"
                                                native
                                                value={tick.type}
                                                onChange={handleChange21}
                                                input={<OutlinedInput label="Event Type" id="demo-dialog-native" />}
                                            >
                                                <option disabled>
                                                    none
                                                </option>
                                                {eventType.map((e) => (
                                                    <option
                                                        key={e.key}
                                                        value={e.value}
                                                    >
                                                        {e.text}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </DialogContent>
                                <DialogActions className="text-maincolor">
                                    <Button className="bg-buttonColor hover:bg-indigo-600 p-3 text-white rounded" onClick={handleClose}>Ok</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="bg-maincolor md:w-96 py-4">
                        <TextInput type="text" error={errors.fullName} icon={faUser} name="fullName" value={tick.fullName} label="Fullname" placeholder="Type your name" onInput={handleInput} />
                        <TextInput type="tel" error={errors.phoneNumber} icon={faPhoneSquareAlt} name="phoneNumber" value={tick.phoneNumber} label="PhoneNumber" placeholder="Type your phonenumber" onInput={handleInput} />
                        <TextInput type="email" error={errors.email} icon={faEnvelope} name="email" value={tick.email} label="Email" placeholder="Type your email" onInput={handleInput} />
                        <TextInput type="text" error={errors.nationalId} icon={faIdCard} name="nationalId" value={tick.nationalId} label="NationalId" placeholder="Type your id" onInput={handleInput} />
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

                    <Button
                        color="green"
                        onClick={addToCat}
                        ripple="light"
                        className="bg-buttonColor hover:bg-indigo-600 p-3 text-white hover:opacity-75 rounded"
                    >
                        Add To Cat
                    </Button>
                </ModalFooter>
            </Modal>

            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="Ticket selection and Payment Page"
                    className="bg-maincolor "
                    TabIndicatorProps={{
                        style: { background: "#F5D3C4" }
                    }}
                >
                    <LinkTab label="Tickets" {...a11yProps(0)} />
                    <LinkTab label={`My Cat (${Object.keys(ticket.attender).length})`}  {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <div className="py-5">
                    <h3 className="pb-3">Select Ticket Type</h3>
                    <TableContainer>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ display: "none" }} align="center">id</StyledTableCell>
                                    <StyledTableCell align="center">Selection</StyledTableCell>
                                    <StyledTableCell align="center">Type</StyledTableCell>
                                    <StyledTableCell align="center">Price</StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.event.EventPayments.map((row) => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell style={{ display: "none" }} align="center">{row.id}</StyledTableCell>
                                        <StyledTableCell align="center"><button onClick={e => { getDataTable(e) }} className="bg-buttonColor hover:bg-indigo-600 p-3 text-white rounded">Select</button></StyledTableCell>
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.price}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className="">
                    <h3 className="p-3 m-3">Review your Selected Tickets</h3>
                    <div className="cart-grid  gap-4">
                        <div className="mb-4">
                            <img className="object-cover" src={props.event.image[0]} />
                        </div>
                        <div>
                            <div>
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <p className="flex">Event :<em>{props.event.title}</em></p>
                                    </div>
                                    <div>
                                        <p>{Object.keys(ticket.attender).length}</p>
                                    </div>
                                    <div>
                                        <p className="flex"><em className="mr-2">{ticket.pay.amount}</em>Rwf</p>
                                    </div>
                                </div>
                                <Divider />
                                <div>
                                    {
                                        props.event.EventPayments.map((row) => (
                                            <div key={row.id}>
                                                {Object.values(ticket.attender).filter(t => t.type == row.id).length == 0 ? "" : <div>
                                                    <div className="flex justify-between my-5 bg-gray-200 py-2 px-1">
                                                        <div>
                                                            <h2 className="">{row.name}</h2>
                                                        </div>
                                                        <div>
                                                            <p><em>{calculateNUmber(row.id, ticket.attender)}</em> &times; <em>{row.price}</em> Rwf </p>
                                                        </div>
                                                        <div>
                                                            <p> <em>{calculateCost(calculateNUmber(row.id, ticket.attender), row.price)}</em> Rwf</p>
                                                        </div>
                                                    </div>

                                                </div>}
                                                {Object.values(ticket.attender).filter(t => t.type == row.id).length == 0 ? "" : <Fieldset toggleable collapsed legend={<p className="p-2 ">Show ticket Details</p>}>
                                                    {
                                                        Object.values(ticket.attender).filter(t => t.type == row.id).map((e, indec) => {
                                                            return <div className="flex gap-4 w-full" key={indec}>
                                                                <div className="bg-maincolor w-full my-4 rounded">
                                                                    <TextInput type="text" icon={faUser} readOnly name="fullName" value={e.fullName} label="Fullname" />
                                                                    <TextInput type="tel" icon={faPhoneSquareAlt} readOnly name="phoneNumber" value={e.phoneNumber} label="PhoneNumber" />
                                                                    <TextInput type="email" icon={faEnvelope} readOnly name="email" value={e.email} label="Email" />
                                                                    <TextInput type="text" icon={faIdCard} readOnly name="nationalId" value={e.nationalId} label="NationalId" />
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <div className="my-4 rounded">
                                                                        <button className="text-red-900 underline" onClick={evt => removeTicket(e)}>Remove</button>
                                                                    </div>
                                                                    <div className="my-4 rounded">
                                                                        <button className="text-maincolor underline" onClick={evt => addNewTicket(e)}>Add</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </Fieldset>}
                                            </div>
                                        ))
                                    }
                                </div>
                                <Divider />
                                <div>
                                    <div className="flex justify-between py-2 bg-gray-200 px-1">
                                        <div>
                                            <p>Total price</p>
                                        </div>
                                        <div>
                                            <p><em>{ticket.pay.amount}</em> Rwf</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                        </div>
                    </div>
                    <div>
                        <div className="grid md:grid-cols-2 bg-maincolor text-white p-4">
                            <div className="w-full">
                                <div className="bg-white-600 py-3">
                                    <p className="py-3">We Acceipt Payment by using :</p>
                                    <p>Mobile Money and Airtel Money</p>
                                    <div className="flex py-3 w-full gap-4 pl-1">
                                        <div>
                                            <img className="object-fill" width="60px" height="50px" style={{ height: "40px" }} src={mtn} />
                                        </div>
                                        <div>
                                            <img className="object-fill" width="60px" height="20px" style={{ height: "40px" }} src={airtel} />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white-600 py-3">
                                    <p>Visa Card and Credit Card </p>
                                    <div className="flex flex-wrap gap-2 py-3">
                                        <img src="https://img.icons8.com/color/96/000000/visa.png" />
                                        <img src="https://img.icons8.com/color/96/000000/mastercard.png" />
                                        <img src="https://img.icons8.com/color/96/000000/bank-card-back-side.png" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full py-2">
                                <div className="p-3 text-white"> <Heading3 color="white" className="underline bold">FIll Billing Details</Heading3> </div>
                                <TextInput type="text" icon={faUser} name="firstName" value={ticket.buyer.firstName || ''} label="Firstname" placeholder="Type your firstname" onInput={handleBuyerInput} />
                                <TextInput type="text" icon={faUser} name="lastName" value={ticket.buyer.lastName || ''} label="Lastname" placeholder="Type your lastname" onInput={handleBuyerInput} />
                                <TextInput type="tel" icon={faPhoneSquareAlt} name="phoneNumber" value={ticket.buyer.phoneNumber || ''} label="PhoneNumber" placeholder="Type your phonenumber" onInput={handleBuyerInput} />
                                <TextInput type="email" icon={faEnvelope} name="email" value={ticket.buyer.email || ''} label="Email" placeholder="Type your email" onInput={handleBuyerInput} />
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center p-3">
                            <div className="px-4 mb-4">
                                {loading ? (<div><CircularProgress size={24} /></div>) : (<Button
                                    disabled={loading}
                                    onClick={handleSubmit}
                                    className="bg-buttonColor rounded animated hover:fadein hover:bg-indigo-600 p-3 text-white hover:opacity-75"
                                >Pay Now</Button>)}
                            </div>
                            <div hidden>
                                <RaveProvider {...config}>
                                    <RavePaymentButton id="ravebutton" className="bg-buttonColor rounded animated hover:fadein hover:bg-indigo-600 p-3 text-white hover:opacity-75">Pay Now</RavePaymentButton>
                                </RaveProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
        </div>
    );
}
