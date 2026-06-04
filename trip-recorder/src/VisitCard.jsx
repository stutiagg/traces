import './VisitCard.css'
import cover from './assets/picture1.jpg'

function VisitCard(){
    return(
        <div>
        <div className='card-element'>
            <img src= {cover} className='cover-img'/>
            <div className='visit-details'>
                <div>Tokyo Arival</div>
                <div>12 Apr 2026</div>
            </div>
        </div>
        </div>
    )
}

export default VisitCard