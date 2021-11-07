import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DataTableExportDemo } from '../components/dashboard/exportData';
import AuthPageWrapper from '../components/Layout/AuthorizedLayout'
function verificationPage(props) {
    return (
        <AuthPageWrapper>
            <div className="bg-white mx-2 mt-3 rounded-t-2xl">
                <div className="text-center text-2xl underline font-bold">Generate Your Report</div>
                <div>
                <DataTableExportDemo token={props.login.token} id={props.login.data.id} />
                </div>
            </div>
        </AuthPageWrapper>
    );
}

const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps)(verificationPage);