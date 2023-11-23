// // npm install mongoose multer
// import axios from 'axios';
// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import { v4 as uuid } from 'uuid';
// import multer from 'multer';

// const AddSong = () => {
//     const [placeholderSongTitle, setPlaceholderSongTitle] = useState('🎺 Please Enter Song Title');
//     const [placeholderSongOwner, setPlaceholderSongOwner] = useState('Artist 🎙');
//     const [placeholderSongDescription, setPlaceholderSongDescription] = useState('Please Describe Your Song!');
//     const [songData, setSongData] = useState({});
//     const [mp3Data, setMp3Data] = useState();
//     const history = useHistory();

//     const uploadSong = async () => {
//         // Upload the song
//         console.log('songData', songData);
//         const { title, description, owner } = songData;

//         const storageResponse = await axios.post('http://localhost:8000/api/upload', mp3Data, {
//             headers: { 'Content-Type': 'audio/mp3' },
//         });

//         const createSongInput = {
//             id: uuid(),
//             title,
//             description,
//             owner,
//             filePath: storageResponse.data.filePath,
//             like: 0,
//             isPrivate: false,
//             comments: '',
//         };

//         axios.post('http://localhost:8000/api/songs', createSongInput)
//             .then(res => {
//                 console.log('✔✔✔👌', res.data);
//                 history.push('/');
//             })
//             .catch(err => console.log('🎡🎡🔭', err));
//     };

//     const placeholderhover = (e) => {
//         // ... (unchanged)
//     };

//     return (
//         <div className='landing'>
//             {/* ... (unchanged) */}
//             <div className="bluebtn leadShowcase purple-circle-container padding">
//                 <input
//                     className='textShowcase'
//                     type="file"
//                     accept="audio/mp3"
//                     onChange={(e) => setMp3Data(e.target.files[0])}
//                     style={{ cursor: 'pointer' }}
//                 />
//             </div>
//             <div className="bluebtn margin-big">
//                 <p className="leadShowcase purple-circle-container ">
//                     <button onClick={uploadSong} className='bluebtn leadShowcase dark-profile-overlay dark-card-cover my-1'>
//                         <p className="bluebtn lead">Upload Song!</p>
//                     </button>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default AddSong;

// // install  npm install mongoose multer

// // // Modify Code
// // import axios from 'axios';
// // import React, { useState } from 'react';
// // import { Link, useHistory } from 'react-router-dom';
// // import { v4 as uuid } from 'uuid';
// // import multer from 'multer';

// // const AddSong = () => {
// //     const [placeholderSongTitle, setPlaceholderSongTitle] = useState('🎺 Please Enter Song Title');
// //     const [placeholderSongOwner, setPlaceholderSongOwner] = useState('Artist 🎙');
// //     const [placeholderSongDescription, setPlaceholderSongDescription] = useState('Please Describe Your Song!');
// //     const [songData, setSongData] = useState({});
// //     const [mp3Data, setMp3Data] = useState();
// //     const history = useHistory();

// //     const uploadSong = async () => {
// //         // Upload the song
// //         console.log('songData', songData);
// //         const { title, description, owner } = songData;

// //         const storageResponse = await axios.post('http://localhost:8000/api/upload', mp3Data, {
// //             headers: { 'Content-Type': 'audio/mp3' },
// //         });

// //         const createSongInput = {
// //             id: uuid(),
// //             title,
// //             description,
// //             owner,
// //             filePath: storageResponse.data.filePath,
// //             like: 0,
// //             isPrivate: false,
// //             comments: '',
// //         };

// //         axios.post('http://localhost:8000/api/songs', createSongInput)
// //             .then(res => {
// //                 console.log('✔✔✔👌', res.data);
// //                 history.push('/');
// //             })
// //             .catch(err => console.log('🎡🎡🔭', err));
// //     };

// //     const placeholderhover = (e) => {
// //         // ... (unchanged)
// //     };

// //     return (
// //         <div className='landing'>
// //             {/* ... (unchanged) */}
// //             <div className="bluebtn leadShowcase purple-circle-container padding">
// //                 <input
// //                     className='textShowcase'
// //                     type="file"
// //                     accept="audio/mp3"
// //                     onChange={(e) => setMp3Data(e.target.files[0])}
// //                     style={{ cursor: 'pointer' }}
// //                 />
// //             </div>
// //             <div className="bluebtn margin-big">
// //                 <p className="leadShowcase purple-circle-container ">
// //                     <button onClick={uploadSong} className='bluebtn leadShowcase dark-profile-overlay dark-card-cover my-1'>
// //                         <p className="bluebtn lead">Upload Song!</p>
// //                     </button>
// //                 </p>
// //             </div>
// //         </div>
// //     );
// // };

