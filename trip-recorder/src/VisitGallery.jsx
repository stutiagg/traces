import './VisitGallery.css'
import VisitCard from './VisitCard'
function VisitGallery(){
    return(
        <div className='visit-gallery'>
            <div className='visit-gallery-header'>
            <h2>Visit Gallery</h2>
            <button className='add-visit-btn'>Add Visit</button>
            </div>
            <div className='divider'></div>
            <VisitCard />
            <VisitCard />
            <VisitCard />
        </div>
    )
}

export default VisitGallery