import React, { useEffect, useRef, useState } from 'react';
import '../../styles/ImageCarousel.css'; 
import ImageUtils from '../hooks/ImageUtils';
import CarouselButton from './CarouselButton';
import useCarousel from '../hooks/UseCarousel'; 
// object-fit: contain; /* Ensure images cover the area */
const ImageCarousel = () => {
    const imageUtilities = new ImageUtils();
    const images = imageUtilities.getAllCarouselImages();
    const { idx, handleNext, handlePrev } = useCarousel(images); // Use the custom hook


    return (
        <div>
            <div className="Carousel">
                <div
                    className="image-container"
                    id="imgs"
                    style={{
                        transform: `translateX(${-idx * 100}%)`, transition: 'transform 0.5s ease-in-out'
                    }}
                >
                    {images.map((image, idx) => (
                        <img
                            src={image}
                            alt={`image-${idx}`}
                            key={idx}
                            style={{
                                // width: '600px',
                                // objectFit: 'cover',
                                // width: '500px',
                                // height: '500px'
                            }}
                        />
                    ))}
                </div>
                <div className='btn-container'>
                    <CarouselButton direction="left" handleClick={handlePrev} />
                    <CarouselButton direction="right" handleClick={handleNext} />
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
