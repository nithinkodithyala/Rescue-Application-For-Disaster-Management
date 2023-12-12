import React from 'react';

import MapComponents from './components/MapComponents/MapComponents';
import Weather from './scenes/js/Weather';
import FloodPredict from './scenes/js/App';

function MapAndWeather (){
    return(
        <div className="MapAndWeather-container">
            <div className="map-container">
                <MapComponents/>
            </div>

            <div className="wed-container">
                <FloodPredict/>
            </div>
        </div>
    )
}

export default MapAndWeather;