import Nav from '@material-tailwind/react/Nav';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../../public/img/logo.png'
import { InputText } from 'primereact/inputtext';
import UserDropdown from './dropdown/userDropdown';
import { Sidebar } from 'primereact/sidebar';
import DefaultAuthRightSideBar from './DefaultAuthRightSideBar';
import NotificationIcon from './notification/notification';

function DefaultAuthTopSideBar(props) {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [search, setSearch] = useState("");
    const [visibleRight, setVisibleRight] = useState(false);
    return (
        <Navbar navbar className="bg-maincolor">
            <NavbarContainer >
                <NavbarWrapper>
                    <Link to="/" className="flex justify-center p-2 text-center text-white">
                        <img
                            alt=""
                            src={icon}
                            width="200"
                            className="d-inline-block align-top"
                        />
                    </Link>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col gap-4 lg:flex-row  lg:items-center">
                            <div hidden  className="w-full ml-0">
                                <span className="p-input-icon-left w-full">
                                    <i className="pi pi-search" />
                                    <InputText value={search} className="lg:w-80 w-full"  onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
                                </span>
                            </div>
                           
                            <div className="flex text-white lg:text-xl">
                                <NotificationIcon />
                                <p className="p-1 pl-2 left-text-menu">Notifications</p>
                            </div>
                          
                            <div>
                                <UserDropdown onClick={() => setVisibleRight(true)}/>
                            </div>
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                <DefaultAuthRightSideBar />
            </Sidebar>
        </Navbar>
    );
}

export default DefaultAuthTopSideBar;