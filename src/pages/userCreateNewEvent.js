import React from 'react';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import CreateEvent from '../components/dashboard/userDashboard/createEvent';

const newEvent = () => {
    return (
        <AuthPageWrapper>
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
                <CreateEvent />
            </div>
        </AuthPageWrapper>
    )
}

export default newEvent;