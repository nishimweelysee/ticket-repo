import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { httpRequest } from '../../helpers/httpRequest';
import TextInput from '../common/textInput';
import {useHistory} from 'react-router-dom'

const searchevent = (props) => {
    const history = useHistory();
    const [body,setBody] = React.useState({
        search:"",
        place:"",
        date:[new Date(),new Date()]
    })

    const [date1,setDate1]= React.useState(new Date());
    const [date2,setDate2]= React.useState(new Date());

    const handleInput  = (e)=>{
        const prop = e.target;
        setBody({...body,[prop.name]:prop.value});
    }
    const handleSearch = async()=>{
        body.date=[date1,date2];
        const resp = await httpRequest("GET",`/events/byNamePlaceDate?search=${body.search}&place=${body.place}&date=${body.date}`);
        if(!resp.error){
            history.push("/events",{event:resp.response.data.data,search:body});
        }
    }
    return (
        <div className="text-center  mt-2 px-4">
            <div className="mx-5 p-3 text-base  bg-maincolor opacity-90">
                <p className="text-base text-white">Search for an event</p>
                <div className="sm:flex sm:justify-around">
                    <TextInput type="text" value={body.search} name="search" label="looking for" placeholder="Event name, sports ,concerts..."  onInput={handleInput}/>
                    <TextInput type="text" value={body.place} label="in" name="place" placeholder="Stadium, hall ...." onInput={handleInput} />
                    <TextInput type="date" value={date1} label="From" name="date" placeholder="Any date"  onInput={e=> setDate1(e.target.value)}/>
                    <TextInput type="date" value={date2} label="To" name="date" placeholder="Any date"  onInput={e=>setDate2(e.target.value)}/>
                    <button  onClick={handleSearch} className="bg-white w-auto flex justify-end items-center text-blue-500 m-5 py-3 px-5  hover:text-blue-400">
                        <FontAwesomeIcon icon={faSearch}/>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default searchevent;