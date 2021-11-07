import React from 'react'
import DefaultNavbar from '../navigation/DefaultNavbar'
import DefaultFooter from '../navigation/DefaultFooter'
import useSticky from '../../hooks/useSticky'
import airtel from '../../../public/img/airtel.jpeg';
import mtn from '../../../public/img/mtn1.jpeg';
import mtn2 from '../../../public/img/mtn2.jpeg';
const PageWrapper = (props) => {
    const { isSticky, element } = useSticky()
    return (
        <>
            <div className="h-32 flex justify-evenly w-full bg-gradient-to-b">
                <div className="w-1/2 flex">
                    <img className="h-full" src={airtel} alt=""/>
                </div>
                <div className="flex w-1/2">
                    <img className="h-full" src={mtn} alt="" />
                </div>
            </div>
            <div className="w-full">
                <DefaultNavbar content={props.content} sticky={isSticky} element={element} />
            </div>
            <main>
                {props.children}
            </main>
            <div className="w-full">
                <DefaultFooter />
            </div>
        </>
    )

}

export default PageWrapper;