import React, { useEffect, useState } from 'react';
import { Badge } from 'primereact/badge';
import { connect } from 'react-redux';
import { searchUserdata } from '../../../redux/actions/search/searchAction';
import PropTypes from 'prop-types';
import { httpRequest } from '../../../helpers/httpRequest';
import cogoToast from 'cogo-toast';


function notification(props) {
    const [show, setShow] = React.useState(false); 
    const setNotVisible = () => {
        setShow(!show)
    }
    const [data, setData] = useState({});
    const getData = async () => {
        setData(props.searchUser.data)
    }
    useEffect(() => {
        getData();
    }, [[props.searchUser.events]])

    const fetchData = async () => {
        await props.searchUserdata(props.login.token);
    };

    useEffect(() => {
        fetchData();
    }, [])

    const markRead = async(id)=>{
        const {error,response} = await httpRequest("GET",`/notifications/read/${id}`,null,{"Authorization":props.login.token});
        if(!error){
            cogoToast.success("Message Readed");
            fetchData();
        }
    }

    return (
        <div>
            <button onClick={setNotVisible}>
                <i className="pi pi-bell p-mr-4 p-overlay-badge py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart" style={{ fontSize: '2rem', color: "white" }}><Badge style={{ backgroundColor: "red", marginTop: "15px" }} value={data.Notifications ? _.filter(data.Notifications,n=>n.isRead===false).length: ''} ></Badge></i>
            </button>

            <div className="">
                <div className="relative">

                    {show ? <div className="absolute mt-2 bg-white overflow-scroll max-h-96 rounded-md shadow-lg overflow-hidden z-20" style={{ width: "20rem" }}>
                        <div className="py-2">
                            {
                                _.map(_.filter(data.Notifications,n=>n.isRead===false), (n, i) => {
                                    return <a key={i} href="#" className="flex flex-col items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                                        <p style={{wordWrap: 'break-word'}} dangerouslySetInnerHTML={{ __html: n.message}} className="text-gray-600 text-sm mx-2"/>
                                        <p onClick={e=>markRead(n.id)} className="text-maincolor text-right text-sm">Mark as Read</p>
                                    </a>
                                })
                            }
                        </div>
                        <a href="/notifications" className="block bg-gray-800 text-white text-center font-bold py-2">See all notifications</a>
                    </div> : ""
                    }

                </div>
            </div>

        </div>
    );
}

notification.protoTypes = {
    searchUserdata: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        login: state.login,
        searchUser: state.searchUser
    };
}

export default connect(mapStateToProps, { searchUserdata })(notification);