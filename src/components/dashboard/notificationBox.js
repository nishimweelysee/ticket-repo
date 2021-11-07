import moment from 'moment';
import React from 'react';
import { httpRequest } from '../../helpers/httpRequest';
function notificationBox({notification,handleDelete,handleRead}) {
    const bgcolor = notification.read?"":"bg-notreadcolor";
    const update = (evt) => {
        handleDelete(evt);
      };
    const readMsg = (id)=>{
        handleRead(id);
    }
    return (
        <div>
            <div className={`flex flex-col gap-4 p-5 my-3 ${bgcolor}`} style={{
                WebkitBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
                MozBoxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px'
            }
            }>
                <div style={{ color: '#000000' }}>
                    <p>From System</p>
                </div>
                <div style={{ color: '#0930FF' }}>
                    <p>{moment(notification.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
                <div  dangerouslySetInnerHTML={{ __html: notification.message}} style={{ color: '#4D4A4A',wordWrap: 'break-word' }}/>
                <div className="flex justify-end gap-2">
                    {!notification.isRead && <span className="cursor-pointer text-maincolor" onClick={e=>readMsg(notification.id)}>Mark as Read</span>}
                    <button onClick={e=>update(notification.id)} style={{ color: '#0930FF' }}>Delete</button>

                </div>
            </div>
        </div >
    );
}

export default notificationBox;