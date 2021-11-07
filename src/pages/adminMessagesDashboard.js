import React, { useEffect,useState } from 'react';
import ContactMessageBox from '../components/dashboard/contactMessageBox';
import PageAuthWrapper from '../components/Layout/AuthorizedLayout';
import { connect } from 'react-redux';
import {httpRequest} from '../helpers/httpRequest'
import cogoToast from 'cogo-toast';
import { Paginator } from 'primereact/paginator';
import { first } from 'lodash-es';

function adminMessagesDashboard(props) {
    const [contacts, setContacts] = useState([]);
    let [basicFirst,setFirst]=useState(0);
    let [basicRows,setBasicRows]=useState(10);
    const [total,setTotal] = useState(10);

    const getContacts = async()=>{
        const {response,error}  = await httpRequest('GET',`/contacts?page=${basicFirst}&limit=${basicRows}`,null,{"Authorization":props.login.token});
        if(!error){
            setContacts(response.data.data.result);
            setTotal(response.data.data.result.number);
        }
    }
    const handleRead = async(id)=>{
        const resp = await httpRequest("PUT",`/contacts/read/${id}`,{read:true},{"Authorization":props.login.token});
        if(!resp.error){
            getContacts();
            cogoToast.success('Message Readed');
        }
    }
    useEffect(()=>{
        getContacts();
    },[])

    const handleDelete = async(id)=>{
        const {response,error}  = await httpRequest('DELETE',`/contacts/delete/${id}`,null,{"Authorization":props.login.token});
        if(!error){
            getContacts()
        }
    }
    const onBasicPageChange=(event)=> {
            basicFirst=event.first;
            basicRows=event.rows;
            getContacts();
    }
    return (
        <PageAuthWrapper >
            <div style={{ borderLeft: '2px solid rgb(119, 119, 243)' }} className="p-4">
                <div className="text-center">
                    <h3>Feedback from our clients</h3>
                </div>
                <div>
                    {
                        contacts.map((c,index)=>{
                            return <ContactMessageBox  key={index} contact={c} handleRead={handleRead} handleDelete={handleDelete}/>
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