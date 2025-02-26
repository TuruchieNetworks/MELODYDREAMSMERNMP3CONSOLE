import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Bio from './Bio';
import HeaderLinks from '../headers/HeaderLinks';
import ImageCarousel from '../carousels/ImageCarousel';
import UseVideoBackground from '../hooks/UseVideoBackground';
import useBackgroundImages from '../hooks/UseBackgroundImages';
import useCarouselImages from '../hooks/UseCarouselImages';
import MusicUtils from '../hooks/MusicUtils';
import ImageUtils from '../hooks/ImageUtils';

const About = () => {
    const musicUtils = new MusicUtils();
    const imageUtilities = new ImageUtils();
    const images = imageUtilities.getAllCarouselImages();
    const videosList = musicUtils.getVideoList();
    const logo_scene = videosList[0].video;
    const { videoRef } = UseVideoBackground();
    const { idx, changeImage } = useCarouselImages(images);

    return (
        <div
            id="showcase"
            style={{
            backgroundImage: `url(${images[idx]})`,
            width: '100vw',
            height: '100vh',
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            transition: 'background-image 0.5s ease-in-out'
        }}
        >
            <div className="container showcase-container imageCover">
                <div className='flex-carousel'>
                    <div className='showcase-container'>
                        <ImageCarousel images={images} idx={idx} setIdx={changeImage} />
                    </div>
                    <div className='pcBio'>
                        <Bio />
                    </div>
                </div>
                <div className='phoneBio'>
                    <Bio />
                </div>
                <div className='phone-state'>
                <HeaderLinks />
                <Link to="/about" className="btn party-lights">
                    Read More
                </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
