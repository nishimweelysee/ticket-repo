import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Slideshow from '../components/landingPage/slideImages';
import { httpRequest } from '../helpers/httpRequest';
import Button from "@material-tailwind/react/Button";
import PageWrapper from '../components/Layout/UnAuthorizedLayout';
import { CommentBox } from '../components/common/comment';
import useSticky from '../hooks/useSticky';
import Carousel from 'react-grid-carousel';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Countdown from "react-countdown";
import { Paper } from '@material-ui/core';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "rgb(31, 41, 55)",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
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

    },
}));

const singleEventPage = (props) => {
    const location = useLocation();
    const [event, setEvent] = useState({ ...location.state.event });
    const [events, setEvents] = useState([])
    const { element, isSticky } = useSticky();
    const [isTime, setIsTime] = useState(true)


    useEffect(async () => {
        {
            const { error, response } = await httpRequest("GET", `/events/find/${location.state.event.id}`);
            if (!error) {
                setEvent({ ...response.data.event })
            }
            const res = await httpRequest("GET", "/events?page=1&limit=10&status=Pending&share=true");
            setEvents([...res.response.data.data.result])
        }
    }, [location.state])
    useEffect(() => {
        var compareDate = moment(Date(), "DD/MM/YYYY");
        var startDate = moment(event.startDate, "DD/MM/YYYY");
        var endDate = moment(event.endDate, "DD/MM/YYYY");
        if (compareDate.isBetween(startDate, endDate)) {
            setIsTime(false);
            console.log('is not time')
        } else {
            console.log('is Time')
            setIsTime(true);
        }
    }, [])

    const ItemTemplate = (evt) => {
        let e = evt.e;
        return (<div className="shovercardcolor m-3 shadow-xl rounded-2xl bg-white" key={e.id} >
            <Link to={{ pathname: "/event", state: { event: e } }}>
                <div key={e.id} className="text-sm md:text-base hover15 column">
                    <div className="mb-20 flex flex-col gap-2 w-full">
                        <img className="grid-image rounded-t-2xl object-cover max-h-56" src={e.image[0]} />
                        <p className="text-black p-2" style={{ fontSize: "12px", color: 'black' }}>
                            {e.title}  on  <code className="text-maincolor">{moment(e.dateAndTimme).format('llll')}</code>
                        </p>

                    </div>
                    <Button className="cardfooter mb-4 mx-auto" size="lg" align="center" ripple="light">
                        Read More
                    </Button>
                </div>
            </Link>
        </div>
        )
    }

    let sliderItems = events.length > 4 ? 4 : events.length;
    let items = [];

    for (let i = 0; i < events.length; i += sliderItems) {
        if (i % sliderItems === 0) {
            items.push(
                <div key={i.toString()} className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                    {events.slice(i, i + sliderItems).map((da, index) => {
                        return <ItemTemplate key={index.toString()} e={{ ...da }} />;
                    })}
                </div>
            );
        }
    }
    const classes = useStyles();

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            setIsTime(false)
            return ""
        } else {
            // Render a countdown
            return (
                <span className="p-3 m-2">
                    Remains {days} day(s) {hours} Hours , {minutes} Minutes  and {seconds} Seconds to buy Tickets
                </span>
            );
        }
    };

    return (
        <PageWrapper className="">
            <Slideshow isTime={isTime} isEvent event={event} image={event.image} sticky={isSticky} element={element} />
            <Paper style={{ position: 'fixed', top: '120px', right: '0', zIndex: '-moz-initial' }}>
                <Countdown date={new Date(event.startDate)} renderer={renderer} />
            </Paper>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-col p-3 m-3 justify-between">
                <div>
                    <h3>Description</h3>
                    <div className="bg-gray-100 justify-between rounded flex flex-col my-3 px-5 text-base">
                        <div className="flex flex-col wrap items-left pb-4 py-4 text-sm">
                            <div style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: event.description }} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div>
                        <h3>Seats Left</h3>
                        <TableContainer className="my-3">
                            <Table className={classes.table} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell style={{ display: "none" }} align="center">id</StyledTableCell>
                                        <StyledTableCell align="center">Type</StyledTableCell>
                                        <StyledTableCell align="center">Seats</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <StyledTableRow key={-1}>
                                        <StyledTableCell style={{ display: "none" }} align="center">{-1}</StyledTableCell>
                                        <StyledTableCell align="center">Total Seats</StyledTableCell>
                                        <StyledTableCell align="center">{event.ticketLeft}</StyledTableCell>
                                    </StyledTableRow>
                                    {event.EventSittingPlaces.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell style={{ display: "none" }} align="center">{row.id}</StyledTableCell>
                                            <StyledTableCell align="center">{row.name} Seats</StyledTableCell>
                                            <StyledTableCell align="center">{row.placesLeft}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div>
                        <img src={event.placeImage || ""} alt="" />
                    </div>
                </div>

            </div>
            <CommentBox eventId={event.id} />
            <div className="carousel-demo">
                <h2 className="p-3 underline">Treading Events</h2>
                <div className="text-sm md:text-base py-3 m-3 card">
                    {/* <Carousel value={events} className="custom-carousel" itemTemplate={itemTemplate} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions} circular  ></Carousel> */}
                    <Carousel cols={4} rows={1} gap={5} responsiveLayout={[{ breakpoint: 1200, cols: 3 }, { breakpoint: 990, cols: 2 }, { breakpoint: 670, rows: 2 }]} mobileBreakpoint={670} autoplay={3000} loop className="" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                        {
                            events.map((da, index) => {
                                return <Carousel.Item key={index}>
                                    <ItemTemplate key={index.toString()} e={{ ...da }} />
                                </Carousel.Item>;
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </PageWrapper>
    );

}

singleEventPage.propTypes = {

};

export default singleEventPage;