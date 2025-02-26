import React, { useRef, useEffect } from 'react';
import '../../styles/VideoBackground.css';
import UseVideBackground from '../hooks/UseVideoBackground';
import MusicUtils from '../hooks/MusicUtils';

const VideoBackground = () => {
    const { videoRef } = UseVideBackground();
    const musicUtils = new MusicUtils();
    const videosList = musicUtils.getVideoList();
    const logo_scene = videosList[0].video;

    return (
        <div className="video-background">
            <video ref={videoRef} loop muted autoPlay>
                <source src={logo_scene} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
        </div>
    );
};

export default VideoBackground;
