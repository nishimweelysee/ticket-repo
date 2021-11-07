
import React, { useEffect, useRef, useState } from 'react';
import TextInput from "../../common/textInput";
import TextSelect from "../../common/textSelect";
import TextArea from "../../common/textArea";
import { FileUpload } from 'primereact/fileupload';
import Button from '../../common/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import cogoToast from 'cogo-toast';
import _ from 'lodash';
import { httpRequest } from '../../../helpers/httpRequest'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import moment from 'moment';
import { InputSwitch } from 'primereact/inputswitch';
import { Editor } from 'primereact/editor';
import { validateEvent, validateGrade, validateReceiver } from '../../validations/eventValidation';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { Dropdown } from 'primereact/dropdown';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';


let i = 0;
let j = 0;
const createEvent = (props) => {
    const location = useLocation();
    const [event, setEvent] = useState({
        title: "",
        host: "",
        dateAndTimme: null,
        place: "",
        description: "",
        numberofTicket: 0,
        eventType: "",
        country: "",
        image: [],
        startDate: "",
        endDate: "",
        share: false,
        status: "",
        duration: "",
        placeImage: ""
    });
    const [paymentMethod, setPaymentMethod] = useState({});
    const [sittingPlace, setSittingPlace] = useState({});
    const [paymentGradeCost, setPaymentGradeCost] = useState({});
    let [selected, setSelected] = useState({ index: "", key: "" })


    // Errors

    const [evterror, setEvterror] = useState({});
    const [paymerror, setPaymerror] = useState({});
    const [siterror, setSiterror] = useState({});
    const [gradeerror, setGradeerror] = useState({});
    const [showModalGrade, setShowModalGrade] = React.useState(false);
    const [showModalSit, setShowModalSit] = React.useState(false);
    const [showModalRec, setShowModalRec] = React.useState(false);


    const updateSate = async () => {
        const { error, response } = await httpRequest("GET", `/events/find/${location.state.event.id}`);
        const { title, host, dateAndTimme, place, description, numberofTicket, eventType, country, image, startDate, endDate, share, status, duration } = response.data.event;
        setEvent({ ...event, title, host, dateAndTimme: moment(dateAndTimme).format("YYYY-MM-DDTHH:mm"), place, description, numberofTicket, eventType, country, image, startDate: moment(startDate).format("YYYY-MM-DD"), endDate: moment(endDate).format("YYYY-MM-DD"), share, status, duration })
        const { EventPayments, EventSittingPlaces, PaymentMethods } = response.data.event;
        setPaymentGradeCost({ ...EventPayments });
        setSittingPlace({ ...EventSittingPlaces });
        setPaymentMethod({ ...PaymentMethods });
    }
    useEffect(() => {
        updateSate();
    }, [])

    const getTotal = () => {
        let total = 0;
        Object.values(sittingPlace).map((s) => {
            total = s.totalPlaces + total;
        })
        return total;

    }

    const handleUpdateOneGradde = async () => {
        sitting['name'] = grade.name;
        setSitting({ ...sitting, name: grade.name })
        const resp = await httpRequest('PUT', `/events/eventPayment/${grade.id}`, grade, { "Authorization": props.login.token });
        if (!resp.error) {
            const res = await httpRequest('PUT', `/events/eventSittingPlaces/${sitting.id}`, sitting, { "Authorization": props.login.token });
            if (!res.error) {
                cogoToast.success(resp.response.data.message)
                cogoToast.success(res.response.data.message)
            }
        }
        updateSate();
    }

    const editGrade = async (key) => {
        const gradeC = paymentGradeCost[key];
        setGrade({ ...grade, ...gradeC })
        let seat = Object.values(sittingPlace).find(s => s.name = gradeC.name)
        setSitting({ ...sitting, ...seat })
        setShowModalGrade(true);
    }
    const removeGrade = async (key) => {
        let placeId = null;
        Object.values(sittingPlace).map((val, index) => {
            if (val.name == paymentGradeCost[key].name) {
                placeId = val.id;
            }
        })
        const id = paymentGradeCost[key].id;
        if (id) {
            const resp2 = await httpRequest("DELETE", `/events/eventPayment/${id}`, null, { "Authorization": props.login.token });
            if (!resp2.error) {
                delete paymentGradeCost[key];
                setPaymentGradeCost({ ...paymentGradeCost, ...paymentGradeCost })
                cogoToast.success(`Grade Deleted Success`);
            }
            const resp1 = await httpRequest("DELETE", `/events/eventSittingPlaces/${placeId}`, null, { "Authorization": props.login.token });
            if (!resp1.error) {
                cogoToast.success(`Also it's Range Deleted`);
            }
            updateSate()
        } else {
            delete paymentGradeCost[key];
            setPaymentGradeCost({ ...paymentGradeCost, ...paymentGradeCost })
            cogoToast.success(`Grade Deleted Success`);
        }
    }
    const hangleUpdateOneSit = async () => {
        sittingPlace[selected.index].placeAvailable.splice(selected.key, 1, range);
        _.map(sittingPlace, async (place, index) => {
            let id = place.id;
            let totalNumbers = 0;
            if (id) {
                await httpRequest("PUT", `/events/eventSittingPlaces/${id}`, { ...place }, { "Authorization": props.login.token });
            } else {
                let eventId = place.eventId;
                place.placesLeft = place.totalPlaces;
                await httpRequest("POST", `/events/eventSittingPlaces/${eventId}`, { ...place }, { "Authorization": props.login.token });
            }
            totalNumbers = totalNumbers + place.placesLeft;
            event.ticketLeft = totalNumbers;
            await httpRequest("PUT", `/events/edit/${location.state.event.id}`, { ...event }, { "Authorization": props.login.token });
            updateSate()
        })
        updateSate()
        cogoToast.success(`Updating Process Complete`);
    }

    const removeRange = (index1, key) => {
        sittingPlace[index1].totalPlaces = Number(sittingPlace[index1].totalPlaces) - (Number(sittingPlace[index1].placeAvailable[key][1].value) - Number(sittingPlace[index1].placeAvailable[key][0].value))
        sittingPlace[index1].placeAvailable.splice(key, 1);
        setSitting({ ...sittingPlace, ...sittingPlace });
    }

    const editRange = (index1, key) => {
        selected.index = index1;
        selected.key = key;
        setSelected({ ...selected, ...selected })
        let array = sittingPlace[index1].placeAvailable;
        setSitting({ ...sitting, ...sittingPlace[index1] });
        range = array[key];
        setRange(range);
        setShowModalSit(true);
    }
    const removeReceiver = async (index) => {
        const id = paymentMethod[index].id;
        if (id) {
            const resp1 = await httpRequest("DELETE", `/events/eventPaymentMethod/${id}`, null, { "Authorization": props.login.token });
            if (!resp1.error) {
                delete paymentMethod[index];
                setPaymentMethod({ ...paymentMethod, ...paymentMethod });
                cogoToast.success(`The Receiver deleted`);
            }
            updateSate();
        } else {
            delete paymentMethod[index];
            setPaymentMethod({ ...paymentMethod, ...paymentMethod });
            cogoToast.success(`The Receiver deleted`);
        }
    }
    const editReceiver = async (index) => {
        let payMethod = paymentMethod[index];
        let acc = banks.find(b => b.name === payMethod.accName);
        setSelectedBank(acc);
        setReceiver({ ...receiver, ...payMethod })
        setShowModalRec(true)
    }

    const handleUpdateOneReceiver = async () => {
        receiver.accName = selectedBank['name']
        const res1 = await httpRequest("PUT", `/events/eventPaymentMethod/${receiver.id}`, { ...receiver }, { "Authorization": props.login.token });
        if (!res1.error) {
            cogoToast.success(`${receiver.name}  Updated Success`);
        }
        updateSate()
    }

    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);


    //function to handle inputs
    const handleOnInput = e => {
        // e.preventDefault();
        const name = e.target.name;
        const vals = e.target.value;
        switch (name) {
            case 'title':
                event.title = vals;
                break
            case 'host':
                event.host = vals;
                break
            case 'dateAndTimme':
                event.dateAndTimme = vals;
                break
            case 'startDate':
                event.startDate = vals;
                break
            case 'endDate':
                event.endDate = vals;
                break
            case 'place':
                event.place = vals;
                break
            case 'description':
                event.description = htmlValue;
                break
            case 'eventType':
                event.eventType = vals;
                break
            case 'country':
                event.country = vals;
                break
            case 'numberofTicket':
                event.numberofTicket = vals;
                break
            case 'share':
                event.share = vals;
                break
            case 'status':
                event.status = vals;
                break
            case 'duration':
                event.duration = vals;
                break

        }
        setEvent({ ...event, ...event })

    }

    const handleRangeInput1 = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const vals = e.target.value;
        switch (name) {
            case 'from':
                range[0].value = Number(vals);
                break;
            case 'to':
                range[1].value = Number(vals);
                break
        }
        let diff = range[1].value - range[0].value;
        if (diff <= 0 && range[1].value) {
            cogoToast.info('Start Range can not be greater than End range');
            return;
        }

        setSitting({ ...sitting, ...sitting })
        setRange([...range])

    }
    const handleRangeInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const vals = e.target.value;
        switch (name) {
            case 'from':
                range[0].value = Number(vals);
                break;
            case 'to':
                range[1].value = Number(vals);
                break
        }
        let diff = range[1].value - range[0].value;
        if (diff <= 0 && range[1].value) {
            cogoToast.info('Start Range can not be greater than End range');
            return;
        }



        setSitting({ ...sitting, ...sitting })
        setRange([...range])

        let totalPlace = 0;
        sitting.placeAvailable.map(s => {
            totalPlace = totalPlace + (s[1].value - s[0].value)
        })
        sitting.totalPlaces = totalPlace;
        sittingPlace[selected.index] = sitting;
        setSittingPlace({ ...sittingPlace, ...sittingPlace })
    }

    // function to handle submission
    const handleUpdateEvent = async () => {
        event.numberofTicket = getTotal();
        setEvent({ ...event, ...event })
        const eventValid = validateEvent(event);
        setEvterror(eventValid);
        console.log(event)
        if (Object.keys(eventValid).length === 0) {
            const { error, response } = await httpRequest("PUT", `/events/edit/${location.state.event.id}`, { ...event }, { "Authorization": props.login.token });
            if (!error) {
                cogoToast.success("Event Updated");
                updateSate();
            }
        }
    }
    const handleUpdateEventSitting = async () => {
        try {

            _.map(paymentGradeCost, async (pay, index) => {
                let id = pay.id;
                if (id) {
                    await httpRequest("PUT", `/events/eventPayment/${id}`, { ...pay }, { "Authorization": props.login.token });

                } else {
                    let eventId = pay.eventId;
                    await httpRequest("POST", `/events/eventPayment/${eventId}`, { ...pay }, { "Authorization": props.login.token });

                }
                updateSate()
            })
            let totalNumbers = 0;
            _.map(sittingPlace, async (place, index) => {
                let id = place.id;
                if (id) {
                    await httpRequest("PUT", `/events/eventSittingPlaces/${id}`, { ...place }, { "Authorization": props.login.token });
                } else {
                    let eventId = place.eventId;
                    place.placesLeft = place.totalPlaces;
                    await httpRequest("POST", `/events/eventSittingPlaces/${eventId}`, { ...place }, { "Authorization": props.login.token });
                }
                totalNumbers = totalNumbers + place.placesLeft;
                event.ticketLeft = totalNumbers;
                await httpRequest("PUT", `/events/edit/${location.state.event.id}`, { ...event }, { "Authorization": props.login.token });
                updateSate()
            })


            cogoToast.success(`Updating Process Complete`);
            updateSate();
        } catch (error) {
            cogoToast.error(error.message);
        }
        updateSate();
    }

    const [locations, setLocation] = useState([])
    const [value, setValue] = React.useState(null);
    const [grade, setGrade] = useState({ eventId: location.state.event.id, id: "", name: "", price: 0 });
    const [sitting, setSitting] = useState({
    });
    let [range, setRange] = useState([{ value: '', inclusive: true }, { value: '', inclusive: false }]);
    const [receiver, setReceiver] = useState({ eventId: location.state.event.id, id: "", name: "", value: "", accNumber: "", accName: {}, phoneNumber: "", email: "", flutterId: "" });
    const [banks, setBanks] = useState([]);
    const [selectedBank, setSelectedBank] = useState({})
    const getBankAccounts = async () => {
        const { response, error } = await httpRequest('GET', '/flutterwave/banks');
        if (!error) {
            setBanks(response.data.data.data);
        }
    }
    const getLocation = async () => {
        const { response, error } = await httpRequest("GET", "/image/getAll/location", null, { "Authorization": props.login.token });
        if (!error) {
            let val = response.data.data.find(l => l.title === location.state.event.place);
            if (val) {
                setValue({ ...val })
            } else {
                setValue({
                    id: response.data.data.length + 1,
                    title: location.state.event.place,
                    image: "",
                    type: "location",
                    updatedAt: Date()
                })
            }
            setLocation(response.data.data);
        }
    }
    useEffect(() => {
        getLocation();
        getBankAccounts();
    }, [])
    const handleSitGradeCost = () => {
        const isValid = validateGrade(grade)
        setGradeerror(isValid);
        if (Object.keys(isValid).length === 0) {
            paymentGradeCost[`pay${i}`] = grade;
            i++;
            setPaymentGradeCost({ ...paymentGradeCost, ...paymentGradeCost })
            setGrade({ ...grade, name: "", price: 0 })
        }
    }
    const handleReciver = (e) => {
        const prop = e.target;
        setReceiver({ ...receiver, [prop.name]: e.target.value });
    }

    const handleAddReceiver = async () => {

        const isValid = validateReceiver(receiver);
        setPaymerror(isValid)
        if (Object.keys(isValid).length === 0) {



            const payload = {
                "account_bank": receiver.accName.code,
                "account_number": receiver.accNumber,
                "business_name": receiver.name,
                "business_email": receiver.email,
                "business_contact": receiver.email,
                "business_contact_mobile": receiver.phoneNumber,
                "business_mobile": receiver.phoneNumber,
                "country": "RW",
                "meta": [
                    {
                        "meta_name": "mem_adr",
                        "meta_value": "0x16241F327213"
                    }
                ],
                "split_type": "percentage",
                "split_value": Number(receiver.value) / 100
            }

            const { response, error } = await httpRequest('POST', '/flutterwave', { ...payload });
            if (!error) {
                paymentMethod[`receiver${j}`] = { name: receiver.name, value: receiver.value, accNumber: receiver.accNumber, flutterId: response.data.data.subaccount_id, accName: receiver.accName['name'], phoneNumber: receiver.phoneNumber, email: receiver.email };
                j++;
                setPaymentMethod({ ...paymentMethod, ...paymentMethod })
                setReceiver({ name: "", value: 0, accNumber: "", accName: {}, phoneNumber: "", email: "", flutterId: "" })
            }
        }
    }

    const handleUpdateReceiver = () => {
        _.map(paymentMethod, async (pay, index) => {
            let id = pay.id;
            if (id) {
                const res1 = await httpRequest("PUT", `/events/eventPaymentMethod/${id}`, { ...pay }, { "Authorization": props.login.token });
                if (!res1.error) {
                    cogoToast.success(`${pay.name}  Updated Success`);
                }
            } else {
                let eventId = pay.eventId;
                const resp2 = await httpRequest("POST", `/events/eventPaymentMethod/${eventId}`, { ...pay }, { "Authorization": props.login.token });
                if (!resp2.error) {
                    cogoToast.success(`${pay.name}  Created Success`);
                }
            }
        })
        updateSate();
    }

    const findRange = (key) => {
        let choice = false;
        _.map(sittingPlace[key].placeAvailable, pl => {
            if ((Number(range[0].value) >= Number(pl[0].value)) && (Number(range[0].value) <= Number(pl[1].value)) || (Number(range[1].value) >= Number(pl[0].value)) && (Number(range[1].value) <= Number(pl[1].value))) {
                cogoToast.error("One of the Range Selected Before")
                choice = true;
            }
        })
        return choice;
    }

    const handleSittingPlace = (name) => {
        let key = null;
        Object.values(sittingPlace).map((val, index) => {
            if (val.name == name) {
                key = index;
            }
        })
        if (key == null) {
            key = Object.keys(sittingPlace).length;
            sittingPlace[key] = { eventId: location.state.event.id, name: name, totalPlaces: 0, placeAvailable: [] };
            setSittingPlace({ ...sittingPlace, sittingPlace });
        }

        let error = false;
        if ((range[0].value == undefined)) {
            cogoToast.error("Please Insert Range 1 (Clean and Re-Type)");
            return
        }
        if ((range[1].value == undefined)) {
            cogoToast.error("Please Insert Range 2 (Clean and Re-Type)");
            return
        }
        if (range[0].value == '') {
            cogoToast.error("Please Insert all Range");
            return
        }
        if (range[1].value == '') {
            cogoToast.error("Please Insert all Range");
            return
        }
        if (Number(range[0].value) > Number(range[1].value)) {
            cogoToast.error("Range 1 can't be greater than Range 2")
            return
        }
        if (!error) {
            let isIn = findRange(key)
            if (!isIn) {

                sittingPlace[key].placeAvailable.push(range);
                let total = Number(sittingPlace[key].totalPlaces) + (Number(range[1].value) - Number(range[0].value))
                sittingPlace[key].totalPlaces = total;
                setSittingPlace({ ...sittingPlace });
                setRange([{ value: '', inclusive: true }, { value: '', inclusive: false }])
            }
        }
    }



    const onTemplateUpload = async (e) => {
        const data = await JSON.parse(e.xhr.response)
        event.image = data.data.urls;
        setEvent({ ...event, ...event })

        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += (file.size || 0);
        });

        setTotalSize(_totalSize);

    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{ width: '40%' }}>
                    <img className="object-cover" alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="p-my-5">Drag and Drop Image Here</span>
            </div>
        )
    }


    const onEventChange = (e) => {
        setSelectedBank({ ...e.value })
        setReceiver({ ...receiver, accName: e.value })
    }

    const eventOptionTemplate = (option) => {
        return (
            <div className="event-item">
                <div>{option.name}</div>
            </div>
        );
    }

    const selectedEventTemplate = (option, d) => {
        if (option) {
            return (
                <div className="event-item event-item-value text-white">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {d.placeholder}
            </span>
        );
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


    const defaultProps = {
        options: locations,
        getOptionLabel: (option) => option.title,
    };


    const handleTitle = (evt, newValue) => {
        try {
            let type = evt.type;
            if (type !== "input") {
                event.place = newValue.title;
                event.placeImage = newValue.image;
                setValue(newValue);
                console.log(value)
                setEvent({ ...event, ...event })
                console.log(event)

            } else {
                let p = {
                    id: locations.length + 1,
                    title: evt.target.value,
                    image: "",
                    type: "location",
                    updatedAt: Date()
                }
                event.place = p.title;
                event.placeImage = p.image;
                setValue(p);
                setEvent({ ...event, ...event })
            }
        } catch (error) {

        }

    }
    return (
        <div >
            <div className="pt-10 md:px-12 ">
                <div>


                    <Accordion multiple activeIndex={[0]}>
                        <AccordionTab header="Event Information">
                            <form>
                                <div className="p-3 mt-10 mb-10 md:p-6 md:px-10  bg-maincolor">
                                    <div className="md:flex ">
                                        <div className="w-full md:w-1/2">
                                            <TextInput error={evterror.title} type="text" placeholder="Type event title" value={event.title || ''} label="Event title" name="title" onInput={handleOnInput} />
                                            <TextInput error={evterror.dateAndTimme} type="datetime-local" label="Date" value={event.dateAndTimme || ''} name="dateAndTimme" placeholder="Any date" onInput={handleOnInput} />
                                            <TextInput error={evterror.startDate} type="date" label="buy ticket start date" value={event.startDate || ''} name="startDate" placeholder="Any date" onInput={handleOnInput} />
                                            <TextSelect error={evterror.country} label="Country" value={event.country || ''} options={['Rwanda', 'Kenya', 'Tanzania', 'Uganda', 'Burundi', 'Congo']} name="country" onInput={handleOnInput} />
                                            <TextSelect label="Status" value={event.status || ''} options={['Pending', 'Done', 'Cancelled', 'Posponded', 'Suspend']} name="status" onInput={handleOnInput} />
                                            <TextInput error={evterror.duration} type="text" value={event.duration || ''} label="Duration (Hrs)" name="duration" placeholder="Duration" onInput={handleOnInput} />

                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <TextInput error={evterror.host} type="text" value={event.host || ''} placeholder="Type event host" label="Host" name="host" onInput={handleOnInput} />
                                            {/* <TextInput error={evterror.place} type="text" value={event.place || ''} placeholder="Type event location" label="Location" onInput={handleOnInput} name="place" /> */}
                                            <div id="locationinput">
                                                <Autocomplete
                                                    {...defaultProps}
                                                    id="locationInp"
                                                    className="p-2 text-white"
                                                    value={value}
                                                    onInput={handleTitle}
                                                    onChange={handleTitle}
                                                    renderInput={(params) => (
                                                        <TextField  {...params} error={evterror.place} label="Location" />
                                                    )}
                                                />
                                            </div>
                                            <TextInput error={evterror.endDate} type="date" value={event.endDate || ''} label="buy ticket end date" name="endDate" placeholder="Any date" onInput={handleOnInput} />
                                            <TextSelect error={evterror.eventType} label="Event Type" value={event.eventType || ''} options={['FootBall', 'VolleyBall', 'BasketBall', 'Criket', 'HandBall', 'Tennis', 'Golf', 'Movies', 'Fashion', 'Gospel', 'Live Entertainment', 'Others']} onInput={handleOnInput} name="eventType" />
                                            <div className="flex flex-col p-3 text-white gap-2">
                                                <label >Share to Public</label>
                                                <InputSwitch checked={event.share} name="share" onChange={handleOnInput} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-white p-2">Description</label>
                                        {/* <TextArea type="text" placeholder="Type Event description" label="Description" name="description" onInput={handleOnInput} /> */}
                                        <Editor className="bg-white" style={{ height: '320px' }} name="description" value={event.description || ''} onTextChange={e => setEvent({ ...event, description: e.htmlValue })} />
                                        <label className="text-red-700">{evterror.description}</label>
                                    </div>
                                    <div>
                                        <h2 className="px-6 text-white">Upload Photo</h2>
                                        <FileUpload name="demo[]" auto url={`${process.env.BACKEND_URL}/events/images?eventId=${location.state.event.id}`} multiple accept="image/*"
                                            onUpload={onTemplateUpload} onError={onTemplateClear} onClear={onTemplateClear}
                                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                    </div>
                                </div>
                                <div className="md:w-40">
                                    <Button type="button" onClick={handleUpdateEvent}>Update</Button>
                                </div>
                            </form>

                        </AccordionTab>
                        <AccordionTab header="Event sitting grade cost">
                            <section>

                                <div className="p-2 mt-10 mb-10 md:p-6 md:px-10  bg-maincolor">
                                    <div className="text-center text-gray-300">
                                        <h2 className="text-sm md:text-base">please, Add event sitting grade for example vip with price 20,000RWF</h2>
                                    </div>
                                    <div>
                                        {
                                            _.map(paymentGradeCost, (p, index) => {
                                                return <div key={index} style={{ border: "1px solid white" }} className="flex gap-4 justify-around text-white p-3 mx-5"><p>{p.name}</p><p>{p.price} Rwf</p><div>
                                                    <div>
                                                        <button className="bg-red-700 p-1 rounded text-sm" onClick={e => removeGrade(index)}>delete</button>
                                                        <button className="bg-green-700 p-1 rounded text-sm" onClick={e => editGrade(index)}>Edit</button>
                                                    </div>
                                                </div></div>
                                            })
                                        }
                                    </div>
                                    <div className="md:flex ">
                                        <div className="w-full md:w-1/2">
                                            <TextInput error={gradeerror.name} type="text" placeholder="Type name" value={grade.name} label="Name" name="grade" onInput={e => setGrade({ ...grade, name: e.target.value.toUpperCase() })} />
                                        </div>
                                        <div className="inline-flex w-full md:w-1/2">
                                            <TextInput type="number" placeholder="Type price" value={grade.price} label="Price" name="price" onInput={e => setGrade({ ...grade, price: e.target.value.toUpperCase() })} />
                                        </div>
                                        <div className="pt-5 md:pt-14">
                                            <Button onClick={handleSitGradeCost} type="button" >Add</Button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </AccordionTab>
                        <AccordionTab header="Event Sitting Place">
                            <section className="">

                                <div className="p-3 mt-10 mb-10 md:p-6 md:px-10  bg-maincolor text-white">
                                    <table style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: '20%' }}>Name</th>
                                                <th>Range</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Object.values(paymentGradeCost).map((g, m) => {
                                                    return <tr key={m} className="border-indigo-600 w-full">
                                                        <td style={{ verticalAlign: "top", paddingTop: '5px', borderTop: '1px solid white' }}><label>{g.name}</label></td>
                                                        <td style={{ verticalAlign: "top", paddingTop: '5px', width: '100%', borderTop: '1px solid white' }}>
                                                            <div className="flex flex-col  w-full gap-4 py-2">
                                                                <div>
                                                                    {_.map(sittingPlace, (s, index1) => {
                                                                        return <div key={index1}>
                                                                            {
                                                                                (s.name == g.name) && <div className="flex flex-col gap-1">
                                                                                    <p>Name :{s.name}</p>
                                                                                    <p>total Place : {s.totalPlaces}</p>
                                                                                    <div>
                                                                                        {
                                                                                            _.map(s.placeAvailable, (place, index) => {
                                                                                                return <div key={index}>
                                                                                                    <div className="flex justify-between"><p>Range {index + 1} from {place[0].value} to {place[1].value}</p>
                                                                                                        <div>
                                                                                                            <button className=" bg-red-700 p-1 rounded text-sm" onClick={e => removeRange(index1, index)}>remove</button>
                                                                                                            <button className=" bg-green-700 p-1 rounded text-sm" onClick={e => editRange(index1, index)}>Edit</button>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    })

                                                                    }

                                                                </div>
                                                                <div className="flex flex-col md:flex-row w-full gap-4">
                                                                    <div className="flex gap-2 w-full">
                                                                        <TextInput className="w-full" label="from" onInput={handleRangeInput1} name="from" type="number" />
                                                                    </div>
                                                                    <div className="flex gap-2 w-full">
                                                                        <TextInput className="w-full" label="to" onInput={handleRangeInput1} name="to" type="number" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col md:flex-row w-full gap-2">
                                                                    {/* <div className="flex gap-2 w-full">
                                                                        <TextInput label="skip" type="number" className="w-full" />
                                                                    </div> */}
                                                                    <div className="flex gap-2 w-full">
                                                                        <div>
                                                                            <Button type="button" onClick={e => handleSittingPlace(g.name)}>Add</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>
                                <div className="md:w-40">
                                    <Button type="button" onClick={handleUpdateEventSitting}>Update</Button>
                                </div>
                            </section>

                        </AccordionTab>
                        <AccordionTab header="Event Partner Percentage">
                            <section>
                                <div className="p-2 mt-10 mb-10 md:p-6 md:px-10  bg-maincolor">
                                    <div className="text-center text-gray-300">
                                        <h2 className="text-sm md:text-lg">please, Add Percentage each partner will take, if no one leave this section.</h2>
                                    </div>
                                    <div>
                                        <div>
                                            {
                                                _.map(paymentMethod, (p, index) => {
                                                    return <div key={index} style={{ border: "1px solid white" }} className="flex gap-4 justify-around text-white p-3 mx-5">
                                                        <div>
                                                            <p>{p.name}</p><p>{p.value} %</p>
                                                        </div>
                                                        <div>
                                                            <p>{p.accName}</p><p>{p.accNumber}</p>
                                                        </div>
                                                        <div>
                                                            <button type="button" className="bg-red-700 p-1 rounded text-sm" onClick={e => removeReceiver(index)}>remove</button>
                                                            <button type="button" className="bg-green-700 p-1 rounded text-sm" onClick={e => editReceiver(index)}>Edit</button>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="md:flex">

                                        <div className="md:w-1/2">
                                            <TextInput error={paymerror.name} type="text" name="name" value={receiver.name} onInput={handleReciver} placeholder="Type name" label="Company/Person Name" />
                                            <TextInput error={paymerror.value} type="number" name="value" value={receiver.value} onInput={handleReciver} placeholder="Type %" label="% Between 0-100" />
                                            <TextInput type="tel" label="Phone number" placeholder="Type your phoneNumber" icon={["fas", "phone-square-alt"]} value={receiver.phoneNumber} name="phoneNumber" onInput={handleReciver} error={paymerror.phoneNumber} />
                                        </div>
                                        <div className="md:w-1/2">
                                            {/* <TextSelect error={paymerror.accName} type="text" name="accName" value={receiver.accName} onInput={handleReciver} options={['Bank of Kigali', 'I&M Bank', 'Cogebanque', 'Equity Bank Rwanda Limited', 'Ecobank', 'KCB', 'BPR', 'Access Bank Rwanda', 'NCBA Bank Rwanda', 'Urwego Bank', 'AB Bank Rwanda', 'Unguka Bank', 'Development Bank of Rwanda', 'Zigama CSS', 'Co-operative Bank Rwanda']} label="Account Name" /> */}
                                            <div className="w-full my-2">
                                                <div className="w-full space-y-1 px-3">
                                                    <label className="block text-sm text-white pb-0 mb-0">Bank</label>
                                                    <label className="relative text-gray-400 focus-within:text-gray-600 block">
                                                        <Dropdown className="w-full m-0 " id="primedropdown" value={selectedBank} options={banks} onChange={onEventChange} optionLabel="Bank" filter showClear filterBy="name" placeholder="Select an Bank"
                                                            valueTemplate={selectedEventTemplate} itemTemplate={eventOptionTemplate} />
                                                    </label>
                                                    <label className="block text-red-500 text-xs"> {paymerror.accName || ''}</label>
                                                </div>
                                            </div>
                                            <TextInput error={paymerror.accNumber} type="text" name="accNumber" value={receiver.accNumber} onInput={handleReciver} placeholder="Type Accunt No" label="Account No" />
                                            <TextInput type="Email" label="Email" placeholder="Type your Email" icon={["fas", "envelope"]} name="email" value={receiver.email} onInput={handleReciver} error={paymerror.email} />
                                        </div>
                                        <div className="pt-2 md:pt-14">
                                            <Button type="button" onClick={handleAddReceiver} >Add</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-40">
                                    <Button type="button" onClick={handleUpdateReceiver}>Update</Button>
                                </div>
                            </section>

                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
            <Modal size="base" active={showModalGrade} toggler={() => setShowModalGrade(false)}>
                <ModalHeader toggler={() => setShowModalGrade(false)}>
                    <div className="text-sm flex flex-col">
                        <div className="flex flex-col">
                            <div>Update Grade</div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="bg-maincolor md:w-96 py-4">
                        <div className="w-full">
                            <TextInput error={gradeerror.name} type="text" placeholder="Type name" value={grade.name} label="Name" name="grade" onInput={e => setGrade({ ...grade, name: e.target.value.toUpperCase() })} />
                        </div>
                        <div className="w-full">
                            <TextInput type="number" placeholder="Type price" value={grade.price} label="Price" name="price" onInput={e => setGrade({ ...grade, price: e.target.value.toUpperCase() })} />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModalGrade(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={handleUpdateOneGradde}
                        ripple="light"
                        className="bg-buttonColor hover:bg-indigo-600 p-3 text-white hover:opacity-75 rounded"
                    >
                        Edit
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal size="base" active={showModalSit} toggler={() => setShowModalSit(false)}>
                <ModalHeader toggler={() => setShowModalSit(false)}>
                    <div className="text-sm flex flex-col">
                        <div className="flex flex-col">
                            <div>Update Seat</div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="bg-maincolor md:w-96 py-4">
                        <div className="flex gap-2 w-full">
                            <TextInput className="w-full" label="from" value={range[0].value} onInput={handleRangeInput} name={`from`} type="number" />
                        </div>
                        <div className="flex gap-2 w-full">
                            <TextInput className="w-full" label="to" value={range[1].value} onInput={handleRangeInput} name={`to`} type="number" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModalSit(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={hangleUpdateOneSit}
                        ripple="light"
                        className="bg-buttonColor hover:bg-indigo-600 p-3 text-white hover:opacity-75 rounded"
                    >
                        Edit
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal size="base" active={showModalRec} toggler={() => setShowModalRec(false)}>
                <ModalHeader toggler={() => setShowModalRec(false)}>
                    <div className="text-sm flex flex-col">
                        <div className="flex flex-col">
                            <div>Update Receiver</div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="bg-maincolor md:w-96 py-4">
                        <TextInput error={paymerror.name} type="text" name="name" value={receiver.name} onInput={handleReciver} placeholder="Type name" label="Company/Person Name" />
                        <TextInput error={paymerror.value} type="number" name="value" value={receiver.value} onInput={handleReciver} placeholder="Type %" label="% Between 0-100" />
                        <TextInput type="tel" label="Phone number" placeholder="Type your phoneNumber" icon={["fas", "phone-square-alt"]} value={receiver.phoneNumber} name="phoneNumber" onInput={handleReciver} error={paymerror.phoneNumber} />
                        <div className="w-full my-2">
                            <div className="w-full space-y-1 px-3">
                                <label className="block text-sm text-white pb-0 mb-0">Bank</label>
                                <label className="relative text-gray-400 focus-within:text-gray-600 block">
                                    <Dropdown className="w-full m-0 " id="primedropdown" value={selectedBank} options={banks} onChange={onEventChange} optionLabel="Bank" filter showClear filterBy="name" placeholder="Select an Bank"
                                        valueTemplate={selectedEventTemplate} itemTemplate={eventOptionTemplate} />
                                </label>
                                <label className="block text-red-500 text-xs"> {paymerror.accName || ''}</label>
                            </div>
                        </div>
                        <TextInput error={paymerror.accNumber} type="text" name="accNumber" value={receiver.accNumber} onInput={handleReciver} placeholder="Type Accunt No" label="Account No" />
                        <TextInput type="Email" label="Email" placeholder="Type your Email" icon={["fas", "envelope"]} name="email" value={receiver.email} onInput={handleReciver} error={paymerror.email} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModalRec(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={handleUpdateOneReceiver}
                        ripple="light"
                        className="bg-buttonColor hover:bg-indigo-600 p-3 text-white hover:opacity-75 rounded"
                    >
                        Edit
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}

const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps)(createEvent);