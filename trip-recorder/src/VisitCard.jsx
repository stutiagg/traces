import { useState } from 'react'
import './VisitCard.css'
import supabase from './supabase.js'

import { EllipsisVertical } from 'lucide-react'
import VisitActionsMenu from './VisitActionsMenu'
import LocationSearch from './LocationSearch'
import { useParams } from 'react-router-dom';
import API from './api';

function VisitCard({visit, setVisits, setSelected, trips, setEditingVisitId, editingVisitId}){

    const { id: tripId } = useParams();
    const [visitMenu, setVisitMenu] = useState(false);
    const [visitUploading, setVisitUploading] = useState(false);
    const isEditing = editingVisitId === visit.id;

    async function handleChangeCover(e) {
       const file = e.target.files[0];

  const fileName = `${Date.now()}-${file.name}`;

  setVisitUploading(true);

  const { error } = await supabase.storage
    .from("visit-covers")
    .upload(fileName, file);

  const { data } = supabase.storage
    .from("visit-covers")
    .getPublicUrl(fileName);


  setVisits(prev =>
    prev.map(vis =>
        vis.id === visit.id
            ? { ...vis, cover: data.publicUrl }
            : vis
    )
);
  setVisitUploading(false);

}

function handleChangeLocation(e) {
  const location = e.target.value;

  if (!location) return;

  setVisits((prev) =>
    prev.map((vis) =>
      vis.id === visit.id
        ? {
            ...vis,
            name: location.name,
            latitude: location.lat,
            longitude: location.long,
          }
        : vis
    )
  );
}

function handleChangeDate(e) {
  setVisits((prev) =>
    prev.map((vis) =>
      vis.id === visit.id
        ? {
            ...vis,
            date: e.target.value,
          }
        : vis
    )
  );
}

    // function handleChangeCover(e){
    //     const newTrips = trips.map((trip)=>{
    //         if(trip.id === selected.id){
    //             const newVisit = trip.visits.map((vis)=>{
    //                 if(vis.id === visit.id){
    //                     return {...vis, cover: URL.createObjectURL(e.target.files[0])}
    //                 }

    //                 return vis

    //             })
    //             return {...trip, visits: newVisit}
    //         }

    //         return trip
    //     })
    //     setTrips(newTrips);
    //     const newSelected = newTrips.find((trip) => trip.id === selected.id);
    //     setSelected(newSelected);
    // }

    // function handleChangeLocation(e){
    //     const newTrips = trips.map((trip)=>{
    //         if(trip.id === selected.id){
    //             const newVisit = trip.visits.map((vis)=>{
    //                 if(vis.id === visit.id){
    //                     return {...vis, location: e.target.value}
    //                 }

    //                 return vis

    //             })
    //             return {...trip, visits: newVisit}
    //         }
    //         return trip;
    //     })
    //     console.log(visit);
    //     setTrips(newTrips);
    //     const newSelected = newTrips.find((trip) => trip.id === selected.id);
    //     setSelected(newSelected);
    // }

    // function handleChangeDate(e){
    //     const newTrips = trips.map((trip)=>{
    //         if(trip.id === selected.id){
    //             const newVisit = trip.visits.map((vis)=>{
    //                 if(vis.id === visit.id){
    //                     return {...vis, date: e.target.value}
    //                 }

    //                 return vis

    //             })
    //             return {...trip, visits: newVisit}
    //         }
    //         return trip
    //     })

    //     setTrips(newTrips);
    //     const newSelected = newTrips.find((trip) => trip.id === selected.id);
    //     setSelected(newSelected);
    // }

    async function handleSave(){
        try{
            const token = localStorage.getItem("token");

            
            let response;
let savedVisit;

if (visit.temp) {
    const { id, temp, ...visitData } = visit;

    response = await API.post(
        `/trips/${tripId}/visits`,
        visitData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
} else {
    const { id, temp, ...visitData } = visit;

    response = await API.put(
        `/trips/${tripId}/visits/${id}`,
        visitData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

savedVisit = response.data[0];

setVisits((prev) =>
    prev.map((vis) =>
        vis.id === visit.id ? savedVisit : vis
    )
);

setEditingVisitId(null);
}catch(err){
            console.log(err.response?.data);
        }
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
                    <VisitActionsMenu setEditingVisitId={setEditingVisitId} visit={visit} setVisits={setVisits}/>
                )}
                <div className='visit-details'>
                    {isEditing ? <LocationSearch value={visit.name} type="text" placeholder='Add Location' onChange={(e)=>handleChangeLocation(e)} /> : <div className="field-display">{visit.name}</div>}
                    {isEditing ? <input value={visit.date} type="text" placeholder='Add Date' onChange={(e)=>handleChangeDate(e)} /> : <div className="field-display">{visit.date}</div>}
                    {isEditing && <button disabled= {visitUploading} className="save-btn" onClick={handleSave}>Save</button>}
                </div>
                
            </div>
        </div>
    )}

export default VisitCard