// // export default AddSong;


// // UPLOAD.JS
// // Create an Express route to handle file upload:
// // Create new file named 'upload.js'
// // const express = require('express');
// // const multer = require('multer');
// // const router = express.Router();

// // const storage = multer.memoryStorage(); // Store file in memory
// // const upload = multer({ storage });

// // router.post('/upload', upload.single('file'), (req, res) => {
// //     const file = req.file;
// //     if (!file) {
// //         return res.status(400).json({ error: 'No file provided' });
// //     }

// //     const filePath = `${uuid()}.mp3`; // Use a unique identifier for the file name
// //     // Save the file to MongoDB or your preferred storage solution
// //     // Example: MongoDB GridFS
// //     // const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
// //     //     bucketName: 'audioFiles',
// //     // });
// //     // const uploadStream = bucket.openUploadStream(filePath);
// //     // uploadStream.end(file.buffer);

// //     // For simplicity, the example just returns the file path
// //     res.json({ filePath });
// // });

// // module.exports = router;



// // MODIFY SERVER FILE TO USE NEW ROUTE
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const path = require('path');
// // const uploadRoute = require('./path-to-upload-route/upload');

// // const app = express();
// // const PORT = process.env.PORT || 8000;

// // // MongoDB connection setup
// // mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());

// // // Routes
// // app.use('/api', uploadRoute); // Add this line to use the upload route

// // // ... (other routes and middleware)

// // // Start the server
// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`);
// // });


















// import { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Landing = () => {
//   const [nowPlaying, setNowPlaying] = useState('PLAYING: x of y');
//   const [trackArt, setTrackArt] = useState({ trackArt: 'track-art' });
//   const [trackName, setTrackName] = useState('track-name');
//   const [trackArtist, setTrackArtist] = useState('track-artist');
//   const [currentTrack, setCurrentTrack] = useState(new Audio());
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [trackIndex, setTrackIndex] = useState(0);
//   // const [playPauseBtn, setPlayPauseBtn] = useState('fa fa-play-circle fa-5x');
//   const [playPauseBtn, setPlayPauseBtn] = useState('▶');
//   const [nextBtn, setNextBtn] = useState('next-track');
//   const [prevBtn, setPrevBtn] = useState('prev-track');
//   const [currentTimePoint, setCurrentTimePoint] = useState(0);
//   const [seekSlider, setSeekSlider] = useState(0);
//   const [seekToPoint, setSeekToPoint] = useState(0);
//   const [seekPosition, setSeekPosition] = useState(0);
//   const [volumeSlider, setVolumeSlider] = useState(99);
//   const [volumePointValue, setVolumePointValue] = useState(currentTrack.volume);
//   const [currentTime, setCurrentTime] = useState('00.00');
//   const [totalDuration, setTotalDuration] = useState('00.00');
//   const [currentMinutes, setCurrentMinutes] = useState(0);
//   const [currentSeconds, setCurrentSeconds] = useState(0);
//   const [durationMinutes, setDurationMinutes] = useState(0);
//   const [durationSeconds, setDurationSeconds] = useState(0);
//   const [updateTimer, setUpdateTimer] = useState(0);
//   const [updateInterval, setUpdateInterval] = useState(0);
//   const [wave, setWave] = useState('wave');
//   const [randomIcon, setRandomIcon] = useState('fa-random');
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isRandom, setIsRandom] = useState(false);
//   const [randomIndex, setRandomIndex] = useState(0);
//   const [audioContainer, setAudioContainer] = useState('audio-container');
//   const [sliderContainer, setSliderContainer] = useState('slider_container');
//   const [progress, setProgress] = useState('current-time');
//   const [user, setUser] = useState(null);
//   const [dynamicLeadClasses, setDynamicLeadClasses] = useState('lead purple-circle-containe');
//   const [logoLeads, setLogoLeads] = useState('🎶MELODY DREAMS🎶');
//   const navigate = useNavigate();
//   const [musicList, setMusicList] = useState([
//     {
//       img: 'img/faded.png',
//       name: 'Moody Choir Sanctuary',
//       artist: 'Turuchie',
//       music: 'music/MOODY_CHOIR_SANCTUARY.wav',
//     },
//   ]);
//   const [audioFileName, setAudioFileName] = useState(musicList[trackIndex].music);

