import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './WhatsOnYourMind.css';

function EmojisModal({emojis, onClose, onSelectEmoji}){
    const [searchQuery, setSearchQuery] = useState('');
    const handleBackButton = () => {
        onClose();
      };
      // Mapping between emoji labels and indices in the emojis array
  const emojiLabelsToIndices = {
    happy: 8,
    relaxed: 50,
    loved: 14,
    sad:75,
    thankful:2,
    excited:16,
    'in love':15,
    crazy: 26,
    blessed:13,
    blissful:12,
    fantasic: 3,
    silly: 27,
    festive: 67,
    cool:69,
    tired:97,
    sick:56,
    different:68,
    smart:70,
    confused:73,
    worried:74, 
    shocked:77,
    scared:85,
    cold:62,
    embarrassed:32,
    sleepy:54,
    hot:61,
    curious:34,
    rich:28,
    relieved:47,
    disgusted:58,
    terrified:90,
    'in pain':92,
    disappointed:93,
    angry:99,
    hilarious:89,
    emotional:82,
    nostalgic:82,
    anxious:86,
    grief:88,
    alone:93, 
    proud:29,
    secretive:36,
    motivated:1,
    inquistive:71,
    injured:57,
    amazed:79,
    'wiped out':64,
    heartbroken:81,
    unamused:44,
    guilty:51,
    contagious:55,
    hungry:53,
    skeptical:37,
    bored:39,
    indifferent:38,
    annoyed:44,
    'lied to':48,
    lost:41,
    secluded:42,
    speechless:40,
    awkward:46,
    important:50,
    allergic:60,
    nervous:80,
    flushed:80,
    drunk:63,
    weary:95,
    fuming:98,
    unimportant:93,
    hopeful:649,
    evil:102,
    funny:107,
    scary:110,
    secure:1290,
    graduated:1147,
    engaged:1153,
    strong:452,
    married:128,
    stinky:582,
    nocturnal:598,
    artistic:314,
    lucky:665,
    super:367,
    inspired:1216,
    special:16,
    starstruck:16,
    small:76,
    beautiful:392,
    upset:100,
    irritated:100,
    mischievious:43,
    satisfied:50,
    cute:12,
    goofy: 26,
    obedient:35,
    concerned:37,
    calm:50,
    sarcastic:43,
    hyper:26,
    puzzled:72,
    'pissed off':101,
    surprised:79,
    frustrated:100,
    refreshed:1,
    meh:38,
    better:2,
    indecisive:277,
    suspicious:242,
  };

  // Function to handle user's input in the search bar
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter the emoji labels based on the user's input
  const filteredEmojiLabels = Object.keys(emojiLabelsToIndices).filter((label) =>
    label.includes(searchQuery)
  );

  // Organize emojis into rows with a maximum of three emojis per row
  const rows = [];
  let currentRow = [];
  filteredEmojiLabels.forEach((label) => {
    currentRow.push(label);
    if (currentRow.length === 3) {
      rows.push(currentRow);
      currentRow = [];
    }
  });
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  const handleEmojiClick = (label) => {
    const selectedEmoji = {
      text: label,
      character: emojis[emojiLabelsToIndices[label]].character
    };
    onSelectEmoji(selectedEmoji);
    onClose();
  };
    return(
        <div className='emoji-popup'>
            <div className="header" style={{display:'flex', alignItems:'center'}}>
                <button className="back-button" onClick={handleBackButton}>
                    <div className="back">
                        <img src="/back-icon.png" alt="" className="back-icon" width="25" height="25" />
                    </div>
                </button>
                <h2 style={{fontSize:'20px', fontWeight:'bold', marginLeft:'85px'}}>How are you feeling?</h2>
            </div>
            <hr className="horizontal-line-2" />
            <div className="emoji-searchbox">
                <input
                    type="text"
                    placeholder="&#128269;  Search"
                    className="form-control rounded-pill"  
                    value={searchQuery}
                    onChange={handleSearchInputChange} 
                />
            </div>
            {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
                <div key={rowIndex} className={`row${rowIndex + 1}`} style={{display:'flex'}}>
                {row.map((label) => (
                    <div key={label} className={`${label}-emoji-button`}>
                    <button className="emoji-button"  onClick={() => handleEmojiClick(label)}>
                        <div className="emoji">{emojis[emojiLabelsToIndices[label]].character}</div>
                        <div className="emoji-button-text">{label}</div>
                    </button>
                    <span />
                    </div>
                ))}
                </div>
            ))
            ):(
                <p className="gray-text d-flex justify-content-center" style={{marginTop:'25px'}}>Nothing found</p>
            )}
        </div>
    );
}

