import React, { Component } from 'react';
import { Galleria } from 'primereact/galleria';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faMoneyCheckAlt, faStopwatch } from '@fortawesome/free-solid-svg-icons';

export class GalleriaResponsiveDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: this.props.images,
            event: this.props.event
        };
        this.caption = this.caption.bind(this);
        this.responsiveOptions = [
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
    }

    componentDidMount() {
        this.setState({ images: this.props.images });
    }

    itemTemplate(item) {
        return <img src={item} className="object-cover"  style={{ width: '100%', display: 'block' ,maxHeight:"500px"}} />
    }

    thumbnailTemplate(item) {
        return <img src={item} className="object-cover w-full max-h-16 "   style={{ display: 'block',margin:"15px" }} />
    }

    caption(item) {
        const date = this.props.isEvent ?moment(this.props.event.dateAndTimme).toDate():"";
        const cost = this.props.isEvent ? this.props.event.EventPayments[this.props.event.EventPayments.length-1].price+" Rwf   ~   "+this.props.event.EventPayments[0].price+" Rwf":"";
        return (
            <React.Fragment>
                <div className="leading-loose">
                    <div className="slide-container-div" style={{padding: "2px" }}>
                        <h3 className="md:text-3xl text-sm" style={{ borderBottom: "2px solid white" }}>{this.props.event.title}</h3>
                        <p className="p-1"><FontAwesomeIcon  icon={faMapMarkerAlt} /> <span className="p-2">{this.props.event.place}</span></p>
                        <p className="p-1"><FontAwesomeIcon  icon={faCalendarAlt} /> <span className="p-2">{date.toLocaleString(undefined, {day:'numeric',month:'short',year:'numeric'})}</span></p>
                        <p className="p-1"><FontAwesomeIcon  icon={faStopwatch}/><span className="p-2">{date.toLocaleTimeString(undefined, {hour: '2-digit',minute: '2-digit',second: '2-digit',})}</span></p>
                        <p className="p-1"><FontAwesomeIcon  icon={faMoneyCheckAlt} /> <span className="p-2">{cost}</span></p>
                    </div>
                    {!this.props.isBuy && <Link to={{pathname:"/payment",state:{event:this.props.event}}} style={{ alignSelf:"center",padding: "5px",width:"95px",textAlign:"center" ,float:'right',borderRadius:"5px"}} className="bg-buttonColor hover:bg-indigo-600">
                        <button>Buy Ticket</button>
                    </Link>}
                    </div>
            </React.Fragment>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <Galleria autoPlay value={this.state.images}  responsiveOptions={this.responsiveOptions} numVisible={7} circular style={{ width: '100%' }}
                        item={this.itemTemplate} thumbnail={this.thumbnailTemplate} caption={this.caption} />
                </div>
            </div>
        );
    }
}