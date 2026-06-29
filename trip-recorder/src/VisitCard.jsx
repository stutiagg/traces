import { useState } from 'react'
import './VisitCard.css'

import { EllipsisVertical } from 'lucide-react'
import VisitActionsMenu from './VisitActionsMenu'
import LocationSearch from './LocationSearch'

function VisitCard({visit, setTrips, setSelected, selected, trips, isEditing, setIsEditing}){
    
    const [visitMenu, setVisitMenu] = useState(false);

    console.log(visit);

    function handleChangeCover(e){
        const newTrips = trips.map((trip)=>{
            if(trip.id === selected.id){
                const newVisit = trip.visits.map((vis)=>{
                    if(vis.id === visit.id){
                        return {...vis, cover: URL.createObjectURL(e.target.files[0])}
                    }

                    return vis

                })
                return {...trip, visits: newVisit}
            }

            return trip
        })
        setTrips(newTrips);
        const newSelected = newTrips.find((trip) => trip.id === selected.id);
        setSelected(newSelected);
    }

    function handleChangeLocation(e){
        const newTrips = trips.map((trip)=>{
            if(trip.id === selected.id){
                const newVisit = trip.visits.map((vis)=>{
                    if(vis.id === visit.id){
                        return {...vis, location: e.target.value}
                    }

                    return vis

                })
                return {...trip, visits: newVisit}
            }
            return trip;
        })
        console.log(visit);
        setTrips(newTrips);
        const newSelected = newTrips.find((trip) => trip.id === selected.id);
        setSelected(newSelected);
    }

    function handleChangeDate(e){
        const newTrips = trips.map((trip)=>{
            if(trip.id === selected.id){
                const newVisit = trip.visits.map((vis)=>{
                    if(vis.id === visit.id){
                        return {...vis, date: e.target.value}
                    }

                    return vis

                })
                return {...trip, visits: newVisit}
            }
            return trip
        })

        setTrips(newTrips);
        const newSelected = newTrips.find((trip) => trip.id === selected.id);
        setSelected(newSelected);
    }

    function handleSave(){
        setIsEditing(false);
    }


    return(
        <div>
            <div className='card-element'>
                <div className='cover-wrapper'>
                    <img src={visit.cover} className='cover-img'/>
                    {isEditing && <input className='cover-input' type="file" onChange={(e)=>handleChangeCover(e)}/>}
                </div>
                <EllipsisVertical className='visit-ellipsis' onClick={(e)=>{
                    e.stopPropagation();
                    setVisitMenu(!visitMenu);
                }}/>
                {visitMenu && (
                    <VisitActionsMenu setIsEditing={setIsEditing} visit={visit} setTrips={setTrips} trips={trips} setSelected={setSelected} selected={selected}/>
                )}
                <div className='visit-details'>
                    {isEditing ? <LocationSearch value={visit.location.name} type="text" placeholder='Add Location' onChange={(e)=>handleChangeLocation(e)} /> : <div className="field-display">{visit.location.name}</div>}
                    {isEditing ? <input value={visit.date} type="text" placeholder='Add Date' onChange={(e)=>handleChangeDate(e)} /> : <div className="field-display">{visit.date}</div>}
                    {isEditing && <button className="save-btn" onClick={handleSave}>Save</button>}
                </div>
                
            </div>
        </div>
    )}

export default VisitCard