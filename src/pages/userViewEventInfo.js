import React from 'react';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import ViewEvent from '../components/dashboard/userDashboard/viewEvent';

const viewEvent = () => {
    return (
        <AuthPageWrapper>
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
                <ViewEvent />
            </div>
        </AuthPageWrapper>
    )
}

export default viewEvent;