import VisitGallery from './VisitGallery'

import './TripPage.css'
import header from './assets/picture1.jpg'
function TripPage(){
    return(
        <div  className='trip-page'>
        <div className='header'>
            <img className='header-img' src = {header}></img>
            <div>
                    <div className='trip-title'>
                        <h1>Japan Trip</h1>
                        <div className='divider'></div>
                        <h2 className='dates'>Apr 2026 - June 2026</h2>
                    </div> 
        </div>
        </div>
        <div className='description-box'>
            <h3 className='section-heading'>Description</h3>
            <div className='divider'></div>
            <div className='description'>
            Two unforgettable weeks exploring Japan's blend of tradition and modern life. From the busy streets of Tokyo and the neon lights of Shibuya to the peaceful temples of Kyoto and the breathtaking views around Mount Fuji, every day brought a new adventure. The trip was filled with amazing food, scenic train rides, historic landmarks, and moments that will be remembered for years to come.
            </div>
        </div>

        <VisitGallery />
        </div>
    )
}

export default TripPage