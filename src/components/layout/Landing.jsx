import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
  const [nowPlaying, setNowPlaying] = useState('PLAYING: x of y');
  const [trackArt, setTrackArt] = useState({ trackArt: 'track-art' });
  const [trackName, setTrackName] = useState('track-name');
  const [trackArtist, setTrackArtist] = useState('track-artist');
  const [currentTrack, setCurrentTrack] = useState(new Audio());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  // const [playPauseBtn, setPlayPauseBtn] = useState('fa fa-play-circle fa-5x');
  const [playPauseBtn, setPlayPauseBtn] = useState('▶');
  const [nextBtn, setNextBtn] = useState('next-track');
  const [prevBtn, setPrevBtn] = useState('prev-track');
  const [currentTimePoint, setCurrentTimePoint] = useState(0);
  const [seekSlider, setSeekSlider] = useState(0);
  const [seekToPoint, setSeekToPoint] = useState(0);
  const [seekPosition, setSeekPosition] = useState(0);
  const [volumeSlider, setVolumeSlider] = useState(99);
  const [volumePointValue, setVolumePointValue] = useState(currentTrack.volume);
  const [currentTime, setCurrentTime] = useState('00.00');
  const [totalDuration, setTotalDuration] = useState('00.00');
  const [totalDynamicDuration, setTotalDynamicDuration] = useState('00.00');
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [updateTimer, setUpdateTimer] = useState(0);
  const [updateInterval, setUpdateInterval] = useState(0);
  const [wave, setWave] = useState('wave');
  const [randomIcon, setRandomIcon] = useState('fa-random');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const [audioContainer, setAudioContainer] = useState('audio-container');
  const [sliderContainer, setSliderContainer] = useState('slider_container');
  const [progress, setProgress] = useState('current-time');
  const [user, setUser] = useState(null);
  const [dynamicLeadClasses, setDynamicLeadClasses] = useState('lead purple-circle-containe');
  const [logoLeads, setLogoLeads] = useState('🎶MELODY DREAMS🎶');
  const [dynamicContents, setDynamicContents] = useState("leadShowcase");
  const [dynamicMessage, setDynamicMessage] = useState(totalDuration)
  const [cardClass, setCardClass] = useState("dark-glow bluebtn box-shadow")
  const navigate = useNavigate();
  const [musicList, setMusicList] = useState([
    {
      img: 'img/faded.png',
      name: 'Moody Choir Sanctuary',
      artist: 'Turuchie',
      music: 'music/MOODY_CHOIR_SANCTUARY.mp3',
    },
  ]);
  const [audioFileName, setAudioFileName] = useState(musicList[trackIndex].music);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users',
      { withCredentials: true })
      .then(res => {
        setUser(res.data.users)
        console.log('🚀🚀🚀', res.data.users)
      })
      .catch(err => {
        console.log('🔭🎡🎡', err)
      });
  }, []);

  const setUpdate = () => {
    console.log('Updating track information...');
    console.log('Current Time:', currentTrack.currentTime);
    console.log('Duration:', currentTrack.duration);

    if (!isNaN(currentTrack.duration)) {
      const newCurrentTime = currentTrack.currentTime;
      const newDuration = currentTrack.duration;

      // let seekPoint = (newCurrentTime / newDuration) * 100;
      setSeekToPoint((newCurrentTime / newDuration) * 100);

      // Update seekSlider value
      setSeekSlider((newCurrentTime / newDuration) * 100);

      const newCurrentMinutes = Math.floor(newCurrentTime / 60);
      const newCurrentSeconds = Math.floor(newCurrentTime - newCurrentMinutes * 60);
      const newDurationMinutes = Math.floor(newDuration / 60);
      const newDurationSeconds = Math.floor(newDuration - newDurationMinutes * 60);

      setCurrentMinutes(newCurrentMinutes);
      setCurrentSeconds(newCurrentSeconds);
      setDurationMinutes(newDurationMinutes);
      setDurationSeconds(newDurationSeconds);

      // Add leading "0" to minutes and seconds less than 10
      const formattedCurrentMinutes = newCurrentMinutes < 10 ? newCurrentMinutes : newCurrentMinutes;
      const formattedCurrentSeconds = newCurrentSeconds < 10 ? `0${newCurrentSeconds}` : newCurrentSeconds;
      const formattedDurationMinutes = newDurationMinutes < 10 ? `${newDurationMinutes}` : newDurationMinutes;
      const formattedDurationSeconds = newDurationSeconds < 10 ? `0${newDurationSeconds}` : newDurationSeconds;

      setCurrentTime(`${formattedCurrentMinutes}:${formattedCurrentSeconds}`);
      // Calculate and update total duration
      const remainingDuration = Math.max(0, newDuration - newCurrentTime);
      const remainingDurationMinutes = Math.floor(remainingDuration / 60);
      const remainingDurationSeconds = Math.floor(remainingDuration - remainingDurationMinutes * 60);
      const formattedRemainingDurationMinutes = remainingDurationMinutes < 10 ? `${remainingDurationMinutes}` : remainingDurationMinutes;
      const formattedRemainingDurationSeconds = remainingDurationSeconds < 10 ? `0${remainingDurationSeconds}` : remainingDurationSeconds;

      setTotalDuration(`${formattedRemainingDurationMinutes}:${formattedRemainingDurationSeconds}`);
      return `${formattedRemainingDurationMinutes}:${formattedRemainingDurationSeconds}`
    }
  };

  useEffect(() => {
    // Load initial track
    loadTrack(trackIndex);

    // Set interval for updating track information
    const intervalId = setInterval(() => {
      // Update track information
      setUpdate();
      // Toggle logo between "MELODY DREAMS" and dynamic track information
      setDynamicLeadClasses((prevClasses) => {
        if (prevClasses === "lead purple-circle-container bluebtn") {
          setLogoLeads(`🎶 PLAYING: ${musicList[trackIndex].name}!`);
          // console.log(logoLeads)by ${musicList[trackIndex].artist}
          return "leadShowcase purple-circle-container bluebtn";
        }
        if (prevClasses === "leadShowcase purple-circle-container bluebtn") {
        setLogoLeads(`🎶MUSIC FROM: ${musicList[trackIndex].artist} Playlist`);
        console.log(logoLeads)
        return 'leadShowcase, bluebtn dark-glow'
        }
        else {
          setLogoLeads('🎶Melody Dreams Media🎶');
          // console.log(logoLeads)
          return "lead purple-circle-container bluebtn";
        }
      })
      updateInfoCard()
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [trackIndex]);

  const updateInfoCard = () => {
    setDynamicContents((prevClasses) => {
      setTotalDuration(convertTime(currentTrack.duration))
      if (prevClasses === "dark-glow bluebtn box-shadow") {
        setDynamicMessage(`🎶NOW PLAYING: ${musicList[trackIndex].name} by ${musicList[trackIndex].artist}🎶`)
        prevClasses = "dark-glow bluebtn box-shadow"
        return "leadShowcase bluebtn dark-glow";
      }
      console.log(dynamicMessage)
      if (prevClasses) {
        setDynamicMessage(`Time Remaining: ${totalDuration}`)
        setCardClass("leadShowcase purple-circle-container bluebtn");
      }
      if (prevClasses) {
        setDynamicMessage(`Music from: ${musicList[trackIndex].artist} Playlist`)
        setCardClass("lead purple-circle-container bluebtn");
      } else {
        setDynamicMessage(`Track Name: ${musicList[trackIndex].name}!`)
        setCardClass("dark-card-cover bluebtn");
        return "dark-glow bluebtn box-shadow"
      }
    });
  }

  const loadTrack = () => {
    clearInterval(updateTimer);
    convertTime(currentTrack.duration)
    reset();

    // Set the new track information
    currentTrack.src = musicList[trackIndex].music;
    setTrackArt({ backgroundImage: `url(${musicList[trackIndex].img})` });
    setNowPlaying(`Playing music ${trackIndex + 1} of ${musicList.length}`);

    if (!isNaN(currentTrack.duration)) {
      const newCurrentTime = currentTrack.currentTime;
      const newDuration = currentTrack.duration;

      // let seekPoint = (newCurrentTime / newDuration) * 100;
      setSeekToPoint((newCurrentTime / newDuration) * 100);

      // Update seekSlider value
      setSeekSlider((newCurrentTime / newDuration) * 100);

      const newCurrentMinutes = Math.floor(newCurrentTime / 60);
      const newCurrentSeconds = Math.floor(newCurrentTime - newCurrentMinutes * 60);
      const newDurationMinutes = Math.floor(newDuration / 60);
      const newDurationSeconds = Math.floor(newDuration - newDurationMinutes * 60);

      setCurrentMinutes(newCurrentMinutes);
      setCurrentSeconds(newCurrentSeconds);
      setDurationMinutes(newDurationMinutes);
      setDurationSeconds(newDurationSeconds);

      // Add leading "0" to minutes and seconds less than 10
      const formattedCurrentMinutes = newCurrentMinutes < 10 ? newCurrentMinutes : newCurrentMinutes;
      const formattedCurrentSeconds = newCurrentSeconds < 10 ? `0${newCurrentSeconds}` : newCurrentSeconds;
      const formattedDurationMinutes = newDurationMinutes < 10 ? `${newDurationMinutes}` : newDurationMinutes;
      const formattedDurationSeconds = newDurationSeconds < 10 ? `0${newDurationSeconds}` : newDurationSeconds;

      setCurrentTime(`${formattedCurrentMinutes}:${formattedCurrentSeconds}`);
      // Calculate and update total duration
      const remainingDuration = Math.max(0, newDuration - newCurrentTime);
      const remainingDurationMinutes = Math.floor(remainingDuration / 60);
      const remainingDurationSeconds = Math.floor(remainingDuration - remainingDurationMinutes * 60);
      const formattedRemainingDurationMinutes = remainingDurationMinutes < 10 ? `${remainingDurationMinutes}` : remainingDurationMinutes;
      const formattedRemainingDurationSeconds = remainingDurationSeconds < 10 ? `0${remainingDurationSeconds}` : remainingDurationSeconds;

      setTotalDuration(`${formattedRemainingDurationMinutes}:${formattedRemainingDurationSeconds}`)
      }
      currentTrack.addEventListener('loadedmetadata', () => {
        return totalDuration
      })

      setUpdateTimer(setInterval(setUpdate, 1000));
      currentTrack.addEventListener('ended', nextTrack);
    
  }

  const convertTime = () => {
    if (!isNaN(currentTrack.duration)) {
      const newCurrentTime = currentTrack.currentTime;
      const newDuration = currentTrack.duration;

      // let seekPoint = (newCurrentTime / newDuration) * 100;
      setSeekToPoint((newCurrentTime / newDuration) * 100);

      // Update seekSlider value
      setSeekSlider((newCurrentTime / newDuration) * 100);

      const newCurrentMinutes = Math.floor(newCurrentTime / 60);
      const newCurrentSeconds = Math.floor(newCurrentTime - newCurrentMinutes * 60);
      const newDurationMinutes = Math.floor(newDuration / 60);
      const newDurationSeconds = Math.floor(newDuration - newDurationMinutes * 60);

      setCurrentMinutes(newCurrentMinutes);
      setCurrentSeconds(newCurrentSeconds);
      setDurationMinutes(newDurationMinutes);
      setDurationSeconds(newDurationSeconds);

      // Add leading "0" to minutes and seconds less than 10
      const formattedCurrentMinutes = newCurrentMinutes < 10 ? newCurrentMinutes : newCurrentMinutes;
      const formattedCurrentSeconds = newCurrentSeconds < 10 ? `0${newCurrentSeconds}` : newCurrentSeconds;
      const formattedDurationMinutes = newDurationMinutes < 10 ? `${newDurationMinutes}` : newDurationMinutes;
      const formattedDurationSeconds = newDurationSeconds < 10 ? `0${newDurationSeconds}` : newDurationSeconds;

      setCurrentTime(`${formattedCurrentMinutes}:${formattedCurrentSeconds}`);
      // Calculate and update total duration
      const remainingDuration = Math.max(0, newDuration - newCurrentTime);
      const remainingDurationMinutes = Math.floor(remainingDuration / 60);
      const remainingDurationSeconds = Math.floor(remainingDuration - remainingDurationMinutes * 60);
      const formattedRemainingDurationMinutes = remainingDurationMinutes < 10 ? `${remainingDurationMinutes}` : remainingDurationMinutes;
      const formattedRemainingDurationSeconds = remainingDurationSeconds < 10 ? `0${remainingDurationSeconds}` : remainingDurationSeconds;

      setTotalDuration(`${formattedRemainingDurationMinutes}:${formattedRemainingDurationSeconds}`)
      return `${formattedRemainingDurationMinutes}:${formattedRemainingDurationSeconds}`
    }
  }

  const reset = () => {
    setCurrentTime(0);
    setTotalDuration(currentTrack.duration)
    updateInfoCard(); // Add this line
    setSeekSlider(0);
  }

  const randomTrack = () => {
    isRandom ? pauseRandom() : playRandom();
  }

  const playRandom = () => {
    setIsRandom(true);
    setRandomIcon('randomActive');
  }

  const pauseRandom = () => {
    setIsRandom(false);
    setRandomIcon('fa-random');
  }

  const repeatTrack = () => {
    setCurrentIndex(trackIndex);
    loadTrack(trackIndex);
    playTrack();
  }

  const playpauseTrack = () => {
    isPlaying ? pauseTrack() : playTrack();
  }

  const playTrack = () => {
    currentTrack.play();
    setTrackArt('rotate')
    setIsPlaying(true);
    setWave('loader')
    setPlayPauseBtn('⏸');
  }

  const pauseTrack = () => {
    clearInterval(updateInterval);
    currentTrack.pause();
    setIsPlaying(false);
    setPlayPauseBtn('▶');
  }


  const stopTrack = () => {
    clearInterval(updateInterval);
    currentTrack.pause();
    currentTrack.currentTime = 0;
    setIsPlaying(false);
    setSeekSlider(0);
    setPlayPauseBtn('▶');
    reset()
  }

  const nextTrack = () => {
    if (trackIndex < musicList.length - 1 && !isRandom) {
      setTrackIndex(trackIndex + 1);
    } else if (isRandom) {
      setRandomIndex(Math.floor(Math.random() * musicList.length));
      setTrackIndex(randomIndex);
    } else {
      setIsPlaying(true)
      setTrackIndex(0);
      loadTrack(trackIndex);
      playTrack();
    }
  }

  const prevTrack = () => {
    setTrackIndex(trackIndex > 0 ? trackIndex - 1 : musicList.length - 1);
    loadTrack(trackIndex);
    playTrack();
  }

  const seekTo = () => {
    let newTime = (currentTrack.duration * (seekSlider / 100));
    currentTrack.currentTime = newTime;
    setSeekToPoint(newTime);
  };


  const setVolume = (e) => {
    currentTrack.volume = volumeSlider / 100;
    return setVolumePointValue(volumeSlider / 100);
  }

  const landingHover = (e) => {

    if (e.target.innerText === '🎶MELODY DREAMS🎶') {
      setLogoLeads(`🎶 PLAYING: ${trackIndex + 1} of ${musicList.length}🎶`)
      setDynamicLeadClasses("lead purple-circle-containe bluebtn")
    }
    else if (e.target.innerText === `🎶 PLAYING: ${trackIndex + 1} of ${musicList.length}🎶`) {
      setLogoLeads('🎶MELODY DREAMS🎶')
      setDynamicLeadClasses("leadShowcase purple-circle-container")
    }
    return e
  }
  return (
    <section className="landing" style={{ height: '' }}>
      {user ?
      <div className="profilecontainer profileCoverShowcase">
        <div className="main-container" >
          <div className="profileShowcase">
            <div className="dark-card-cove profilegrpbtns leadShowcase bluebtn padding" style={{ padding: '15px' }}>
              <div className="dark-card-cove leadShowcas bluebtn">
                <h1 className="leadShowcas dark-glo purple-circle-container">
                  <Link to='/Landing/' className={cardClass}>
                    <h1 className={dynamicLeadClasses} onMouseEnter={e => landingHover(e)}>{logoLeads}</h1>
                  </Link>
                </h1>
              </div>
              <div className="profileTitl leadShowcas profilegrpbtns profilecontainer dark-card-cove dark-overla purple-circle-container bluebtn">
                <div className="dark-card-cove profilegrpbtn bluebt">
                  <div className="leadShowcase dark-card-cover" style={{ display: "flex", justifyContent: "space-between" }}>
                    <p className="profilegrpbtns leadShowcase" onClick={e => prevTrack(e)}>⏮</p>
                    {/* <p className="profilegrpbtns leadShowcase" onClick={(e) => playTrack(e)}>{playPauseBtn}</p> */}
                    <p className="profilegrpbtns leadShowcase" onClick={stopTrack}>🔳</p>
                    <p className="profilegrpbtns leadShowcase" onClick={playpauseTrack}>{playPauseBtn}</p>
                    <p className="profilegrpbtns leadShowcase" onClick={nextTrack}>⏭</p>
                    {/* <p className="profilegrpbtns leadShowcase" onClick={stopTrack}>🔳</p> */}
                  </div>

                  <div className="leadShowcase dark-card-cove dark-glo">
                    <div className="leadShowcase dark-glo profilegrpbtns bluebtn">
                      <div className="leadShowcase bluebtn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <i className="fa fa-volume-down" style={{ margin: '5px' }}></i>
                        <input style={{ cursor: 'pointer' }} type="range" min="1" max="100" value={volumeSlider} className="volume_slider" onChange={(e) => {
                          setVolumeSlider(e.target.value)
                          setVolume(volumeSlider)
                        }}
                        />
                        <p>Vol</p>
                      </div>
                      <div className="leadShowcase bluebtn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p>{currentTime}</p>
                        <input style={{ cursor: 'pointer' }} type="range" min="1" max="100" value={seekSlider} className="seek_slider" onChange={e => {
                          setSeekSlider(e.target.value)
                          seekTo(seekSlider)
                        }}
                        />
                        <p>{totalDuration}</p>
                      </div>
                      <div className={cardClass}>
                        <div className='purple-circle-container'>
                          <div className='dark-overlay'>
                            <p className='leadShowcase dark-glow dark-overlay' >{dynamicMessage}</p>
                          </div>
                        </div>
                      </div>
                      <div className='dark-overlay leadShowcase paddin' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <p className="fa fa-repeat fa-1.5x leadShowcase" onClick={repeatTrack}></p>
                        <p className="fas fa-random fa-1.5x leadShowcase" onClick={randomTrack}></p>
                      </div>
                      <p>Track Duration: {totalDuration}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profilegrpbtns bluebtn purple-circle-container padding">
                <div className="purple-circle-container">
                  <div className="leadShowcase bluebtn dark-glow dark-overlay">
                    <p className="leadShowcase bluebtn dark-card-cover" onMouseEnter={e => landingHover(e)}>{logoLeads}</p>
                  </div>
                </div>
                <div className="box-shadow  profilegrpbtns  purple-circle-container">
                  <div className="  dark-card-cover profilegrpbtns purple-circle-containe padding">
                    <div className={cardClass} style={{ width: '100%', alignItems: 'center' }}>
                      <div className='purple-circle-container'>
                        <Link to='/songs/' className={cardClass} style={{ margin: '5px' }}>
                          <p className={dynamicContents}>{dynamicMessage}</p>
                        </Link>
                      </div>
                    </div>

                    <div className="inner-card-showcase dark-overlas">
                      <div className=" purple-circle-container profilegrpbtns bluebtn">
                        <p className=" profilegrpbtn leadShowcase dark-overlay" onClick={playpauseTrack} style={{ padding: '25px' }}>{playPauseBtn}</p>

                        {/* <div className="lead dark-card-cove profilegrpbtn"> */}
                        {/* <p className="leadShowcase">
                            Music by: {musicList[trackIndex].artist}</p> */}
                        {/* {console.log(musicList[trackIndex].artist)} */}
                        {/* </div> */}
                        <Link to='/AddSong' className="bluebtn profilegrpbtn leadShowcase">
                          <p className=" action leadShowcas bluebtn"><i className='fas fa-music leadShowcase'> Add New Track!</i></p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      :<p>Page Loading!!!</p>
    }
    </section>
  );
}

export default Landing