//   useEffect(() => {
//     axios
//       .get('http://localhost:8000/api/users')
//       .then((res) => {
//         setUser(res.data);
//         console.log('🚀🚀🚀', res.data);
//       })
//       .catch((err) => {
//         console.log('🔭🎡🎡', err);
//       });
//   }, []);
//   const updateIntervalRef = useRef(null);

//   useEffect(() => {
//     // Load initial track
//     loadTrack(trackIndex);
  
//     // Set interval for updating track information
//     updateIntervalRef.current = setInterval(() => {
//       // Update track information
//       setUpdate();
//       // Toggle logo between "MELODY DREAMS" and dynamic track information
//       setDynamicLeadClasses((prevClasses) => {
//         if (prevClasses === "lead purple-circle-container bluebtn") {
//           setLogoLeads(`🎶 PLAYING: ${musicList[trackIndex].name} of ${musicList.length}🎶`);
//           return "leadShowcase purple-circle-container";
//         } else {
//           setLogoLeads('🎶MELODY DREAMS🎶');
//           return "lead purple-circle-container bluebtn";
//         }
//       });
//     }, 1000);
  
//     // Cleanup interval on component unmount
//     return () => clearInterval(updateIntervalRef.current);
//   }, [trackIndex]);
  

//   const updateLogo = () => {
//     if (logoLeads === '🎶MELODY DREAMS🎶') {
//       setDynamicLeadClasses("lead purple-circle-container bluebtn");
//       setLogoLeads(`🎶 PLAYING: ${musicList[trackIndex].name} of ${musicList.length}🎶`);
//     } else {
//       setDynamicLeadClasses("leadShowcase purple-circle-container");
//       setLogoLeads('🎶MELODY DREAMS🎶');
//     }
//   };
  
  

//   const loadTrack = (trackIndex) => {
//     clearInterval(updateTimer);
//     reset();

//     // Set the new track information
//     currentTrack.src = musicList[trackIndex].music;
//     setTrackArt({ backgroundImage: `url(${musicList[trackIndex].img})` });
//     setNowPlaying(`Playing music ${trackIndex + 1} of ${musicList.length}`);

//     currentTrack.addEventListener('loadedmetadata', () => {
//       setTotalDuration(currentTrack.duration);
//     });

//     setUpdateTimer(setInterval(setUpdate, 1000));
//     currentTrack.addEventListener('ended', nextTrack);
//   };


//   const reset = () => {
//     setCurrentTime(0);
//     setTotalDuration(currentTrack.duration);
//     setSeekSlider(0);
//     currentTrack.currentTime = 0;
//     updateLogo(); // Add this line
//   };
  
//   function randomTrack() {
//     isRandom ? pauseRandom() : playRandom();
//   }

//   function playRandom() {
//     setIsRandom(true);
//     setRandomIcon('randomActive');
//   }

//   function pauseRandom() {
//     setIsRandom(false);
//     setRandomIcon('fa-random');
//   }

//   function repeatTrack() {
//     setCurrentIndex(trackIndex);
//     loadTrack(trackIndex);
//     playTrack();
//   }

//   const playpauseTrack = () => {
//     isPlaying ? pauseTrack() : playTrack();
//   }

//   function playTrack() {
//     currentTrack.play();
//     setTrackArt('rotate')
//     setIsPlaying(true);
//     setWave('loader')
//     setPlayPauseBtn('⏸');
//   }

//   function pauseTrack() {
//     clearInterval(updateInterval);
//     currentTrack.pause();
//     setIsPlaying(false);
//     setPlayPauseBtn('▶');
//   }


//   function stopTrack() {
//     clearInterval(updateInterval);
//     currentTrack.pause();
//     currentTrack.currentTime = 0;
//     setIsPlaying(false);
//     setSeekSlider(0);
//     setPlayPauseBtn('▶');
//     reset()
//   }

//   function nextTrack() {
//     if (trackIndex < musicList.length - 1 && !isRandom) {
//       setTrackIndex(trackIndex + 1);
//     } else if (isRandom) {
//       setRandomIndex(Math.floor(Math.random() * musicList.length));
//       setTrackIndex(randomIndex);
//     } else {
//       setIsPlaying(true)
//       setTrackIndex(0);
//       loadTrack(trackIndex);
//       playTrack();
//     }
//   }

