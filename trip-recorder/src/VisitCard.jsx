import { useState } from 'react'
import './VisitCard.css'
import cover from './assets/picture1.jpg'
import { EllipsisVertical } from 'lucide-react'
import VisitActionsMenu from './VisitActionsMenu'

function VisitCard({visit, setTrips, setSelected, selected, trips}){

    const [visitMenu, setVisitMenu] = useState(false);

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


    return(
        <div>
            <div className='card-element'>
                <div className='cover-wrapper'>
                    <img src={visit.cover} className='cover-img'/>
                    <input className='cover-input' type="file" onChange={(e)=>handleChangeCover(e)}/>
                </div>
                <EllipsisVertical className='visit-ellipsis' onClick={(e)=>{
                    e.stopPropagation();
                    setVisitMenu(!visitMenu);
                }}/>
                {visitMenu && (
                    <VisitActionsMenu />
                )}
                <div className='visit-details'>
                    <input value={visit.location} type="text" placeholder='Add Location' onChange={(e)=>handleChangeLocation(e)} />
                    <input value={visit.date} type="text" placeholder='Add Date' onChange={(e)=>handleChangeDate(e)} />
                </div>
            </div>
        </div>
    )}

export default VisitCard