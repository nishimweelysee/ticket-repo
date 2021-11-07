import { faCalendar, faCalendarAlt, faCommentAlt, faImages } from '@fortawesome/free-regular-svg-icons';
import { faMoneyBill, faTachometerAlt, faTicketAlt, faUsers,faPencilAlt, faIndustry, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Actioncomponent from './actionComponent/actioncomponent';
import profileImg from '../../../public/img/profileImg.png';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function DefaultAuthLeftSidebar(props) {
    const [size, setSize] = useState(window.innerWidth);
    useEffect(()=>{
        window.addEventListener("resize", ()=>{
            setSize(window.innerWidth)
        });
    })
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        large: {
            width: theme.spacing(size>900?20:size<=587?5:size<=900?10:2),
            height: theme.spacing(size>900?20:size<=587?5:size<=900?10:2),
        },
      }));
    const classes = useStyles();
    return (
        <div className="b-maincolor">
            <div className="flex flex-col justify-center">
                <div style={{ margin: "auto" }} className={classes.root}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={<Link to="/user-profile"><FontAwesomeIcon className="bg-gray-200 text-maincolor p-1 rounded-3xl" size="2x" icon={faPencilAlt} /></Link>}
                    >
                        <Avatar className={classes.large} alt="profile image" src={props.login.data.profilePicture?props.login.data.profilePicture:profileImg} />
                    </Badge>
                </div>
            </div>
            {
                (props.login.data.RoleId == 2 || props.login.data.RoleId == 3) ?
                    <div className="flex flex-col gap-4">
                        <Actioncomponent link={'/user-dashboard'} icon={faTachometerAlt} name="Dashboard" />
                        <Actioncomponent link={'/user-dashboard/event'} icon={faCalendar} name="Event" />
                        <Actioncomponent link={'/user-dashboard/ticket'} icon={faTicketAlt} name="Ticket" />
                        <Actioncomponent link={'/user-dashboard/income'} icon={faMoneyBill} name="Income" />
                    </div> :
                    (props.login.data.RoleId == 1) ?
                        <div className="flex flex-col gap-4">
                            <Actioncomponent link={'/admin-dashboard'} icon={faTachometerAlt} name="Dashboard" />
                            <Actioncomponent link={'/admin-dashboard/messages'} icon={faCommentAlt} name="Contact messages" />
                            <Actioncomponent link={'/admin-dashboard/user-roles'} icon={faUsers} name="User roles" />
                            <Actioncomponent link={'/admin-dashboard/clients'} icon={faIndustry} name="Clients" />
                            <Actioncomponent link={'/admin-dashboard/images'} icon={faImages} name="Slide Images" />
                            <Actioncomponent link={'/admin-dashboard/locations'} icon={faLocationArrow} name="Locations" />
                        </div>
                        : <div className="flex flex-col gap-4">
                            <Actioncomponent link={'/buyer-dashboard'} icon={faTachometerAlt} name="Dashboard" />
                            <Actioncomponent link={'/buyer-dashboard/event'} icon={faCalendarAlt} name="Event and Tickets" />
                        </div>

            }
        </div>
    );
}

const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps)(DefaultAuthLeftSidebar);