import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import EmojisModal from './EmojisModal';
import axios from 'axios';
import './WhatsOnYourMind.css';
import MapGL, {
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMap } from "react-map-gl";

function Map({ selectedCity, children }) {
  // Mapbox API access token
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Mapbox map style
  const MAP_STYLE = "mapbox://styles/mapbox/outdoors-v12";

  // Mapbox map viewport
  const [viewport, setViewport] = useState({
    latitude: selectedCity ? selectedCity.latitude : 0,
    longitude: selectedCity ? selectedCity.longitude : 0,
  });

  return (
  <>
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
  </>
  );
};

function Navigation() {
    const { current: map } = useMap();
  
    map.flyTo({ zoom: 8 });
  
    return <div />;
}

function MapPage({selectedCity}) {
  return (
    <div className="mapPopup">
        <Map selectedCity={selectedCity}>
        <Navigation />
        </Map>
    </div>
  );
}
let citySelected;
let mapOpen;
function SearchLocation({onClose}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [cityOptions, setCityOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState();
    const [searchQueryTemp, setSearchQueryTemp] = useState('');
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const fetchCityOptions = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/autocomplete/${encodeURIComponent(searchQueryTemp)}`);
    
            const places = response.data.features.map((feature) => ({
              id: feature.properties.osm_id,
              name: feature.properties.formatted,
              country: feature.properties.country,
            }));
            
            if (selected) setSelected(false);
            else setCityOptions(places);
          } catch (error) {
            console.error('Error fetching city options:', error);
          }
        };
    
        if (searchQueryTemp.length > 0) {
          fetchCityOptions();
        } else {
          setCityOptions([]);
        }
      }, [searchQueryTemp]);

      const handleInputChange = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setCityOptions([]);
        setSearchQueryTemp(inputValue);
      };

      const handleAutoComplete = async (name) => {
        setSelected(true);
    
        setSearchQueryTemp(name);
        setSearchQuery(name);
      };

      useEffect(()=>{
        setSelectedCity(cityOptions.find((city) => city.name === searchQuery));
      },[searchQuery]);

      useEffect(()=>{
        const getCoordinates = async() =>{
            const response = await axios.get(`http://localhost:8000/coordinates/${encodeURIComponent(searchQuery)}`);
            
            const { features } = response.data;

            if (features.length > 0) {
                const [longitude, latitude] = features[0].center;
                selectedCity.latitude = latitude;
                selectedCity.longitude = longitude;
                citySelected=selectedCity;
                mapOpen=true;
                onClose();                
            }
        }
        if (selectedCity)
            getCoordinates();
      },[selectedCity]);

      return(
        <div>
            <div className={`searchLocationPopup`}>
                <button className="close-button" onClick={onClose}>
                    <img src="/x-icon.webp" alt="" className="x-icon" width="25" height="25" />
                </button>
                <div className="autocomplete-container">
                    <label className="input-container">
                        <input
                            type="text"
                            placeholder="Search Location"
                            className="form-control rounded-pill" 
                            value={searchQueryTemp}
                            onChange={handleInputChange}
                        />
                    </label>
            {searchQueryTemp && cityOptions.length > 0 && (
                <div className="autocomplete-results">
                    {cityOptions.map((city) => (
                    <div
                        key={city.id}
                        className="autocomplete-item"
                        onClick={() => handleAutoComplete(city.name)}
                    >
                        {city.name}, {city.country}
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        </div>
      );
}

function WhatsOnYourMind ({onClose, openModal, selection}){
    const avatarURL = localStorage.getItem('avatar');
    const firstnameUser = localStorage.getItem('firstname');
    const lastnameUser = localStorage.getItem('lastname');
    const [postContent, setPostContent] = useState('');
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(openModal);
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [openSearch, setOpenSearch] = useState(false);
    
    useEffect(()=>{
        if(selection){
            let tempType = selection.type;
            
            if (tempType === 'video/quicktime')
                setSelectedFiles([...selectedFiles, {url:URL.createObjectURL(selection), type:'video/mp4'}]);
            else
                setSelectedFiles([...selectedFiles, {url:URL.createObjectURL(selection), type:selection.type}]);
        }
    }, [selection])
    

    const handleClose = () =>{
      mapOpen=false;
      onClose();
    }

    const handleTextareaChange = (event) => {
        setPostContent(event.target.value);
      };


      const handlePhotoVideoClick = () => {
        // Trigger a click event on the file input element
        fileInputRef.current.click();
      };

      const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setSelectedFiles([...selectedFiles, { url: URL.createObjectURL(selectedFile), type: selectedFile.type }]);
        }
      };

      const handleFeelingClick = async () => {
        try {
          // Make an API request with the API key in the headers
          setIsModalOpen(true);
        } catch (error) {
          console.error('Error fetching emojis:', error);
        }
      };

      const handleLocationClick = () =>{
        mapOpen=false;
        setOpenSearch(true);
      };

      const handleGIFClick = () => {

      };

      const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
      };

      const handleRemoveMedia = (indexToRemove) => {
        // Create a copy of the selectedFiles array
        const updatedSelectedFiles = [...selectedFiles];
        
        // Remove the media item at the specified index
        updatedSelectedFiles.splice(indexToRemove, 1);
        
        // Update the state with the new array without the removed media item
        setSelectedFiles(updatedSelectedFiles);
      };      

      const handleSearchPopupClose = () =>{
        setOpenSearch(false);
      }

    return(
        <div>
            <div className={`whats-on-your-mind-popup ${selectedFiles.length > 0? 'fileSelected':''} ${isModalOpen ?'openModal':''}`}>
                <button className="close-button" onClick={handleClose}>
                    <img src="/x-icon.webp" alt="" className="x-icon" width="25" height="25" />
                </button>
                <div className="heading d-flex align-items-center">
                    <div className="whats-on-your-mind-avatar">
                        <Link to="/newUser">
                            <img src={avatarURL} alt="" className="avatar" width="50" height="50" />
                        </Link>
                    </div>
                    <div className="userName" style={{marginLeft:'10px', fontWeight:'bold'}}>
                        {`${firstnameUser} ${lastnameUser}`} 
                    </div>
                    {selectedEmoji && (
                        <div className="feeling-status" style={{marginLeft:'2px', fontWeight:'bold'}}>
                        is {selectedEmoji.character} feeling {selectedEmoji.text}. 
                        </div>
                    )}
                    {mapOpen && (
                      <div style={{marginLeft:'2px', fontWeight:'bold'}}>
                        is in {citySelected.name.split(',')[0]}
                      </div>
                    )}
                </div>
                <div className="input-field" style={{marginBottom:'10px'}}>
                <textarea
                    placeholder={`What's on your mind, ${firstnameUser}?`}
                    className="form-control"
                    style={{height: selectedFiles.length > 0 ?'100px':'300px',resize: 'none', fontSize: selectedFiles.length>0?'16px':'22px',fontWeight:'normal'}}
                    value={postContent}
                    onChange={handleTextareaChange}
                />
                </div>
                <div className="selected-media-container">
                {selectedFiles.length > 0 && (
                    <div className="selected-media">
                        {selectedFiles.map((file, index) => (
                        <div className="selected-media-item" key={index}>
                            {file.type==='video/mp4' || file.type==='video/webm' || file.type==='video/quicktime' ? (
                            <video controls width="101%">
                                <source src={file.url} type={file.type} />
                                Your browser does not support the video tag.
                            </video>
                            ) : (
                            <img src={file.url} alt={`Selected ${index}`} width="101%"/>
                            )}
                            <button
                            className="file-close-button"
                            onClick={() => handleRemoveMedia(index)} 
                            >
                                <img src="/thin-x-icon.png" alt="" className="x-icon" width="20" height="20" style={{marginBottom:'2px', marginRight:'2px'}}/>
                            </button>
                        </div>
                        ))}
                    </div>
                )}
                </div>
                    <div className="add-to-post">
                    <button className="add-to-post-button btn d-flex justify-content-end"
                    style={{border:'white', fontSize:'18px', marginTop:'5px',marginLeft:'10px', fontWeight:'bold'}}>
                        Add to your post
                    </button>
                    <span/>
                    <div className="photo-button" style={{marginRight:'3px'}}>
                        <button className="tooltip-btn btn" style={{border:'gray'}} onClick={handlePhotoVideoClick}>
                            <img src="img-icon.png" alt="pic-Icon" width="30" height="30" style={{marginTop:'4px'}}/>
                            <span className={`tooltip`} style={{fontSize:'13px' }}>Photo/video</span>
                        </button>
                        <input
                        type="file"
                        accept="image/*, video/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        />
                    </div>
                    <div className="feeling-button" style={{marginRight:'3px'}}>
                        <button className="tooltip-btn btn" 
                            style={{border:'gray'}}
                            onClick={handleFeelingClick}>
                            <img src="emji-icon.png" alt="emoji-Icon" width="30" height="30" style={{marginTop:'5px'}}/>
                            <span className={`tooltip`} style={{fontSize:'13px'}}>Feeling</span>
                        </button>
                        
                    </div>
                    
                    <div className="location-button">
                        <button className="tooltip-btn btn" 
                            style={{border:'gray'}}
                            onClick={handleLocationClick}>
                            <img src="icons8-location.gif" alt="location-Icon" width="30" height="30" style={{marginTop:'3.5px'}}/>
                            <span className={`tooltip`} style={{fontSize:'13px'}}>Location</span>
                        </button>
                        
                    </div>
                    <div className={`gif-button`}>
                        <button className='tooltip-btn btn'
                            style={{border:'gray'}}
                            onClick={handleGIFClick}>
                            <img src="giph.png" alt="GIF-Icon" width="30" height="30" style={{marginTop:'3.5px'}}/>
                            <span className={`tooltip`} style={{fontSize:'13px'}}>GIF</span>
                        </button>
                    </div>
                </div>
                <div className="post-button">
                    <button className="post btn btn-primary d-flex justify-content-center" 
                    type="button"
                    style={{ marginTop:'15px',fontSize: '17px', width: '460px' }}
                    disabled={!postContent && selectedFiles.length === 0}>
                        Post
                    </button>
                    <span/>
                </div>
            </div>
            {isModalOpen && <EmojisModal onClose={() => setIsModalOpen(false)} onSelectEmoji={handleEmojiSelect}/>}
            {openSearch && <SearchLocation onClose={handleSearchPopupClose}/>}
            {mapOpen && <MapPage selectedCity={citySelected}/>}
        </div>
    )
}

export default WhatsOnYourMind;