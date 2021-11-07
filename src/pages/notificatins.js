import React, { useEffect,useState } from 'react';
import NotificationBox from '../components/dashboard/notificationBox';
import PageAuthWrapper from '../components/Layout/AuthorizedLayout';
import { connect } from 'react-redux';
import {httpRequest} from '../helpers/httpRequest'
import cogoToast from 'cogo-toast';
import { Paginator } from 'primereact/paginator';
import { first } from 'lodash-es';

function adminMessagesDashboard(props) {
    const [notifications, setnotifications] = useState([]);
    let [basicFirst,setFirst]=useState(0);
    let [basicRows,setBasicRows]=useState(10);
    const [total,setTotal] = useState(10);

    const getnotifications = async()=>{
        const {response,error}  = await httpRequest('GET',`/notifications?page=${basicFirst}&limit=${basicRows}`,null,{"Authorization":props.login.token});
        if(!error){
            setnotifications([])
            setnotifications(response.data.data.result);
            setTotal(response.data.data.result.number);
        }
    }
    useEffect(()=>{
        getnotifications();
    },[])

    const handleDeleteAll = async()=>{
        const {response,error}  = await httpRequest('DELETE',`/notifications/deleteAll`,null,{"Authorization":props.login.token});
        if(!error){
            getnotifications()
        }
    }
    const handleDeleteOne = async(id)=>{
        const {response,error}  = await httpRequest('DELETE',`/notifications/deleteOne/${id}`,null,{"Authorization":props.login.token});
        if(!error){
            getnotifications()
        }
    }

    const markRead = async(id)=>{
        const {error,response} = await httpRequest("GET",`/notifications/read/${id}`,null,{"Authorization":props.login.token});
        if(!error){
            cogoToast.success("Message Readed");
            getnotifications();
        }
    }

    const onBasicPageChange=(event)=> {
            basicFirst=event.first;
            basicRows=event.rows;
            getnotifications();
    }
    return (
        <PageAuthWrapper >
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }} className="p-4">
                <div className="text-center">
                    <h3>All notification</h3>
                </div>
                <div className="flex flex-row justify-end">
                    <p>{5000} <span className="cursor-pointer text-maincolor" onClick={handleDeleteAll}>Clear All Notifications</span></p>
                </div>
                <div>
                    {
                        notifications.map((c,index)=>{
                            return <NotificationBox handleRead={markRead}  key={index} notification={c} handleDelete={handleDeleteOne}/>
                        })
                    }
                    
                </div>
                <div><Paginator first={basicFirst} rows={basicRows} totalRecords={10000000} rowsPerPageOptions={[10, 20, 30]} onPageChange={onBasicPageChange}></Paginator></div>
            </div>
        </PageAuthWrapper>
    );
}

const mapStateToProps = state => ({
    login: state.login
})


export default connect(mapStateToProps)(adminMessagesDashboard);