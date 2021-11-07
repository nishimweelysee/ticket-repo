import React, { useEffect, useState } from 'react';
import Searchevent from './searchevent';
import Slideshow from './slideImages';
import { httpRequest } from '../../helpers/httpRequest';


const welcomeImages = (props) => {
    const [image, setImage] = useState([])
    const getClients = async () => {
        const { response, error } = await httpRequest("GET", "/image/getAll/slide");
        if (!error) {
            let array =  response.data.data.map(a => a.image);
            console.log(array)
            setImage(array);
        }
    }

    useEffect(() => {
        getClients();
    }, [])
    return (
        <div>
            <div>
                <Slideshow image={image} />
            </div>
            <Searchevent />
        </div>
    );
}

export default welcomeImages;