import React, { useEffect, useState } from 'react';
import EventBox from '../event/eventBox';
import { httpRequest } from '../../helpers/httpRequest';
import H5 from '@material-tailwind/react/Heading5';
import Carousel from 'react-grid-carousel';

function prevEvents(props) {
    const [events, setEvents] = useState([

    ])

    const getEvents = async () => {
        const { response, error } = await httpRequest("GET", "/events?page=1&limit=12&status=Done");
        setEvents([...events, ...response.data.data.result])
    }

    useEffect(() => {
        getEvents();
    }, []);

    let options = [{ 
            breakpoint: 1200, 
            cols: 3,
            rows: 3,
            gap: 10,
            loop: true,
            autoplay: 3000
        },
        { 
            breakpoint: 990, 
            cols: 2,
            rows: 4,
            gap: 10,
            loop: true,
            autoplay: 3000
        },
        { 
            breakpoint: 670, 
            cols: 1,
            rows: 5,
            gap: 10,
            loop: true,
            autoplay: 3000
        }
    ]

    return (
        <div className="md:p-4">
            <div>
                <div className="x-1 m-1 font-light">
                    <H5>Past Events</H5>
                </div>
                <Carousel cols={4} rows={events.length>4?2:1} gap={5} responsiveLayout={options} mobileBreakpoint={767} autoplay={3000} loop  style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                    {
                        events.map((event, index) => {
                            return <Carousel.Item key={index}>
                                <EventBox prev={true} key={event.id} event={event} />
                            </Carousel.Item>
                        })
                    }
                </Carousel>
            </div>
        </div>

    );
}

export default prevEvents;