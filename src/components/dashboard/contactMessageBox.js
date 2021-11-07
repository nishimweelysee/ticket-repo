import moment from 'moment';
import React from 'react';
const Mailto = ({ email, subject, body, children }) => {
    return (
        <a style={{ color: '#0930FF' }}  href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
    );
};

function contactMessageBox({contact,handleDelete,handleRead}) {
    const bgcolor = contact.read?"":"bg-notreadcolor";
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
                    <p>{contact.fullName}</p>
                </div>
                <div style={{ color: '#0930FF' }}>
                    <p>{moment(contact.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>
                <div style={{ color: '#4D4A4A' }}>
                    <p>{contact.message}</p>
                </div>
                <div className="flex justify-end gap-2">
                    <Mailto email={contact.email} subject={contact.subject} body="Clean and Type your message">
                        <span onClick={e=>readMsg(contact.id)}>Reply</span>
                    </Mailto>
                    <button onClick={e=>update(contact.id)} style={{ color: '#0930FF' }}>Delete</button>

                </div>
            </div>
        </div >
    );
}

export default contactMessageBox;