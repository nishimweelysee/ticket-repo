
import React, { useEffect, useRef, useState } from 'react';
import TextInput from "../../common/textInput";
import TextArea from "../../common/textArea";
import _ from 'lodash';
import { httpRequest } from '../../../helpers/httpRequest'
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';
import moment from 'moment';
import { InputSwitch } from 'primereact/inputswitch';
import { Galleria } from 'primereact/galleria';

const viewEvent = (props) => {
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
        duration: ""
    });
    const [paymentMethod, setPaymentMethod] = useState({});
    const [sittingPlace, setSittingPlace] = useState({});
    const [paymentGradeCost, setPaymentGradeCost] = useState({});


    const updateSate = async () => {
        const { error, response } = await httpRequest("GET", `/events/find/${location.state.event.id}`);
        const { title, host, dateAndTimme, place, description, numberofTicket, eventType, country, image, startDate, endDate, share, status, duration } = response.data.event;
        setEvent({ ...event, title, host, dateAndTimme: moment(dateAndTimme).format("YYYY-MM-DDTHH:mm"), place, description, numberofTicket, eventType, country, image, startDate: moment(startDate).format("YYYY-MM-DD"), endDate: moment(endDate).format("YYYY-MM-DD"), share, status, duration })
        const { EventPayments, EventSittingPlaces, PaymentMethods } = response.data.event;
        setSittingPlace({ ...EventSittingPlaces });
        setPaymentGradeCost({ ...EventPayments });
        setPaymentMethod({ ...PaymentMethods });
    }
    useEffect(() => {
        updateSate();
    }, [])



    //function to handle inputs
    const handleOnInput = e => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'title':
                event.title = value;
                break
            case 'host':
                event.host = value;
                break
            case 'dateAndTimme':
                event.dateAndTimme = value;
                break
            case 'startDate':
                event.startDate = value;
                break
            case 'endDate':
                event.endDate = value;
                break
            case 'place':
                event.place = value;
                break
            case 'description':
                event.description = value;
                break
            case 'eventType':
                event.eventType = value;
                break
            case 'country':
                event.country = value;
                break
            case 'numberofTicket':
                event.numberofTicket = value;
                break
            case 'share':
                event.share = value;
                break
            case 'status':
                event.status = value;
                break

        }
        setEvent({ ...event, ...event })

    }

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img className="object-cover" src={item} style={{ width: '100%', display: 'block', maxHeight: "700px" }} />
    }

    const thumbnailTemplate = (item) => {
        return <img className="object-cover" src={item} width="120" height="120" style={{ display: 'block', margin: "15px" }} />
    }




    return (
        <div >
            <div className="pt-10 md:px-12 ">
                <div>

                    <div>
                        <Galleria autoPlay value={event.image} responsiveOptions={responsiveOptions} numVisible={7} circular style={{ width: '100%' }}
                            item={itemTemplate} thumbnail={thumbnailTemplate} />
                    </div>
                    <Accordion multiple activeIndex={[0]}>
                        <AccordionTab header="Event Information">
                            <form>
                                <div className="p-3 mt-10 mb-10 md:p-6 md:px-10  bg-maincolor">
                                    <div className="md:flex ">
                                        <div className="w-full md:w-1/2">
                                            <TextInput type="text" readOnly={true} value={event.title || ''} label="Event title" name="title"  />
                                            <TextInput type="datetime-local" readOnly={true} label="Date" value={event.dateAndTimme || ''} name="dateAndTimme"  />
                                            <TextInput type="date" readOnly={true} label="buy ticket start date" value={event.startDate || ''} name="startDate"   />
                                            <TextInput label="Country" readOnly={true} value={event.country || ''} name="country"  />
                                            <TextInput label="Status" readOnly={true} value={event.status || ''}  name="status"  />
                                        </div>
                                        <div className="w-full md:w-1/2">
                                            <TextInput type="text" readOnly={true} value={event.host || ''}  label="Host" name="host"  />
                                            <TextInput type="text" readOnly={true} value={event.place || ''}  label="Location"  name="place" />
                                            <TextInput type="date" readOnly={true} value={event.endDate || ''} label="buy ticket end date" name="endDate"  />
                                            <TextInput label="Event Type" readOnly={true} value={event.eventType || ''}  name="eventType" />
                                            <div className="flex flex-col p-3 text-white gap-2">
                                                <label >Share to Public</label>
                                                <InputSwitch checked={event.share} name="share" disabled/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label>Description</label>
                                        <div className="flex flex-col wrap items-left pb-4 py-4 text-sm text-white h-64 overflow-scroll">
                                            <div style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: event.description }} />
                                        </div>
                                    </div>
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
                                                return <div key={index} style={{ border: "1px solid white" }} className="flex gap-4 justify-around text-white p-3 mx-5"><p>{p.name}</p><p>{p.price} Rwf</p></div>
                                            })
                                        }
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
                                                                                                    <div className="flex justify-between"><p>Range {index + 1} from {place[0].value} to {place[1].value}</p></div>
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

                                                            </div>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                        </tbody>

                                    </table>
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
                                                    return <div key={index} style={{ border: "1px solid white" }} className="flex gap-4 justify-around text-white p-3 mx-5"><div><p>{p.name}</p><p>{p.value} %</p></div><div><p>{p.accName}</p><p>{p.accNumber}</p></div></div>
                                                })
                                            }
                                        </div>
                                    </div>

                                </div>
                            </section>

                        </AccordionTab>
                    </Accordion>
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps)(viewEvent);