import React, { useEffect, useState } from 'react';
import Carousel from 'react-grid-carousel'
import { httpRequest } from '../../helpers/httpRequest';

function ourClients(props) {
    const [clients, setClients] = useState([
    ]);

    const getClients = async () => {
        const { response, error } = await httpRequest("GET", "/client/getAll");
        if (!error) {
            let array = _.filter(response.data.data,c=>{return {id:c.id,title:c.title,image:c.image}});
            setClients(array);
        }
    }

    useEffect(() => {
        getClients();
    }, [])

    return (
        <section id="clients" className="section-bg mx-auto  w-full md:p-4 ">
            <div className="container">
                <div className="section-header">
                    <h3>Our Parteners</h3>
                    <p>Meet our happy Parteners</p>
                </div>
                <div>
                    <Carousel cols={4} rows={1} gap={5} responsiveLayout={[{ breakpoint: 1200, cols: 3},{breakpoint: 990, cols: 2 },{breakpoint: 670, rows: 2 } ]} mobileBreakpoint={670} autoplay={3000} loop className="" style={{ visibility: 'visible', animationName: 'fade' }}>
                        {
                            clients.map((client, index) => {
                                return <Carousel.Item key={index}>
                                    <div className="client-logo md:h-full w-full h-48">
                                        <img className="md:object-scale-down object-cover w-full" src={client.image} />
                                    </div>
                                </Carousel.Item>
                            })
                        }
                    </Carousel>
                </div>
            </div>
        </section>
    );
}

export default ourClients;