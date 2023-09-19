import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import EmojisModal from './EmojisModal';
import SearchLocation from './SearchLocation';
import './WhatsOnYourMind.css';
import MapGL, {
  Marker,
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMap } from "react-map-gl";
import OpenGif from './OpenGif';

function Map({ selectedCity, children, onOpenMap }) {
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
          <button
          className="file-close-button"
          onClick={handleCloseMap} 
          >
              <img src="/thin-x-icon.png" alt="" className="x-icon" width="20" height="20" style={{marginBottom:'2px', marginRight:'2px'}}/>
          </button>
      </div>
  </div>
  );
};

function Navigation() {
    const { current: map } = useMap();
  
    map.flyTo({ zoom: 8 });
  
    return <div />;
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
    const [openGif, setOpenGif] = useState(false);
    const [selectedGif, setSelectedGif] = useState();
    const [openMap, setOpenMap] = useState(false);
    const [selectedCity, setSelectedCity] = useState();

    let minHeight;
    
    if (openMap){
      minHeight = 100;
    }
    else{
      minHeight = 300;
    }

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
      setOpenMap(true);
      onClose();
    }

    const handleTextareaChange = (event) => {
      const textarea = event.target;

    // Calculate the new height based on scrollHeight
      textarea.style.height = 'auto'; // Reset to auto height
      const newHeight = Math.max(minHeight, textarea.scrollHeight);
      textarea.style.height = `${newHeight}px`;
        
      setPostContent(textarea.value);
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
        setOpenMap(false);
        setOpenSearch(true);
      };

      const handleGIFClick = () => {
        setOpenGif(true);
      };

      const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
      };

      const handleGifSelect = (gif) =>{
        setSelectedGif(gif);
      }

      const handleOpenMap = (open) =>{
        setOpenMap(open);
      }

      const handleSelectedCity = (city) =>{
        setSelectedCity(city);
      }

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
            <div className={`whats-on-your-mind-popup ${isModalOpen || openGif ?'openModal':''} ${selectedGif ? 'overflowY' : ''}`}>
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
                    {openMap && (
                      <div className={`location-status ${selectedCity.name.split(',')[1].length > 12 ? 'smallerText':''}`}>
                        is in {selectedCity.name.split(',')[0]}, {(selectedCity.name.split(',')[1])}
                      </div>
                    )}
                </div>
                <div className="input-field" style={{marginBottom:'10px'}}>
                <textarea
                    placeholder={`What's on your mind, ${firstnameUser}?`}
                    className="form-control"
                    style={{height: (selectedFiles.length > 0 || openMap || selectedGif) ?'100px':'300px',resize: 'none', fontSize: selectedFiles.length>0 || openMap || selectedGif?'16px':'22px'}}
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
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'15px'}}>
                {selectedGif && 
                  <img key={selectedGif.id} src={selectedGif.src} alt={selectedGif.alt} width='90%'/>
                }
                </div>
                {openMap && selectedFiles.length === 0 && (
                  <Map selectedCity={selectedCity} onOpenMap={handleOpenMap}>
                    <Navigation />
                  </Map>
                )}
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
            {openSearch && <SearchLocation onClose={handleSearchPopupClose} onOpenMap={handleOpenMap} onSelectedCity={handleSelectedCity}/>}
            {openGif && <OpenGif onClose={() => setOpenGif(false)} onSelectGif={handleGifSelect}/>}
        </div>
    )
}

export default WhatsOnYourMind;