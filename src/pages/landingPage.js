import React from 'react';
import FeaturedEvents from '../components/landingPage/featuredEvents';
import OurClients from '../components/landingPage/ourClients';
import PrevEvents from '../components/landingPage/prevEvents';
import Separateline from '../components/landingPage/separateline';
import ServicesPage from '../components/landingPage/services';
import WelcomeImages from '../components/landingPage/welcomeImages';
import PageWrapper from '../components/Layout/UnAuthorizedLayout';

function landingPage(props) {
    const navData = {
        title: "Let's Live a Happy Life",
        text: "Sell and buy  event tickets here to millions of potential customers today"
    }
    return (
        <PageWrapper content={navData} className="">
            <WelcomeImages />
            <FeaturedEvents />
            <PrevEvents />
            <OurClients />
            <ServicesPage />
        </PageWrapper>
    );
}

export default landingPage;