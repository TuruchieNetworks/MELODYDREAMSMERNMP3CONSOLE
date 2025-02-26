import React, { useEffect, useState, useRef } from 'react';
import Biography from '../layout/Bio';
import ImageCarousel from './ImageCarousel';
import ImageUtils from '../hooks/ImageUtils';
import useCarouselImages from '../hooks/UseCarouselImages';
import MusicUtils from '../hooks/MusicUtils';

const BackgroundCarousel = () => {
  const musicUtils = new MusicUtils();
  const imageUtilities = new ImageUtils();
  const images = imageUtilities.getAllCarouselImages();
  const { idx, changeImage } = useCarouselImages(images);
  // const videosList = musicUtils.getVideoList();
  // const logo_scene = videosList[0].video;
  // const { videoRef } = UseVideoBackground();
  //console.log(changeImage);

  return (
    <div className="Carousel"
      style={{
        backgroundImage: `url(${images[idx]})`,
        transition: 'background-image 0.5s ease-in-out',
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover', // Ensure the background covers the whole container
        backgroundPosition: 'center', // Position the background image in the center
      }}>
      <div className="background-container">
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
      </div>
    </div>
  )
};

export default BackgroundCarousel;