import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel';
import { connect } from 'react-redux';
import { Knob } from 'primereact/knob';

function eventSlide(props) {
    const [event, setEvent] = useState(props.searchUser.events)
    const [totol, setTotal] = useState();
    useEffect(() => {
        setEvent(props.searchUser.events)
    }, [props.searchUser.events])
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const getEstimatedCost = (evt) => {
        let eventPayments = evt.EventPayments;
        let eventSittingPlaces = evt.EventSittingPlaces;
        let totolIncome = 0;
        eventSittingPlaces.map((et, index) => {
            let epl = eventPayments.find(d => d.name = et.name);
            let price = epl.price;
            totolIncome = totolIncome + (et.totalPlaces * price);
        })
        return totolIncome;
    }
    const calculateTotal = (evt) => {
        let eventPayments = evt.EventPayments;
        let totolIncome = 0;
        eventPayments.map((et, index) => {
            totolIncome = totolIncome + (et.boughtTickets * et.price);
        })
        return totolIncome;
    }

    function eventTemplate(e) {
        const typeNames = [{ name: 'Total Tickets', number: e.numberofTicket, perc: 100 }, {
            name: 'Bought Tickets', number: e.numberboughtticket, perc: ((e.numberboughtticket * 100) / e.numberofTicket).toFixed(0)
        },
        { name: 'Remain Tickets', number: e.ticketLeft, perc: ((e.ticketLeft * 100) / e.numberofTicket).toFixed(0) },
        { name: 'Total Income', number: calculateTotal(e), perc: ((calculateTotal(e) * 100) / getEstimatedCost(e)).toFixed(0) }
        ];
        return (
            <div>
                <div>
                    <div className="p-6 text-white ">
                        <h4 className="p-mb-1 mb-3">{e.title}</h4>
                        <div className="flex gap-3 justify-between">
                            {typeNames.map((n, i) => {
                                return <div key={i} className="flex shadow text-black rounded-2xl bg-white">
                                    <Knob value={n.perc || 0} valueTemplate={"{value}%"} />
                                    <div className="text-right pr-1" style={{ margin: 'auto' }}>
                                        <p>{n.number}</p>
                                        <p>{n.name}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (

        <div className="h-auto rounded-sm m-2 md:m-5 bg-maincolor">
            <Carousel value={event} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                autoplayInterval={6000} itemTemplate={eventTemplate} />
        </div>

    )

}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps)(eventSlide);
