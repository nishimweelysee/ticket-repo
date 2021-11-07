
import React, { useEffect, useRef, useState } from 'react';
import TextInput from "../../common/textInput";
import TextSelect from "../../common/textSelect";
import { FileUpload } from 'primereact/fileupload';
import Button from '../../common/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import cogoToast from 'cogo-toast';
import _ from 'lodash';
import { httpRequest } from '../../../helpers/httpRequest'
import { connect } from 'react-redux';
import { Editor } from 'primereact/editor';
import { InputSwitch } from 'primereact/inputswitch';
import { validateEvent, validateGrade, validateReceiver } from '../../validations/eventValidation';
import { Dropdown } from 'primereact/dropdown';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';


let i = 0;
let j = 0;
let k = 0;
const createEvent = (props) => {
    const [body, setBody] = useState(
        {
            event: {
                title: "",
                host: "",
                dateAndTimme: "",
                place: "",
                description: "",
                numberofTicket: 0,
                eventType: "",
                country: "",
                image: [],
                startDate: "",
                endDate: "",
                duration: "",
                share: false,
                placeImage: ""
            },
            paymentMethod: {

            },
            sittingPlace: {

            },
            paymentGradeCost: {

            }
        }
    );

    const [evterror, setEvterror] = useState({});
    const [paymerror, setPaymerror] = useState({});
    const [gradeerror, setGradeerror] = useState({});
    const [totalPercentage, setTotalPercentage] = useState(0)

    const getTotal = () => {
        let total = 0;
        Object.values(body.sittingPlace).map((s) => {
            total = s.totalPlaces + total;
        })
        return total;
    }
    const removeGrade = (key) => {
        delete body.paymentGradeCost[key];
        setBody({ ...body, ...body })
    }

    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);


    //function to handle inputs
    const handleOnInput = e => {
        if (e.htmlValue) {
            body.event.description = e.htmlValue;
        } else {
            if (!e.target)
                return;
            const name = e.target.name;
            const value1 = e.target.value;
            switch (name) {
                case 'title':
                    body.event.title = value1;
                    break
                case 'host':
                    body.event.host = value1;
                    break
                case 'dateAndTimme':
                    body.event.dateAndTimme = value1;
                    break
                case 'startDate':
                    body.event.startDate = value1;
                    break
                case 'endDate':
                    body.event.endDate = value1;
                    break
                case 'place':
                    body.event.place = value1;
                    break
                case 'eventType':
                    body.event.eventType = value1;
                    break
                case 'country':
                    body.event.country = value1;
                    break
                case 'numberofTicket':
                    body.event.numberofTicket = value1;
                    break
                case 'share':
                    body.event.share = value1;
                    break
                case 'duration':
                    body.event.duration = value1;

            }

        }

        setBody({ ...body, ...body })

    }

    // function to handle submission
    const handleSubmit = async () => {

        if (totalPercentage > 100) {
            cogoToast.info('Sum of all Total Perccentage can not go more than 100%')
            return;
        }

        body.event.numberofTicket = getTotal();
        setBody({ ...body, ...body })
        const eventValid = validateEvent(body.event);
        setEvterror(eventValid);
        if (Object.keys(eventValid).length === 0) {
            const { error, response } = await httpRequest('POST', '/events', { ...body }, { "Authorization": props.login.token });
            if (!error) {
                cogoToast.success("Event Created Success")
                setBody({
                    ...body, event: {
                        title: "",
                        host: "",
                        dateAndTimme: "",
                        place: "",
                        description: "",
                        numberofTicket: 0,
                        eventType: "",
                        country: "",
                        image: [],
                        startDate: "",
                        endDate: "",
                        duration: "",
                        share: false,
                        placeImage: ""
                    },
                    paymentMethod: {

                    },
                    sittingPlace: {

                    },
                    paymentGradeCost: {

                    }
                })
            }
            else {

            }
        }
        window.scrollTo(0, 0);
    }

    const [location, setLocation] = useState([])
    const [grade, setGrade] = useState({ name: "", price: 0 });
    const [sitting, setSitting] = useState({
    });
    const [range, setRange] = useState({ range1: '', range2: '' });
    const [receiver, setReceiver] = useState({ name: "", value: 100, accName: {}, accNumber: "", phoneNumber: "", email: "", flutterId: "" });
    const handleSitGradeCost = () => {
        const isValid = validateGrade(grade)
        setGradeerror(isValid);
        if (Object.keys(isValid).length === 0) {
            body.paymentGradeCost[`pay${i}`] = grade;
            i++;
            setBody({ ...body, ...body })
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
                setTotalPercentage(Number(totalPercentage) + Number(receiver.value));
                body.paymentMethod[`receiver${j}`] = { name: receiver.name, value: receiver.value, accNumber: receiver.accNumber, flutterId: response.data.data.subaccount_id, accName: receiver.accName['name'], phoneNumber: receiver.phoneNumber, email: receiver.email };
                j++;
                setBody({ ...body, ...body })
                setReceiver({ name: "", value: 0, accNumber: "", accName: {}, phoneNumber: "", email: "", flutterId: "" })
            }
        }
    }

    const removeReceiver = (rec) => {
        setTotalPercentage(Number(totalPercentage) - Number(body.paymentMethod[rec].value))
        delete body.paymentMethod[rec];
        setBody({ ...body, ...body })
        setReceiver({ name: "", value: "", accNumber: "", accName: {}, email: '', phoneNumber: '' })
        cogoToast.success(`The Receiver deleted`);
    }
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
            setLocation(response.data.data);
        }
    }
    useEffect(() => {
        getBankAccounts();
        getLocation();
    }, [])


    const findRange = (mine, name) => {
        let choice = false;
        _.map(sitting[name].placeAvailable, s => {
            if ((Number(mine[0]) >= Number(s[0])) && (Number(mine[0]) <= Number(s[1])) || (Number(mine[1]) >= Number(s[0])) && (Number(mine[1]) <= Number(s[1]))) {
                cogoToast.error("One of the Range Selected Before")
                choice = true;
            }
        })
        return choice;
    }

    const handleSittingPlace = (name) => {
        if (_.isEmpty(body.sittingPlace[name])) {
            sitting[name] = { name: "", totalPlaces: 0, placeAvailable: [] }
            setSitting({ ...sitting, ...sitting });
        } else {
            setSitting({})
            setSitting({ ...body.sittingPlace });
        }

        let error = false;
        if ((range.range1 == undefined)) {
            cogoToast.error("Please Insert Range 1 (Clean and Re-Type)");
            return
        }
        if ((range.range2 == undefined)) {
            cogoToast.error("Please Insert Range 2 (Clean and Re-Type)");
            return
        }
        if (range.range1 == '') {
            cogoToast.error("Please Insert all Range");
            return
        }
        if (range.range2 == '') {
            cogoToast.error("Please Insert all Range");
            return
        }
        if (Number(range.range1) > Number(range.range2)) {
            cogoToast.error("Range 1 can't be greater than Range 2")
            return
        }
        if (!error) {
            let arry = [Number(range.range1), Number(range.range2)];
            let isIn = findRange(arry, name)
            if (!isIn) {
                sitting[name].placeAvailable.push(arry);
                sitting[name].name = name;
                let total = Number(sitting[name].totalPlaces) + (Number(range.range2) - Number(range.range1))
                sitting[name].totalPlaces = total;
                setRange([])
                body.sittingPlace[name] = { ...sitting[name] };
                setBody({ ...body });
            }
        }
    }



    const onTemplateUpload = async (e) => {
        const data = await JSON.parse(e.xhr.response)
        body.event.image = data.data.urls;
        setBody({ ...body, ...body })

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
        console.log(e.value)
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
        options: location,
        getOptionLabel: (option) => option.title,
    };

    const [value, setValue] = React.useState(null);
    const handleTitle = (event, newValue) => {
        try {
            let type = event.type;
            if (type !== "input") {
                body.event.place = newValue.title;
                body.event.placeImage = newValue.image;
                setValue(newValue);
                setBody({ ...body, ...body })
            } else {
                let p = {
                    id: location.length + 1,
                    title: event.target.value,
                    image: "",
                    type: "location",
                    updatedAt: Date()
                }
                body.event.place = p.title;
                body.event.placeImage = p.image;
                setValue(p);
                setBody({ ...body, ...body })
            }
        } catch (error) {

        }

    }
    return (
        <div >
            <div className="pt-10 md:px-12 mainfont">
                <form onSubmit={handleSubmit}>
                    <section >
                        <div>
                            <h2>Create Event here</h2>
                        </div>
                        <div className="p-3 mt-10 mb-10 md:p-6 md:px-20 mainfont bg-maincolor">
                            <div className="md:flex ">
                                <div className="w-full md:w-1/2">
                                    <TextInput error={evterror.title} type="text" placeholder="Type event title" value={body.event.title} label="Event title" name="title" onInput={handleOnInput} />
                                    <TextInput error={evterror.dateAndTimme} type="datetime-local" label="Date" value={body.event.dateAndTimme} name="dateAndTimme" placeholder="Any date" onInput={handleOnInput} />
                                    <TextInput error={evterror.startDate} type="date" label="buy ticket start date" value={body.event.startDate} name="startDate" placeholder="Any date" onInput={handleOnInput} />
                                    <TextSelect error={evterror.country} label="Country" value={body.event.country} options={['Kenya', 'Rwanda', 'Tanzania', 'Uganda', 'Burundi', 'Congo']} name="country" onInput={handleOnInput} />
                                    <TextInput error={evterror.duration} type="text" value={body.event.duration} label="Duration (Hrs)" name="duration" placeholder="Duration" onInput={handleOnInput} />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <TextInput error={evterror.host} type="text" placeholder="Type event host" label="Host" value={body.event.host} name="host" onInput={handleOnInput} />
                                    {/* <TextInput error={evterror.place} type="text" placeholder="Type event location" label="Location" onInput={handleOnInput} name="place" /> */}
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
                                    <TextInput error={evterror.endDate} type="date" value={body.event.endDate} label="buy ticket end date" name="endDate" placeholder="Any date" onInput={handleOnInput} />
                                    <TextSelect error={evterror.eventType} label="Event Type" value={body.event.eventType} options={['VolleyBall', 'FootBall', 'BasketBall', 'Criket', 'HandBall', 'Tennis', 'Golf', 'Movies', 'Fashion', 'Gospel', 'Live Entertainment', 'Others']} onInput={handleOnInput} name="eventType" />
                                    <div className="flex flex-col p-3 text-white gap-2">
                                        <label >Share to Public</label>
                                        <InputSwitch checked={body.event.share} name="share" onChange={handleOnInput} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="text-white p-2">Description</label>
                                {/* <TextArea type="text" placeholder="Type Event description" label="Description" name="description" onInput={handleOnInput} /> */}
                                <Editor className="bg-white" style={{ height: '320px' }} name="description" value={body.event.description} onTextChange={handleOnInput} />
                                <label className="text-red-700">{evterror.description}</label>
                            </div>
                            <div>
                                <h2 className="px-6 text-white">Upload Photo</h2>
                                <FileUpload name="demo[]" url={`${process.env.BACKEND_URL}/events/images`} multiple accept="image/*"
                                    onUpload={onTemplateUpload} auto onError={onTemplateClear} onClear={onTemplateClear}
                                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                            </div>
                        </div>
                    </section>

                    <section>
                        <div>
                            <h2>Event sitting grade cost</h2>
                        </div>
                        <div className="p-2 mt-10 mb-10 md:p-6 md:px-20 mainfont bg-maincolor">
                            <div className="text-center text-gray-300">
                                <h2 className="text-sm md:text-base">please, Add event sitting grade for example vip with price 20,000RWF</h2>
                            </div>
                            <div>
                                {
                                    _.map(body.paymentGradeCost, (p, index) => {
                                        return <div key={index} style={{ border: "1px solid white" }} className="flex gap-4 justify-around text-white p-3 mx-5"><p>{p.name}</p><p>{p.price} Rwf</p><button className="text-red-900" onClick={e => removeGrade(index)}>remove</button></div>
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

                    <section className="">
                        <div>
                            <h2>Event Sitting Place</h2>
                        </div>
                        <div className="p-3 mt-10 mb-10 md:p-6 md:px-20 mainfont bg-maincolor text-white">
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }}>Name</th>
                                        <th>Range</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.values(body.paymentGradeCost).map((g, m) => {
                                            return <tr key={m} className="border-indigo-600 w-full">
                                                <td style={{ verticalAlign: "top", paddingTop: '5px', borderTop: '1px solid white' }}><label>{g.name}</label></td>
                                                <td style={{ verticalAlign: "top", paddingTop: '5px', width: '100%', borderTop: '1px solid white' }}>
                                                    <div className="flex flex-col  w-full gap-4 py-2">
                                                        <div>
                                                            {body.sittingPlace[g.name] && <div className="flex flex-col gap-1">
                                                                <p>Name :{body.sittingPlace[g.name].name}</p>
                                                                <p>total Place : {body.sittingPlace[g.name].totalPlaces}</p>
                                                                {
                                                                    _.map(body.sittingPlace[g.name].placeAvailable, (pl, index) => {
                                                                        return <div key={index}>
                                                                            <div><p>Range {index + 1} from {pl[0]}  to {pl[1]}</p></div>
                                                                        </div>
                                                                    })
                                                                }
                                                            </div>
                                                            }

                                                        </div>
                                                        <div className="flex flex-col md:flex-row w-full gap-4">
                                                            <div className="flex gap-2 w-full">
                                                                <TextInput className="w-full" label="from" onInput={e => setRange({ ...range, range1: e.target.value })} name={`from ${g.name}`} type="number" />
                                                            </div>
                                                            <div className="flex gap-2 w-full">
                                                                <TextInput className="w-full" label="to" onInput={e => setRange({ ...range, range2: e.target.value })} name={`to ${g.name}`} type="number" />
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col md:flex-row w-full gap-2">
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
                    </section>

                    <section>
                        <div>
                            <h2>Event Partner Percentage</h2>
                        </div>
                        <div className="p-2 mt-10 mb-10 md:p-6 md:px-20 mainfont bg-maincolor">
                            <div className="text-center text-gray-300">
                                <h2 className="text-sm md:text-lg">please, Add Percentage each partner will take, This are accounts where we will share the income, The total share have to be 100% , <i className="opacity-60">ie. if only one shareholders, it will be 100%, if it's two , it will be like 10% and 90% which will be equal to 100%.</i> </h2>
                            </div>
                            <div>
                                <div>
                                    {
                                        _.map(body.paymentMethod, (p, index) => {
                                            return <div key={index} style={{ border: "1px solid white" }}>
                                                <div className="flex gap-4 justify-around text-white py-3 mx-1">
                                                    <div>
                                                        <p>Name: {p.name}</p>
                                                        <p>Percentage: {p.value} %</p>
                                                    </div>
                                                    <div>
                                                        <p>AccName: {p.accName.name}</p>
                                                        <p>AccNumber: {p.accNumber}</p>
                                                    </div>
                                                    <button type="button" className="bg-red-700 p-1 rounded text-sm" onClick={e => removeReceiver(index)}>remove</button>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className="p-2 text-white">
                                        <p>Total Percentage is {totalPercentage} % </p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex ">

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
                                    <Button type="button" disabled={totalPercentage == 100} onClick={handleAddReceiver} >Add</Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-10 md:px-96">
                        <div className="md:w-40">
                            <Button type="button" onClick={handleSubmit}>Prepare</Button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps)(createEvent);