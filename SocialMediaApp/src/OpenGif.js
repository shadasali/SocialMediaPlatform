import React, {useState, useEffect} from 'react';
import './OpenGif.css';

function OpenGif ({onClose, onSelectGif}){
    const [searchQuery, setSearchQuery] = useState('');
    const [gifs, setGifs] = useState([]);
  
    useEffect(() => {
      // Define your GIPHY API key
      const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
  
      // Make sure the searchQuery is not empty
      if (searchQuery.trim() !== '') {
        // Fetch GIFs from GIPHY based on the searchQuery
        fetch(`https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(searchQuery)}&api_key=${apiKey}`)
          .then((response) => response.json())
          .then((data) => {
            // Update the state with the fetched GIFs
            setGifs(data.data);
          })
          .catch((error) => {
            console.error('Error fetching GIFs:', error);
          });
      } else {
        // If searchQuery is empty, clear the GIFs
        setGifs([]);
      }
    }, [searchQuery]);
  
    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    }
    
    const handleGifClick = (gif) => {
        const selectedGif = {
          id: gif.id,
          src: gif.images.fixed_height.url,
          alt: gif.title,
        };
        onSelectGif(selectedGif); // Call your function to handle the selected GIF
        onClose(); // Close the GIF modal or perform any other necessary actions
      };

    return(
      <div className='gif-modal'>
        <div className="header" style={{display:'flex', alignItems:'center'}}>
            <h2 style={{fontSize:'20px', fontWeight:'bold'}}>Gifs Page</h2>
        </div>
        <hr className="horizontal-line-2" />
        <div className='present-gifs-container'>
          <button className="close-button" onClick={onClose}>
              <img src="/x-icon.webp" alt="" className="x-icon" width="25" height="25" />
          </button>
            <label className="input-container" style={{marginBottom:'15px'}}>
              <input
                  type="text"
                  placeholder="Search"
                  className="form-control rounded-pill" 
                  value={searchQuery}
                  onChange={handleInputChange}
              />
            </label>
        </div>
        <div className="gif-container">  
          {gifs.map((gif) => (
              <button key={gif.id} style={{border:'none', background:'none', marginRight:'10px'}} onClick={() => handleGifClick(gif)}>
                  <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
              </button>
          ))}
        </div>
      </div>
    );
  }

  export default OpenGif;