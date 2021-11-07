import React, { useEffect, useState } from 'react';
import EventBox from '../event/eventBox';
import { Link } from 'react-router-dom';
import { httpRequest } from '../../helpers/httpRequest';
import H5 from "@material-tailwind/react/Heading5";
import H6 from "@material-tailwind/react/Heading6";
import moment from 'moment';
import _ from 'lodash';
import Skeleton from '../event/skeleton';
import Carousel from 'react-grid-carousel';

function featuredEvents(props) {
    const [events, setEvents] = useState([

    ])
    const [host, setHost] = useState([])
    const [thisweek, setThisweek] = useState([])
    const [loading, setLoading] = useState(true)

    const getEvents = async () => {
        setLoading(true);
        const { response, error } = await httpRequest("GET", "/events?page=1&limit=24&status=Pending&share=true");
        let myArray = _.sortBy(response.data.data.result, function (dateObj) {
            return new Date(dateObj.dateAndTimme);
        });
        let even = _.chain(myArray)
            .groupBy("eventType")
            .map((value, key) => ({ category: key, event: value }))
            .value()
        setEvents([...events, ...even])

        let hosts = _.chain(myArray)
            .groupBy("host")
            .map((value, key) => ({ host: key, number: value.length, image: value[value.length - 1].image[0] }))
            .value()
        setHost([...host, ...hosts])


        let datas = _.filter(myArray, (d) => moment().isoWeek() == moment(d.dateAndTimme).isoWeek());
        setThisweek([...thisweek, ...datas]);

        setLoading(false);

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

            <div className="px-1 m-1 font-light">
                <H5>Top Latest Events</H5>
            </div>

            <div>
                <div className="px-1 m-1 font-light">
                    <H6>This Week</H6>
                </div>
                {
                    loading ? <div className="flex flex-row justify-between gap-3 flex-wrap">
                        <Skeleton /><Skeleton /><Skeleton /><Skeleton />
                    </div> :
                         <Carousel cols={4} rows={thisweek.length>4?2:1} gap={5} responsiveLayout={options} mobileBreakpoint={767} autoplay={3000} loop  style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                         {
                             thisweek.map((event, index) => {
                                 return <Carousel.Item key={index}>
                                     <Link key={index} to={{ pathname: "/event", state: { event } }} className="my-5"> <EventBox event={event} /></Link>
                                 </Carousel.Item>
                             })
                         }
                     </Carousel>
                }

            </div>
            {!props.dash && <div>
                {
                    loading ? <div className="flex flex-row justify-between gap-3 flex-wrap">
                        <Skeleton /><Skeleton /><Skeleton /><Skeleton />
                    </div> :
                        events.map((evt, id) =>
                            <div key={id}>
                                <div className="p-2 my-4 font-light">
                                    <H6>{evt.category}</H6>
                                </div>
                                <Carousel cols={4} rows={evt.event.length>4?2:1} gap={5} responsiveLayout={options} mobileBreakpoint={767} autoplay={3000} loop style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                    {
                                        evt.event.map((event, index) => {console.log(event);
                                            return <Carousel.Item key={index}>
                                                <Link key={index} to={{ pathname: "/event", state: { event } }} className="my-5"> <EventBox event={event} /></Link>
                                            </Carousel.Item>
                                        })
                                    }
                                </Carousel>
                            </div>
                        )
                }
                <div className="px-2 m-1 font-light">
                    <H6>Best Hosters</H6>
                </div>
                <Carousel cols={4} rows={host.length>4?2:1} gap={5} responsiveLayout={options} mobileBreakpoint={767} autoplay={3000} loop style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                    {
                        host.map((evt, index) => {
                            return <Carousel.Item key={index}>
                                <div className="transform hover:bg-yellow-50 transition duration-500 hover:scale-90 my-5">
                                    <img className="rounded-t max-h-56  object-cover w-full" src={evt.image} />
                                    <div className="opacity-70  -mt-16 pt-10 px-4 bg-black">
                                        <h1 className="text-white text-center">{evt.host} {evt.number} Events</h1>
                                    </div>
                                    <p className="bg-buttonColor p-1 text-center text-white font-extrabold"><Link to={`/events?category=All&host=${evt.host}`}>View More</Link></p>
                                </div>
                            </Carousel.Item>
                        })
                    }
                </Carousel>

            </div>
            }
        </div>
    );
}

export default featuredEvents;