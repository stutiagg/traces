import VisitGallery from './VisitGallery'
import { useState } from 'react';

import './TripPage.css'
import header from './assets/picture1.jpg'
function TripPage({selected, setSelected, trips, setTrips}){

    const [desEdit, setDesEdit] = useState(true);


    return(
        <div  className='trip-page'>
        <div className='header'>
            <img className='header-img' src = {selected.cover}></img>
            <div>
                    <div className='trip-title'>
                        <h1>{selected.name}</h1>
                        <div className='divider'></div>
                        <h2 className='dates'>{selected.start} - {selected.end}</h2>
                    </div> 
        </div>
        </div>
        <div className='description-box'>
            <h3 className='section-heading'>Description</h3>
            <div className='divider'></div>

            {desEdit && (<input type="text" placeholder='Enter the Description' onKeyDown={(e)=> {if(e.key=== "Enter"){setDesEdit(false)}}}  value={(trips.map((trip) => {if(trip === selected){return trip}})).description} onChange={(e)=> setTrips([...trips, {...(trips.map((trip) => {if(trip === selected){return trip}})), description: e.target.value}])}/>)
}
            {!desEdit && (<div className='description'>
                {selected.description}
            </div>)}
        </div>

        <VisitGallery />
        </div>
    )
}

export default TripPage