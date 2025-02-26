import React, { useEffect, useRef } from 'react';
import '../../App.css';
import AudioPlayer from './AudioPlayer';
const PlayerComponent = () => {
    return (
        <div className='shadow-container'>
            <AudioPlayer/>
        </div>
    );
};

export default PlayerComponent;
