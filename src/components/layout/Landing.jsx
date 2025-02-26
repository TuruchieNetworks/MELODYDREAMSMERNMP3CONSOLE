import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PlayerAnimations.css';
import About from './About';
import HeaderLinks from '../headers/HeaderLinks';
import Biography from './Bio';
import AudioPlayer from '../player/AudioPlayer';
import PlayerComponent from '../player/PlayerComponent';
import MusicUtils from '../hooks/MusicUtils';
import UseVideoBackground from '../hooks/UseVideoBackground';
import ImageCarousel from '../carousels/ImageCarousel';
import useCarouselImages from '../hooks/UseCarouselImages';
import BackgroundCarousel from '../carousels/BackgroundCarousel';
import MusicBackground from '../backgroundVideos/MusicBackground';
import VideoBackground from '../backgroundVideos/VideoBackground';
import ImageUtils from '../hooks/ImageUtils';

const Landing = () => {
    const musicUtils = new MusicUtils();
    const imageUtilities = new ImageUtils();
    const images = imageUtilities.getAllCarouselImages();
    const videosList = musicUtils.getVideoList();
    const { videoRef } = UseVideoBackground();
    const logo_scene = videosList[0].video
    const { idx} = useCarouselImages(images);
    return (
        <div id="showcase"
            style={{
                backgroundImage: `url(${images[idx]})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                transition: 'background-image 0.5s ease-in-out',
                width: '100vw',
                height: '100vh',
            }}
        >
            <div className="container showcase-container imageCover">
                <div className='flex-carousel'>
                    <div className='showcase-container'>
                        <ImageCarousel />
                    </div>
                    <div className='pcBio'>
                        <Biography />
                    </div>
                </div>
                <div className='player-container'>
                    <AudioPlayer />
                </div>
                <div className='phoneBio'>
                    <Biography />
                </div>
                <div className='phone-state bottom-panels'>
                    <HeaderLinks />
                    <Link to="/about" className="btn party-lights">
                        Read More
                    </Link>
                </div>
            </div>
            <MusicBackground />
            {/* <VideoBackground /> */}
            <About />
            <BackgroundCarousel />
        </div>
    );
};

export default Landing;