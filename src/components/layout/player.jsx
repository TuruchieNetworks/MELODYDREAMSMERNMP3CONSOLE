let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
console.log(window.onscroll)
const audioContainer = document.querySelector('audio-container');
const slider_container = document.querySelector('slider_container');
const progress = document.querySelector('current-time');
// first we fetch audio file and process it as a node 
// after we can use run cool processes like changing playback speed, applying filters and so on just before sending it back out to the speakers

// first we create an audio context and assigning it to a variable which can be manipulated using web audio API
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// const osc = audioCtx.createOscillator();
// OscillatorNode.type = sine;
// osc.connect(audioCtx.destination);

// osc.frequency.value = 240;

// osc.start(0);
// osc.stop(1);

// document.querrySelector('li:nth-child()');
// document.querrySelectorAll('') = list 
// list[].innerText
// let audio;
// fetch('music/MOODY_CHOIR_SANCTUARY.wav')
//     //here data from the audio is placed into a buffer using the array buffer method in the body of the function! 
//     .then(function (data) {data.arrayBuffer()})
//     // here we decode the data
//     .then(function (arrayBuffer) {audioCtx.decodeAudioData(arrayBuffer)})
//     .then(decodedAudio => {
//         audio = decodedAudio
//     });

// function playback() {
//     const playSound = audioCtx.createBuffferSource();
//     playSound.buffer = audio;
//     playSound.connect(audioCtx.destination);
//     playSound.start(audioCtx.currentTime);
// }
// var oscillator = audioCtx.createOscillator();
// OscillatorNode.type = sine;


// oscillator.connect(audioCtx.destination);
// oscillator.frequency

// const audio = document.querySelector("audio")

// audio.play();


const audioFileUrl = process.env.PUBLIC_URL + '/uploads/' + audioFileName
const audioFileName = music_list[track_index].audio; 
// Look for property named 'audio' in music_list items
// const audioFileUrl = process.env.PUBLIC_URL + '/uploads/audio-file.mp3' 
return (
  <audio controls>
    <source src={audioFileUrl} type="audio/mp3" />
    Your browser does not support the audio tag.
  </audio>
);

const music_list = [
    {
        img: 'img/faded.png',
        name: 'Moody Choir Sanctuary',
        artist: 'Turuchie',
        music: 'music/MOODY_CHOIR_SANCTUARY.wav'
    }
];

console.log(music_list)
loadTrack(track_index);

function loadTrack(track_index) {
    // var track_index = music_list[0];
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);
    // if (curr_track.currentTime = curr_track.duration ) {
    //     var e = 'ended'
    // }

    curr_track.addEventListener('ended', nextTrack);

    random_bg_color();
}

function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";

    // audioContainer.style.backgroundColor = gradient;
    // track_name.style.color = gradient;

    // document.body.style.background = gradient;
}
function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack() {
    if (track_index < music_list.length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list.length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list.length - 1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}











// using Hooks

// import React, { useState, useEffect } from 'react';

const Player = ({ musicList }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [audioRef, setAudioRef] = useState(null);
  const [seekSlider, setSeekSlider] = useState(0);
  const [volumeSlider, setVolumeSlider] = useState(100);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalDuration, setTotalDuration] = useState('00:00');

  useEffect(() => {
    if (audioRef) {
      const updateTimer = setInterval(() => {
        setUpdate();
      }, 1000);

      audioRef.addEventListener('ended', nextTrack);

      return () => {
        clearInterval(updateTimer);
        audioRef.removeEventListener('ended', nextTrack);
      };
    }
  }, [audioRef]);

  useEffect(() => {
    loadTrack(trackIndex);
  }, [trackIndex]);

  const loadTrack = (index) => {
    if (audioRef) {
      audioRef.src = musicList[index].music;
      audioRef.load();
    }
  };

  const reset = () => {
    setCurrentTime('00:00');
    setTotalDuration('00:00');
    setSeekSlider(0);
  };

  const randomTrack = () => {
    setIsRandom(!isRandom);
    setIsRandom ? playRandom() : pauseRandom();
  };

  const playRandom = () => {
    setIsRandom(true);
  };

  const pauseRandom = () => {
    setIsRandom(false);
  };

  const repeatTrack = () => {
    loadTrack(trackIndex);
    playTrack();
  };

  const playpauseTrack = () => {
    isPlaying ? pauseTrack() : playTrack();
  };

  const playTrack = () => {
    if (audioRef) {
      audioRef.play();
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    if (audioRef) {
      audioRef.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    if (isRandom) {
      let randomIndex = Math.floor(Math.random() * musicList.length);
      setTrackIndex(randomIndex);
    } else {
      setTrackIndex((prevIndex) => (prevIndex + 1) % musicList.length);
    }
  };

  const prevTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex - 1 + musicList.length) % musicList.length);
  };

  const seekTo = () => {
    if (audioRef) {
      let seekToTime = (audioRef.duration * seekSlider) / 100;
      audioRef.currentTime = seekToTime;
    }
  };

  const setVolume = () => {
    if (audioRef) {
      audioRef.volume = volumeSlider / 100;
    }
  };

  const setUpdate = () => {
    if (audioRef && !isNaN(audioRef.duration)) {
      let seekPosition = (audioRef.currentTime / audioRef.duration) * 100;
      setSeekSlider(seekPosition);

      let currentMinutes = Math.floor(audioRef.currentTime / 60);
      let currentSeconds = Math.floor(audioRef.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(audioRef.duration / 60);
      let durationSeconds = Math.floor(audioRef.duration - durationMinutes * 60);

      setCurrentTime(`${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`);
      setTotalDuration(`${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`);
    }
  };

  return (
    <div>
      {/* Your JSX for displaying the player controls and information */}
      {/* Example: */}
      <button onClick={playpauseTrack}>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={nextTrack}>Next</button>
      <button onClick={prevTrack}>Previous</button>
      <input type="range" value={seekSlider} onChange={(e) => setSeekSlider(e.target.value)} />
      <input type="range" value={volumeSlider} onChange={(e) => setVolumeSlider(e.target.value)} />
      <div>{currentTime}</div>
      <div>{totalDuration}</div>
    </div>
  );
};

export default Player;
