import React from 'react';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
import UpdateEvent from '../components/dashboard/userDashboard/updateEvent';

const updateEvent = () => {
    return (
        <AuthPageWrapper>
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }}>
                <UpdateEvent />
            </div>
        </AuthPageWrapper>
    )
}

export default updateEvent;