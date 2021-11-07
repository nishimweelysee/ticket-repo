import { faCalendar, faMapMarkerAlt, faMoneyCheckAlt, faWifi, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Button from "@material-tailwind/react/Button";
import { faClock } from '@fortawesome/free-regular-svg-icons';

function eventBox(props) {

    const event = props.event;
    let startPrice = event.EventPayments[event.EventPayments.length - 1].price;
    let endPrice = event.EventPayments[0].price;
    let cost;
    if (startPrice == 0 && endPrice == 0) {
        cost = "free"
    } else if (startPrice == 0) {
        cost = "free  ~ " + endPrice + " Rwf";
    } else {
        cost = startPrice + " Rwf   ~   " + endPrice + " Rwf";
    }
    return (
        <Card className={"transform hover:bg-yellow-50 transition duration-500 hover:scale-90 m-6 p-2"}>
            <CardImage
                src={event.image[0]}
                alt="Event Image"
                className="max-h-52"
            />

            <CardBody>
                <h1 className="font-bold">{event.title}</h1>
                <div color="gray" className="flex flex-col">
                    <span><FontAwesomeIcon icon={faWifi} /> <span>{event.host} Hosted</span></span>
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} /> {event.place}</span>
                    <span><FontAwesomeIcon icon={faCalendar} /> <span>{moment(event.dateAndTimme).format("llll")}</span></span>
                    <span><FontAwesomeIcon icon={faMoneyCheckAlt} /> <span>{cost}</span></span>
                    <span><FontAwesomeIcon icon={faClock} /> <span>{event.duration} Hours</span></span>
                </div>
            </CardBody>

            <CardFooter>
                <Button className="cardfooter" size="lg" ripple="light">
                    {!props.prev ? 'Read More' : 'Sold Out'}
                </Button>
            </CardFooter>
        </Card>
        // </div>
    );
}

export default eventBox;