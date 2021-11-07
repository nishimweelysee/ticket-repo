import React from 'react';
import { connect } from 'react-redux';
import {useLocation } from 'react-router-dom';
import { GalleriaResponsiveDemo } from '../components/common/gallelia';
import NavTabs from '../components/event/selectTicketsTabs';
import PageWrapper from '../components/Layout/UnAuthorizedLayout';


function paymentPage(props) {

    const location = useLocation();
    const event = location.state.event;
    return (
        <PageWrapper content="Hello">
            <GalleriaResponsiveDemo isBuy isEvent event={event} images={event.image} />
            <NavTabs event={event} user={props.login.data} token={props.login.token} />
        </PageWrapper>
    );
}

const mapStateToProps = state => ({
    login: state.login
})

export default connect(mapStateToProps)(paymentPage);