import React from 'react';
import PageWrapper from '../components/Layout/UnAuthorizedLayout';
import pay from '../../public/img/s3.jpg';
import sec from '../../public/img/s2.jpg';
import tick from '../../public/img/s1.jpg';
import ussd from '../../public/img/3.png';

function solution(props) {
    return (
        <PageWrapper>
            <div className="p-14">

                <div class="flex flex-col gap-6">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1"><img className="max-h-56 object-cover w-full" src={pay}/></div>
                        <div className="col-span-3">
                            <strong>PAYMENTS</strong>
                            <p> All around payment solution covers with contactless payment, especially online events ticketing QR code pay Payment simple faster and secure, improve operational efficiency Safety in the real of electronic online system events, is the wide variety one priority for organizations and their customers. In today’s world of fast digitalization and hyper-connectivity, we make sure that safety of system in terms of payments are responsive clear and transparency through Bank cards(Master Card,Visa Card ), Mobile Payments(Mobile Money,Airtel Money)otherwise,has become quite an onerous venture due to growing threats of cybercrime.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1"><img className="max-h-56 object-cover w-full" src={ussd}/></div>
                        <div className="col-span-3">
                            <strong>USSD</strong>
                            <p>With the popularization of mobile phones,smart mobile travel is accelerated, which is also conducive to green travel and paperless tickets. This solution solves the management between smart ticket sales and ticket verification and mobile ticketing systems under new demands The combination of intelligent hardware and management system will help the citizen to reduce cost,time, and risks when the fan are paying the ticket without using internet (offline) and within internet (online) </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1"><img className="max-h-56 object-cover w-full" src={sec}/></div>
                        <div className="col-span-3">
                            <strong>SECURITY</strong>
                            <p>For the focus on safety and protection, access control has been established everywhere, such as Festival,Event,Matches. Existing security equipment often causes users a lot of inconvenience because of the loss.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1"><img className="max-h-56 object-cover w-full" src={tick}/></div>
                        <div className="col-span-3">
                            <strong>ELECTRONIC TICKING</strong>
                            <p>Intelligent digital management upgrades and secure payments are unavoidable for all retailers. Based on these common needs, <strong>INTERCORE GROUP</strong> can provide online and offline integrated retail solutions, integrate various functions such as mobile payment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default solution;