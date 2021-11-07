import React, { useState } from 'react'
import DefaultAuthNavbar from '../navigation/DefaultAuthNavBar'
import DefaultAuthFooter from '../navigation/DefaultAuthFooter'
import DefaultAuthLeftSidebar from '../navigation/DefaultAuthLeftSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Zoom } from '@material-ui/core'
import { Paper } from '@material-ui/core'

const PageAuthWrapper = (props) => {
    const [show, setShow] = useState(true);
    const [classes , setClasses] = useState("");
    const updateClass =(value)=>{
        setClasses(value.data)
        setShow(value.show)
    }
    return (
        <>
            <div className="w-full ">
                <DefaultAuthNavbar />
            </div>
            <main>
                <div className={`dashboard-div  ${classes}`}>
                    <div>
                        <div className="flex justify-end">
                            {
                                show ? <FontAwesomeIcon className="text-maincolor" size="1x" onClick={e=>updateClass({data:"dashboard-div-new",show:false})} icon={faTimes} /> : <FontAwesomeIcon className="text-maincolor" size="1x" onClick={e=>updateClass({data:"",show:true})} icon={faBars} />
                            }
                        </div>
                        <Zoom in={show}>
                            <Paper elevation={4}>
                                <DefaultAuthLeftSidebar />
                            </Paper>
                        </Zoom>
                    </div>

                    <div>
                        {props.children}
                    </div>
                </div>

            </main>
            <div className="w-full ">
                <DefaultAuthFooter />
            </div>
        </>
    )

}

export default PageAuthWrapper;