import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './EmojisModal.css';

let emojiCache;

function EmojisModal({onClose, onSelectEmoji}){
    const [searchQuery, setSearchQuery] = useState('');
    const [emojis, setEmojis] = useState([]);

    useEffect(()=>{
        if (emojiCache){
            setEmojis(emojiCache)
        }
        else{
            const loadEmojis = async () =>{
                const response = await axios.get('https://emoji-api.com/emojis?access_key=8b56d76139a2c1719aad6045d2a777bb1f336132');

                const emojiList = response.data;
                emojiCache=emojiList;
                setEmojis(emojiList);
            }
        loadEmojis();
        }
    },[])

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
            { emojis.length > 0? ( 
            rows.length > 0 ? (
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
            )):(
              <div className="d-flex justify-content-center" style={{marginTop:'15px'}}>
                <img src="loading.gif" alt="" className="loading" width="35" height="35"></img>
              </div>
            )}
        </div>
    );
}

export default EmojisModal;