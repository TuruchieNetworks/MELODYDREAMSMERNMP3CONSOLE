import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import ImageCarousel from '../carousels/ImageCarousel';
import HeaderLinks from '../headers/HeaderLinks';
import Biography from '../layout/Bio';

const Music = () => {
    //const { idx, changeImage } = useCarouselImages(images);
    const videoRef = useRef(null); // Create a reference for the video element

    useEffect(() => {
        // Play the video when the component mounts
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error("Error attempting to play the video:", error);
            });
        }
    }, []); // Empty dependency array to run once on mount
    return (
        <div
            id="showcase"
            style={{
            //backgroundImage: `url(${images[idx]})`,
            transition: 'background-image 0.5s ease-in-out',
            width: '100vw',
            height: '100vh',
            // backgroundSize: 'cover', 
            // backgroundPosition: 'center',
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
                <div className='phoneBio'>
                    <Biography />
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

export default Music;
