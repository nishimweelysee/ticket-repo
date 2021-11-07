import React, { useEffect,useState} from 'react';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import { Link ,useLocation} from 'react-router-dom';
import icon from '../../../public/img/logo.png'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAction } from '../../redux/actions/user/logoutAction';
import "../../styles/Navbar.css";



const DefaultNavbar = (props) => {
    const [openNavbar, setOpenNavbar] = useState(false);
    const location = useLocation();

    const logout = async () => {
        props.logoutAction(props.login.token)
    }
    const redirectFunc = () => {
        const roleId = props.login.data.RoleId;
        switch (roleId) {
            case 1:
                return <Link to="/admin-dashboard" > <p className="text-sm text-white navhover">Dashboard</p> </Link>
            case 2:
                return <Link to="/user-dashboard" > <p className="text-sm text-white navhover">Dashboard</p> </Link>
            case 3:
                return <Link to="/user-dashboard" > <p className="text-sm text-white navhover">Dashboard</p> </Link>
            case 4:
                return <Link to="/buyer-dashboard" > <p className="text-sm text-white navhover">Dashboard</p> </Link>
            case 5:
                return <Link to="/buyer-dashboard" > <p className="text-sm text-white navhover">Dashboard</p> </Link>
        }
    }
    const redirect = (url)=>{
        window.location.href=url;
    }
    return (
        <div style={{backgroundImage: (props.content && props.content.image)?`url("${props.content.image}")`:"inherit",backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}} className="bg-maincolor">
            <Navbar navbar className={props.sticky ? "navbar  navbar-sticky  flex flex-col mtop" : "navbar flex flex-col mtop"}>
                <NavbarContainer >
                    <NavbarWrapper>
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                            <Link to="/" className="flex justify-center p-2 text-center text-white">
                                <img
                                    alt=""
                                    src={icon}
                                    width="200"
                                    className="d-inline-block align-top"
                                />
                            </Link>
                            <NavbarCollapse open={openNavbar}>
                                <Nav>
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center mb-4">
                                        <div className="dropdown">
                                            <button className="dropbtn">Sports</button>
                                            <div className="dropdown-content bg-maincolor">
                                                <Link to="" onClick={e=>redirect("/events?category=FootBall")}
                                                >
                                                    <p className="text-sm text-white navhover">FootBall</p>
                                                </Link>
                                                <Link to="" 
                                                    onClick={e=>redirect("/events?category=VolleyBall")}
                                                >
                                                    <p className="text-sm text-white navhover">VolleyBall</p>
                                                </Link>
                                                <Link
                                                    to="" 
                                                    onClick={e=>redirect("/events?category=BasketBall")}
                                                >
                                                    <p className="text-sm text-white navhover">BasketBall</p>
                                                </Link>
                                                <Link to="" 
                                                    onClick={e=>redirect("/events?category=Criket")}
                                                >
                                                    <p className="text-sm text-white navhover">Criket</p>
                                                </Link>
                                                <Link to="" 
                                                    onClick={e=>redirect("/events?category=HandBall")}
                                                >
                                                    <p className="text-sm text-white navhover">HandBall</p>
                                                </Link>
                                                <Link to="" 
                                                    onClick={e=>redirect("/events?category=Tennis")}
                                                >
                                                    <p className="text-sm text-white navhover">Tennis</p>
                                                </Link>
                                                <Link to="" 
                                                    onClick={e=>redirect("/events?category=Golf")}
                                                >
                                                    <p className="text-sm text-white navhover">Golf</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <Link
                                            to="/events?category=Live Entertainment"
                                        >
                                            <p className="text-sm text-white navhover">Live Entertainment</p>
                                        </Link>
                                        <Link
                                            to="/events?category=Ceremonies"
                                        >
                                            <p className="text-sm text-white navhover">Ceremonies</p>
                                        </Link>
                                    </div>
                                </Nav>
                            </NavbarCollapse>

                        </div>
                        <NavbarToggler
                            onClick={() => setOpenNavbar(!openNavbar)}
                            color="white"
                        />
                    </NavbarWrapper>

                    <NavbarCollapse open={openNavbar}>
                        <Nav>
                            <div className="z-50 flex flex-col gap-4 lg:flex-row lg:items-center">
                                <Link
                                    to="/"
                                >
                                    <p className="text-sm text-white navhover">Home</p>
                                </Link>
                                <Link
                                    to="/events"
                                ><p className="text-sm text-white navhover">Events</p></Link>
                                <Link
                                    to="/solution"
                                ><p className="text-sm text-white navhover">Solution</p></Link>
                                <Link
                                    to="/contact"
                                >
                                    <p className="text-sm text-white navhover">Contact</p>
                                </Link>
                                {
                                    props.login.isLoggedIn ?
                                        <Link to=""
                                            onClick={logout}
                                        >
                                            <p className="text-sm text-white navhover">Logout</p>
                                        </Link> :
                                        <Link
                                            to="/login"
                                        >
                                            <p className="text-sm text-white navhover">Login</p>
                                        </Link>
                                }
                                {
                                    props.login.isLoggedIn ?
                                        redirectFunc() : ""
                                }
                            </div>
                        </Nav>
                    </NavbarCollapse>
                </NavbarContainer>
                <div hidden={props.sticky}>
                    <div className="text-center text-white ">
                        <div className="text-2xl"><h1>{props.content ? props.content.title : ""}</h1></div>
                        <div className="py-3"><p>{props.content ? props.content.text : ""}</p></div>
                    </div>
                </div>
            </Navbar>
            <div ref={props.element}> </div>
        </div>
    );
}
DefaultNavbar.protoTypes = {
    logoutAction: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps, { logoutAction })(DefaultNavbar);