//   function prevTrack() {
//     setTrackIndex(trackIndex > 0 ? trackIndex - 1 : musicList.length - 1);
//     loadTrack(trackIndex);
//     playTrack();
//   }

//   const seekTo = () => {
//     let newTime = (currentTrack.duration * (seekSlider / 100));
//     currentTrack.currentTime = newTime;
//     setSeekToPoint(newTime);
//   };


//   const setVolume = (e) => {
//     currentTrack.volume = volumeSlider / 100;
//     return setVolumePointValue(volumeSlider / 100);
//   }

//   const setUpdate = () => {
//     console.log('Updating track information...');
//     console.log('Current Time:', currentTrack.currentTime);
//     console.log('Duration:', currentTrack.duration);

//     if (!isNaN(currentTrack.duration)) {
//       const newCurrentTime = currentTrack.currentTime;
//       const newDuration = currentTrack.duration;

//       let seekPoint = (newCurrentTime / newDuration) * 100;
//       setSeekToPoint(seekPoint);

//       // Update seekSlider value
//       setSeekSlider(seekPoint);

//       const newCurrentMinutes = Math.floor(newCurrentTime / 60);
//       const newCurrentSeconds = Math.floor(newCurrentTime - newCurrentMinutes * 60);
//       const newDurationMinutes = Math.floor(newDuration / 60);
//       const newDurationSeconds = Math.floor(newDuration - newDurationMinutes * 60);

//       setCurrentMinutes(newCurrentMinutes);
//       setCurrentSeconds(newCurrentSeconds);
//       setDurationMinutes(newDurationMinutes);
//       setDurationSeconds(newDurationSeconds);

//       // Add leading "0" to minutes and seconds less than 10
//       const formattedCurrentMinutes = newCurrentMinutes < 10 ? newCurrentMinutes : newCurrentMinutes;
//       const formattedCurrentSeconds = newCurrentSeconds < 10 ? `0${newCurrentSeconds}` : newCurrentSeconds;
//       const formattedDurationMinutes = newDurationMinutes < 10 ? `0${newDurationMinutes}` : newDurationMinutes;
//       const formattedDurationSeconds = newDurationSeconds < 10 ? `0${newDurationSeconds}` : newDurationSeconds;

//       setCurrentTime(`${formattedCurrentMinutes}:${formattedCurrentSeconds}`);
//       // Calculate and update total duration
//       const remainingDuration = Math.max(0, newDuration - newCurrentTime);
//       const remainingDurationMinutes = Math.floor(remainingDuration / 60);
//       const remainingDurationSeconds = Math.floor(remainingDuration - remainingDurationMinutes * 60);
//       const formattedRemainingDurationMinutes = remainingDurationMinutes < 10 ? `0${remainingDurationMinutes}` : remainingDurationMinutes;
//       const formattedRemainingDurationSeconds = remainingDurationSeconds < 10 ? `0${remainingDurationSeconds}` : remainingDurationSeconds;

//       setTotalDuration(`${formattedRemainingDurationMinutes}:${formattedRemainingDurationSeconds}`);
//     }
//   };



//   useEffect(() => {
//     axios.get('http://localhost:8000/api/users',
//       { withCredentials: true })
//       .then(res => {
//         // setUser(res.data)
//         console.log('🚀🚀🚀', res.data)
//       })
//       .catch(err => {
//         console.log('🔭🎡🎡', err)
//       });
//   }, []);

//   const landingHover = (e) => {

