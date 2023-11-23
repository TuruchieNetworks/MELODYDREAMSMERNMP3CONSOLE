// import React, { useState, useEffect } from 'react';

// const MusicPlayer = () => {
//   const [trackIndex, setTrackIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isRandom, setIsRandom] = useState(false);
//   const [currTime, setCurrTime] = useState('00:00');
//   const [totalDuration, setTotalDuration] = useState('00:00');

//   const musicList = [
//     {
//       img: 'img/faded.png',
//       name: 'Moody Choir Sanctuary',
//       artist: 'Turuchie',
//       music: 'music/MOODY_CHOIR_SANCTUARY.wav',
//     },
//     // Add more tracks as needed
//   ];

//   const currTrack = new Audio();

//   const loadTrack = (index) => {
//     clearInterval(updateTimer);
//     reset();

//     currTrack.src = musicList[index].music;
//     currTrack.load();

//     // Set other properties like track_art, track_name, etc.

//     updateTimer = setInterval(setUpdate, 1000);
//     currTrack.addEventListener('ended', nextTrack);
//     randomBgColor();
//   };

//   const randomBgColor = () => {
//     // Implement your random background color logic
//   };

//   const reset = () => {
//     setCurrTime('00:00');
//     setTotalDuration('00:00');
//     // Set other reset logic
//   };

//   const playPauseTrack = () => {
//     isPlaying ? pauseTrack() : playTrack();
//   };

//   const playTrack = () => {
//     currTrack.play();
//     setIsPlaying(true);
//     // Set other play logic
//   };

//   const pauseTrack = () => {
//     currTrack.pause();
//     setIsPlaying(false);
//     // Set other pause logic
//   };

//   const nextTrack = () => {
//     // Implement your next track logic
//   };

//   // Add other functions like prevTrack, seekTo, setVolume, setUpdate, etc.

//   useEffect(() => {
//     loadTrack(trackIndex);

//     // Cleanup function
//     return () => {
//       clearInterval(updateTimer);
//       currTrack.removeEventListener('ended', nextTrack);
//     };
//   }, [trackIndex]);

//   // return (
//   //   // Your JSX for the music player component
//   // );
// };

// export default MusicPlayer;













































// import { useEffect, useState } from 'react';
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

//   // useEffect(() => {
//   //   const intervalId = setInterval(() => {
//   //     setUpdate();
//   //   }, 1000);

//   //   return () => clearInterval(intervalId); // Clear the interval on unmount
//   // }, [currentTrack]);
//   useEffect(() => {
//     loadTrack(trackIndex);
//     clearInterval(updateTimer); // Uncomment this line
//     reset();

//     // Set interval for updating track information
//     const intervalId = setInterval(() => {
//       setUpdate();
//     }, 1000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [trackIndex]);


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
//   }
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
//     currentTrack.pause();
//     setIsPlaying(false);
//     setPlayPauseBtn('▶');
//   }


//   function stopTrack() {
//     currentTrack.pause();
//     currentTrack.currentTime = 0
//     // reset()
//     setIsPlaying(false);
//     setSeekSlider(0)
//     setPlayPauseBtn('▶');
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

// const setUpdate = () => {
//   console.log('Updating track information...');
//   console.log('Current Time:', currentTrack.currentTime);
//   console.log('Duration:', currentTrack.duration);

//   if (!isNaN(currentTrack.duration)) {
//     const newCurrentTime = currentTrack.currentTime;
//     const newDuration = currentTrack.duration;

//     let seekPoint = (newCurrentTime / newDuration) * 100;
//     setSeekToPoint(seekPoint);

//     // Update seekSlider value
//     setSeekSlider(seekPoint);

//     const newCurrentMinutes = Math.floor(newCurrentTime / 60);
//     const newCurrentSeconds = Math.floor(newCurrentTime - newCurrentMinutes * 60);
//     const newDurationMinutes = Math.floor(newDuration / 60);
//     const newDurationSeconds = Math.floor(newDuration - newDurationMinutes * 60);

//     setCurrentMinutes(newCurrentMinutes);
//     setCurrentSeconds(newCurrentSeconds);
//     setDurationMinutes(newDurationMinutes);
//     setDurationSeconds(newDurationSeconds);

//     // Add leading "0" to minutes and seconds less than 10
//     const formattedCurrentMinutes = newCurrentMinutes < 10 ? `0${newCurrentMinutes}` : newCurrentMinutes;
//     const formattedCurrentSeconds = newCurrentSeconds < 10 ? `0${newCurrentSeconds}` : newCurrentSeconds;
//     const formattedDurationMinutes = newDurationMinutes < 10 ? `0${newDurationMinutes}` : newDurationMinutes;
//     const formattedDurationSeconds = newDurationSeconds < 10 ? `0${newDurationSeconds}` : newDurationSeconds;

//     setCurrentTime(`${formattedCurrentMinutes}:${formattedCurrentSeconds}`);
    
//     // Calculate and update total duration
//     const remainingDurationMinutes = Math.max(0, newDurationMinutes - newCurrentMinutes);
//     const remainingDurationSeconds = Math.max(0, newDurationSeconds - newCurrentSeconds);
//     const formattedRemainingDurationMinutes = remainingDurationMinutes < 10 ? `0${remainingDurationMinutes}` : remainingDurationMinutes;
//     const formattedRemainingDurationSeconds = remainingDurationSeconds < 10 ? `0${remainingDurationSeconds}` : remainingDurationSeconds;

//     setTotalDuration(`${formattedRemainingDurationMinutes}:${formattedRemainingDurationSeconds}`);
//   }
// };

  

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
//       setLogoLeads(`🎶 PLAYING: ${trackIndex + 1} of ${musicList.length}🎶`)
//       setDynamicLeadClasses("lead purple-circle-containe bluebtn")
//     }
//     else if (e.target.innerText === `🎶 PLAYING: ${trackIndex + 1} of ${musicList.length}🎶`) {
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
//                   <div className="leadShowcase dark-card-cover blubt">
//                     <p className="profilegrpbtns leadShowcase" onClick={e => prevTrack(e)}>⏮</p>
//                     {/* <p className="profilegrpbtns leadShowcase" onClick={(e) => playTrack(e)}>{playPauseBtn}</p> */}
//                     <p className="profilegrpbtns leadShowcase" onClick={stopTrack}>🔳</p>
//                     <p className="profilegrpbtns leadShowcase" onClick={playpauseTrack}>{playPauseBtn}</p>
//                     <p className="profilegrpbtns leadShowcase" onClick={nextTrack}>⏭</p>
//                     {/* <p className="profilegrpbtns leadShowcase" onClick={stopTrack}>🔳</p> */}

//                   </div>

//                   <div className="leadShowcase dark-card-cove dark-glo">
//                     <h1 className="leadShowcase dark-glo profilegrpbtns bluebtn">
//                       <p className="leadShowcase bluebtn" > Volume
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