import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthPageWraper from '../components/Layout/AuthorizedLayout';
import BuyerViewTickets from './buyerViewTickets';

function buyerTickets(props) {
    return (
        <AuthPageWraper>
            <BuyerViewTickets/>
        </AuthPageWraper>
    );
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps)(buyerTickets);