//     if (e.target.innerText === '🎶MELODY DREAMS🎶') {
//       setLogoLeads(`🎶 PLAYING: ${musicList[trackIndex].name} of ${musicList.length}🎶`)
//       setDynamicLeadClasses("lead purple-circle-containe bluebtn")
//     }
//     else if (e.target.innerText === `🎶 PLAYING: ${musicList[trackIndex].name} of ${musicList.length}🎶`) {
//       setLogoLeads('🎶MELODY DREAMS🎶')
//       setDynamicLeadClasses("leadShowcase purple-circle-container")
//     }
//     return e
//   }
//   return (
//     <section className="landing" style={{ height: '' }}>
//       {/* {user ? */}
//       <div className="profilecontainer profileCoverShowcase">
//         <div className="main-container margin-lg" >
//           <div className="profileShowcase">
//             <div className="dark-card-cove profilegrpbtns leadShowcase bluebtn padding-big" style={{ padding: '10px' }}>
//               <div className="dark-card-cove leadShowcas bluebtn">
//                 <h1 className="leadShowcas dark-glo purple-circle-container">
//                   <Link to='/Landing/' className="bluebtn ">
//                     <h1 className={dynamicLeadClasses} onMouseEnter={e => landingHover(e)}>{logoLeads}</h1>
//                   </Link>
//                 </h1>
//               </div>
//               <div className="profileTitl leadShowcase profilegrpbtns profilecontainer dark-card-cover dark-overlay purple-circle-container bluebt">
//                 <div className="dark-card-cove profilegrpbtns bluebt">
//                   <div className="leadShowcase dark-card-cover blubt"style={{display:"flex",justifyContent:"space-between"}}>
//                     <p className="profilegrpbtns leadShowcase" onClick={e => prevTrack(e)}>⏮</p>
//                     {/* <p className="profilegrpbtns leadShowcase" onClick={(e) => playTrack(e)}>{playPauseBtn}</p> */}
//                     <p className="profilegrpbtns leadShowcase" onClick={stopTrack}>🔳</p>
//                     <p className="profilegrpbtns leadShowcase" onClick={playpauseTrack}>{playPauseBtn}</p>
//                     <p className="profilegrpbtns leadShowcase" onClick={nextTrack}>⏭</p>
//                     {/* <p className="profilegrpbtns leadShowcase" onClick={stopTrack}>🔳</p> */}

//                   </div>

//                   <div className="leadShowcase dark-card-cove dark-glo">
//                     <h1 className="leadShowcase dark-glo profilegrpbtns bluebtn">
//                     <p className="leadShowcase bluebtn" > <i class="fa fa-volume-down" ></i>
//                         <input style={{ cursor: 'pointer' }} type="range" min="1" max="100" value={volumeSlider} className="volume_slider" onChange={(e) => {
//                           setVolumeSlider(e.target.value)
//                           setVolume(volumeSlider)
//                         }}
//                         />
//                       </p>
//                       <div className="leadShowcase bluebtn" >
//                         <p>{currentTime}</p>
//                         <input style={{ cursor: 'pointer' }} type="range" min="1" max="100" value={seekSlider} className="seek_slider" onChange={e => {
//                           setSeekSlider(e.target.value)
//                           seekTo(seekSlider)
//                         }}
//                         />
//                         <p>{totalDuration}</p>
//                       </div>
//                       <p className="leadShowcase bluebtn" >TrackDuration: {totalDuration}</p>
//                     </h1>
//                   </div>
//                 </div>
//               </div>
//               <div className="profilegrpbtns bluebtn purple-circle-container padding bluebt">
//                 <div className="purple-circle-container">
//                   <h1 className="leadShowcase bluebtn profilegrpbtns">
//                     <p className="leadShowcase bluebtn dark-glow action" onMouseEnter={e => landingHover(e)}>{logoLeads}</p>
//                   </h1>
//                 </div>
//                 <div className="box-shadow  profilegrpbtns  purple-circle-container padding">
//                   <div className=" leadShowcase dark-card-cover profilegrpbtns bluebtn">
//                     <Link to='/songs/' className="leadShowcase dark-glow bluebtn ">
//                       <p className="fas fa-skull-crossbones actions texShowcas dar">Track Info</p>
//                     </Link>

//                     <div className="inner-card-showcase dark-overlas">
//                       <div className="leadShowcase purple-circle-container profilegrpbtns">
//                         <p className="profilegrpbtns leadShowcase dark-overlay" onClick={playpauseTrack}>{playPauseBtn}</p>
//                       </div>
//                       <div>
//                         <h2 className="leadShowcase dark-card-cove profilegrpbtn">
//                           <p className="fas fa-bel">
//                             Music by: {musicList[trackIndex].artist}</p>
//                           {/* {console.log(musicList[trackIndex].artist)} */}
//                         </h2>
//                       </div>
//                       <Link to='/AddSong' className="bluebtn profilegrpbtn leadShowcase">
//                         <p className=" action leadShowcase bluebtn"><i className='fas fa-music'> Add New Track!</i></p>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* : <p>Page Loading!!!</p>} */}
//     </section>
//   );
// }

// export default Landing