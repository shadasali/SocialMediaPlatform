import React, {useState} from 'react';
import MapGL, {
    Marker,
    NavigationControl,
    Source,
    Layer,
  } from "react-map-gl";
  import "mapbox-gl/dist/mapbox-gl.css";

function Map({ selectedCity, children, onOpenMap, WOMCall }) {
    // Mapbox API access token
    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  
    // Mapbox map style
    const MAP_STYLE = "mapbox://styles/mapbox/outdoors-v12";
  
    // Mapbox map viewport
    const [viewport, setViewport] = useState({
      latitude: selectedCity ? selectedCity.latitude : 0,
      longitude: selectedCity ? selectedCity.longitude : 0,
    });
  
    const handleCloseMap = () => {
      onOpenMap(false);
    }
  
    return (
      <div>
        <div className='mapPopup'>
          <div style={{ height: "100%", width: "100%" }}>
            <MapGL
              {...viewport}
              mapboxApiAccessToken={MAPBOX_TOKEN}
              mapStyle={MAP_STYLE}
              onViewportChange={setViewport}
            >
              {children}
  
              {selectedCity && (
                <Marker
                  latitude={selectedCity.latitude}
                  longitude={selectedCity.longitude}
                  offsetTop={-20}
                  offsetLeft={-10}
                >
                  <div className="marker"></div>
                  <span className="pulse"></span>
                </Marker>
              )}
              <div style={{ position: "absolute", top: 10, right: 10 }}>
                <NavigationControl />
              </div>
              {selectedCity && (
                <Source
                  id="historical-precipitation"
                  type="raster"
                  tiles={[
                    `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_OPEN_WEATHERMAP_API_KEY}`,
                  ]}
                  tileSize={256}
                >
                  <Layer
                    id="precipitation-layer"
                    type="raster"
                    source="precipitation"
                  />
                </Source>
              )}
            </MapGL>
            {selectedCity && (
              <div
                className="pin"
                style={{
                  transform: "translate(50%, 50%)",
                }}
              ></div>
            )}
          </div>
          {WOMCall &&
            <button
            className="file-close-button"
            onClick={handleCloseMap} 
            >
                <img src="/thin-x-icon.png" alt="" className="x-icon" width="20" height="20" style={{marginBottom:'2px', marginRight:'2px'}}/>
            </button>
            }
        </div>
    </div>
    );
  };

  export default Map;