function WhatsOnYourMind ({onClose}){
    const avatarURL = localStorage.getItem('avatar');
    const firstnameUser = localStorage.getItem('firstname');
    const lastnameUser = localStorage.getItem('lastname');
    const [postContent, setPostContent] = useState('');
    const fileInputRef = useRef(null);
    const [emojis, setEmojis] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const handleTextareaChange = (event) => {
        setPostContent(event.target.value);
      };


      const handlePhotoVideoClick = () => {
        // Trigger a click event on the file input element
        fileInputRef.current.click();
      };

      const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
      };

      const handleFeelingClick = async () => {
        try {
          // Make an API request with the API key in the headers
          const response = await axios.get('https://emoji-api.com/emojis?access_key=8b56d76139a2c1719aad6045d2a777bb1f336132');
    
          // Extract the emoji list from the response data
          const emojiList = response.data;
          console.log(emojiList);
          setEmojis(emojiList);
          setIsModalOpen(true);
        } catch (error) {
          console.error('Error fetching emojis:', error);
        }
      };

      const handleLocationClick = () =>{

      };

      const handleGIFClick = () => {

      };

      const handleEmojiSelect = (emoji) => {
        setSelectedEmoji(emoji);
      };

    return(
        <div className="whats-on-your-mind-popup">
            <button className="close-button" onClick={onClose}>
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
            </div>
            <div className="input-field">
            <textarea
                placeholder={`What's on your mind, ${firstnameUser}?`}
                className="form-control"
                style={{height:'300px',resize: 'none', fontWeight:'normal'}}
                value={postContent}
                onChange={handleTextareaChange}
            />
            </div>
            <div className="add-to-post" style={{display:'flex'}}>
                <button className="add-to-post-button btn d-flex justify-content-end"
                style={{border:'white', fontSize:'18px',marginTop:'7px', marginLeft:'10px', fontWeight:'bold'}}>
                    Add to your post
                </button>
                <span/>
                <div className="photo-button" style={{marginRight:'3px'}}>
                    <button className="btn" style={{border:'gray'}} onClick={handlePhotoVideoClick}>
                        <img src="img-icon.png" alt="pic-Icon" width="30" height="30" style={{marginTop:'4px'}}/>
                    </button>
                    <span className="tooltip-photo" style={{fontSize:'12px'}}>Photo/video</span>
                    <input
                    type="file"
                    accept="image/*, video/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                    />
                </div>
                <div className="feeling-button" style={{marginRight:'3px'}}>
                    <button className="feeling-button btn" 
                        style={{border:'gray'}}
                        onClick={handleFeelingClick}>
                        <img src="emji-icon.png" alt="emoji-Icon" width="30" height="30" style={{marginTop:'5px'}}/>
                    </button>
                    <span className="tooltip-feel" style={{fontSize:'12px'}}>Feeling</span>
                </div>
                {isModalOpen && <EmojisModal emojis={emojis} onClose={() => setIsModalOpen(false)} onSelectEmoji={handleEmojiSelect}/>}
                <div className="location-button">
                    <button className="location-button btn" 
                        style={{border:'gray'}}
                        onClick={handleLocationClick}>
                        <img src="icons8-location.gif" alt="location-Icon" width="30" height="30" style={{marginTop:'3.5px'}}/>
                    </button>
                    <span className="tooltip-loc" style={{fontSize:'12px'}}>Location</span>
                </div>
                <div className="gif-button">
                    <button className="gif-button btn" 
                        style={{border:'gray'}}
                        onClick={handleGIFClick}>
                        <img src="giph.png" alt="GIF-Icon" width="30" height="30" style={{marginTop:'3.5px'}}/>
                    </button>
                    <span className="tooltip" style={{fontSize:'13px'}}>GIF</span>
                </div>
            </div>
            <div className="post-button">
                <button className="post btn btn-primary d-flex justify-content-center" 
                type="button"
                style={{ marginTop:'15px',fontSize: '17px', width: '460px' }}
                disabled={!postContent}>
                    Post
                </button>
                <span/>
            </div>
        </div>
    )
}

export default WhatsOnYourMind;