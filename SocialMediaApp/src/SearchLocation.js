import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './searchLocation.css';

function SearchLocation({onClose, onOpenMap, onSelectedCity}) {
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
                onSelectedCity(selectedCity);
                onOpenMap(true);
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

export default SearchLocation;