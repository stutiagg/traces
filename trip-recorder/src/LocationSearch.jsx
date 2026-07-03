import { useEffect } from "react";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete
} from '@geoapify/react-geocoder-autocomplete';

function LocationSearch({ value, onChange, placeholder }){

    const Key = import.meta.env.VITE_GEOAPIFY_KEY;

  

   const onPlaceSelected = (feature) => {
    onChange({
        target: {
            value: {
                name: feature.properties.formatted,
                lat: feature.properties.lat,
                long: feature.properties.lon
            }
        }
    });
    
};


    // const onSuggestionsChange = (list) => {
    // };


    return(

        <GeoapifyContext apiKey = {Key}>
            <GeoapifyGeocoderAutocomplete
                
                placeholder="Search for an address"
                lang="en"
                addDetails={true}
                placeSelect={onPlaceSelected}
                // suggestionsChange={onSuggestionsChange} 
                />
        </GeoapifyContext>
    ) 
}

export default LocationSearch








// function LocationSearch(){
//     const containerRef = useRef(null);

//     useEffect(()=>{
//         async function init(){
//             const {PlaceAutocompleteElement} = await google.maps.importLibrary("places");

//             const autocomplete = new PlaceAutocompleteElement();

//             containerRef.current.appendChild(autocomplete);
//         }
//         init();

//     }, []);

//     return <div ref={containerRef}>HELLO</div>
    
// }

// export default LocationSearch