import React from 'react';
import { Switch, Route } from 'react-router-dom';
import landingPage from '../pages/landingPage'
import singleEventPage from '../pages/singleEventPage';
import paymentPage from '../pages/paymentPage';
import contactus from '../pages/contactus';
import searchevents from '../pages/searcheventspage';
import login from '../pages/login';
import register from '../pages/register';
import reset from '../pages/resetPassword';
import changePassword from '../pages/changePassword';
import socialAuthRedirect from '../pages/socialAuthRedirect';
import adminDashboard from '../pages/adminDashboard';
import ProtectedRouter from '../middleware/navGaurd';
import userDashboard from '../pages/userDashboard';
import userEventDashboard from '../pages/userEventDashboard';
import newEvent from '../pages/userCreateNewEvent';
import adminMessagesDashboard from '../pages/adminMessagesDashboard';
import updateEvent from '../pages/userUpdateEvent';
import viewEvent from '../pages/userViewEventInfo';
import userRolesAndPermission from '../pages/userRolesAndPermission';
import userViewTickets from '../pages/userViewTickets';
import buyerDashboard from '../pages/buyerDashboard';
import buyerTickets from '../pages/buyerTickets';
import notificatins from '../pages/notificatins';
import userUpdateProfile from '../pages/userUpdateProfile';
import solution from '../pages/solution';
import verificationPage from '../pages/verificationPage';
import adminClients from '../pages/adminClients';
import adminImages from '../pages/adminSlidingImages';
import adminLocationImages from '../pages/adminLocationImages';
import termsandcond from '../pages/termsandcond';

const Routers = ()=>{
    return(
    <Switch>
        <Route exact path="/" component={landingPage}/>
        <Route exact path="/event" component={singleEventPage}/>
        <Route exact path="/payment" component={paymentPage} />
        <Route exact path="/contact" component={contactus} />
        <Route exact path="/events" component={searchevents}/>
        <Route exact path="/login" component={login}/>
        <Route exact path="/register" component={register}/>
        <Route exact path="/reset" component={reset}/>
        <Route exact path="/solution" component={solution} />
        <ProtectedRouter exact path="/notifications" component={notificatins} allowedRoles={[1,2,3,4,5]}/>
        <ProtectedRouter exact path="/user-profile" component={userUpdateProfile} allowedRoles={[1,2,3,4,5]}/>
        <ProtectedRouter exact path="/user-dashboard" component={userDashboard} allowedRoles={[2,3]}/>
        <ProtectedRouter exact path="/user-dashboard/event" component={userEventDashboard} allowedRoles={[2,3]}/>
        <ProtectedRouter exact path="/user-dashboard/event/new" component={newEvent} allowedRoles={[2,3]}/>
        <ProtectedRouter exact path="/user-dashboard/event/update" component={updateEvent} allowedRoles={[2,3]}/>
        <ProtectedRouter exact path="/user-dashboard/event/view" component={viewEvent} allowedRoles={[2,3]}/>
        <ProtectedRouter exact path="/user-dashboard/ticket" component={userViewTickets} allowedRoles={[2,3]}/>
        <ProtectedRouter exact path="/user-dashboard/income" component={verificationPage} allowedRoles={[2,3]}/>
        <ProtectedRouter exact path="/admin-dashboard" component={adminDashboard} allowedRoles={[1]}/>
        <ProtectedRouter exact path="/admin-dashboard/clients" component={adminClients} allowedRoles={[1]}/>
        <ProtectedRouter exact path="/admin-dashboard/images" component={adminImages} allowedRoles={[1]}/>
        <ProtectedRouter exact path="/admin-dashboard/locations" component={adminLocationImages} allowedRoles={[1]}/>
        <ProtectedRouter exact path="/admin-dashboard/messages" component={adminMessagesDashboard} allowedRoles={[1]}/>
        <ProtectedRouter exact path="/admin-dashboard/user-roles" component={userRolesAndPermission} allowedRoles={[1]}/>
        <ProtectedRouter exact path="/buyer-dashboard" component={buyerDashboard} allowedRoles={[4,5]}/>
        <ProtectedRouter exact path="/buyer-dashboard/event" component={buyerTickets} allowedRoles={[4,5]}/>
        <Route exact path='/changePassword' component={changePassword}/>
        <Route exact path='/socialAuth/success/:token'  component={socialAuthRedirect} />
        <Route exact path='/socialAuth/failure/:action' component={socialAuthRedirect} />
        <Route exact path="/terms" component={termsandcond}/>
    
    </Switch>
    )
}

export default Routers;