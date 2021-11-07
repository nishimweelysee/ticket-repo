import React,{useEffect} from 'react';
import { Slide } from 'react-slideshow-image'
import { faCalendarAlt, faMapMarkerAlt, faMoneyCheckAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import '../../styles/Navbar.css';
import BuyButton from '../common/buyButton';
import { connect } from 'react-redux';

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
};
const landInfo = <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:p-6 text-white text-center">
  <h1 className="md:P-30 text-base">INTERCORE GOURP LTD</h1><br></br>
  <p className="md:mt-10 text-xs">Intercore Group makes an exceptional experience evrytime and everywhere, we build your dream around you as our vision, Innovation and Event solution.</p>
</div>

const Slideshow = (props) => {
  const date = props.isEvent ? moment(props.event.dateAndTimme).toDate() : "";
  const cost = props.isEvent ? props.event.EventPayments[props.event.EventPayments.length - 1].price + " Rwf   ~   " + props.event.EventPayments[0].price + " Rwf" : "";
  const eventInfo = props.isEvent ? <div className="leading-loose px-4 shadow-lg-deep-orange" style={{
    position: "absolute",
    top: "80%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    textAlign: "left",
    color: "white",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-between'
  }}>
    <div className="slide-container-div" style={{ alignSelf: "center" }}>
      <h3 className="md:text-3xl text-sm" style={{ borderBottom: "2px solid white" }}>{props.event.title}</h3>
      <p className="p-1"><FontAwesomeIcon icon={faMapMarkerAlt} /> <span className="p-3">{props.event.place}</span></p>
      <p className="p-1"><FontAwesomeIcon icon={faCalendarAlt} /> <span className="p-3">{date.toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span></p>
      <p className="p-1"><FontAwesomeIcon icon={faStopwatch} /><span className="p-3">{date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit', })}</span></p>
      <p className="p-1"><FontAwesomeIcon icon={faMoneyCheckAlt} /> <span className="p-3">{cost}</span></p>
    </div>
    {!props.isBuy && <BuyButton isTime={props.isTime} login={props.login} event={props.event} />}
  </div> : "";
  return (
    <div className="slide-container   text-sm md:text-base">
      <Slide {...properties} className="bg-white">
        {
          props.image.map((each, index) =>
            <div key={index} className="mainimages relative">
              <img className="object-fit w-full" id="mainpageimg" src={each} />
              {props.isEvent ? eventInfo : landInfo}
            </div>)
        }
      </Slide>
    </div>
  )
}
const mapStateToProps = state => ({
  login: state.login
})

export default connect(mapStateToProps)(Slideshow);