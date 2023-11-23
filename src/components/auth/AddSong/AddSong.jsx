import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

// import { IconButton, div } from '@material-ui/core';
// import PublishIcon from '@material-ui/icons/Publish';

const AddSong = ({ onUpload }) => {
    const [placeholderSongTitle, setPlaceholderSongTitle] = useState('🎺 Please Enter Song Title');
    const [placeholderSongOwner, setPlaceholderSongOwner] = useState('Artist 🎙');
    const [placeholderSongImage, setPlaceholderSongImage] = useState('Profile Image');
    const [placeholderSongDescription, setPlaceholderSongDescription] = useState('Please Describe Your Song!');
    const [statusMsg, setStatusMsg] = useState('Make Private');
    const [formData, setFormData] = useState({});
    const [mp3Data, setMp3Data] = useState();
    const navigate = useNavigate();

    const uploadSong = async () => {
        console.log('formData', formData);
        const { songName, songArtst, songDescription, songImage } = formData;

        const createSongInput = {
            id: uuid(),
            songName,
            songArtst,
            songDescription,
            songImage: songImage.filePath, // Assuming 'songImage' is an object with 'filePath' property
            like: 0,
            isPrivate: false,
            comments: '',
        };

        axios.post('http://localhost:8000/api/songs', createSongInput)
            .then(res => {
                console.log('✔✔✔👌', res.data);
                navigate('/');
            })
            .catch(err => console.log('🎡🎡🔭', err));
    };

    // const uploadSong = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append('file', mp3Data);
    //     formData.append('title', songData.title);
    //     formData.append('description', songData.description);
    //     formData.append('owner', songData.owner);

    //     axios.post('http://localhost:8000/api/users', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     })
    //         .then((res) => {
    //             console.log('✔✔✔👌', res.data);
    //             navigate('/');
    //         })
    //         .catch((err) => console.log('🎡🎡🔭', err));
    // };
    const placeholderhover = (e) => {
        // console.log(e.target.innerText)
        if (e.target.innerText === '🎶 Song Title! 🎧') {
            setPlaceholderSongTitle('🎶 Please Enter Song Title!')
        }
        else {
            setPlaceholderSongTitle('🎶 Song Title! 🎧')
        }

        if (e.target.innerText === '🎶 Artist 🎙 🎧') {
            setPlaceholderSongOwner('🎶Song Artist 🎙 🎧')
        }
        else {
            setPlaceholderSongOwner('🎶 Artist 🎙 🎧')
        }
        if (e.target.innerText === '🎶 Song Description 🎧') {
            setPlaceholderSongDescription('🎶 Please Describe Your Song! 🎧')
        }
        else {
            setPlaceholderSongDescription('🎶 Song Description 🎧')
        }
    }
    return (
        <div className="landing">
            <div className="profilecontainer profileCoverShowcase">
                <div className="profileShowcase">
                    <div className="box-shadow leadShowcase purple-circle-containe">
                        <form className="form bluebtn box-shadow purple-circle-container" onSubmit={uploadSong}>
                            <div className="bluebtn leadShowcase profilegrpbtns profilecontainer dark-card-cover">
                                <label className="bluebtn dark-card-cover" htmlFor="songName">
                                    <p className="leadShowcas purple-circle-container">
                                        <Link to="/AddSong" className="dark-glow leadShowcase dark-profile-overlay" onMouseEnter={(e) => placeholderhover(e)}>
                                            {placeholderSongTitle}
                                        </Link>
                                    </p>
                                </label>
                                <input
                                    className="textShowcase"
                                    type="text"
                                    placeholder={placeholderSongTitle}
                                    value={formData.songName || ''}
                                    onChange={(e) => setFormData({ ...formData, songName: e.target.value })}
                                />
                            </div>
                            <div className="profilecontainer purple-circle-container form-group padding">
                                <div className="purple-circle-container" htmlFor="songArtist">
                                    <p className="leadShowcase dark-card-cover purple-circle-container ">
                                        <Link to="/AddSong" className="leadShowcase bluebtn " onMouseEnter={(e) => placeholderhover(e)}>
                                            {placeholderSongOwner}
                                        </Link>
                                    </p>
                                    <input
                                        className="textShowcase"
                                        type="text"
                                        placeholder={placeholderSongOwner}
                                        value={formData.songArtst || ''}
                                        onChange={(e) => setFormData({ ...formData, songArtst: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="profileTitle leadShowcase profilegrpbt profilecontainer dark-card-cover dark-overlay purple-circle-container form-group">
                                <label className="bluebtn dark-card-cover" htmlFor="songImage">
                                    <p className="leadShowcas purple-circle-container padding">
                                        <Link to="/AddSong" className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={(e) => placeholderhover(e)}>
                                            {placeholderSongImage}
                                        </Link>
                                    </p>
                                </label>
                                <input
                                    className="textShowcase"
                                    type="file"
                                    placeholder={placeholderSongImage}
                                    value={formData.songImage || ''}
                                    onChange={(e) => setFormData({ ...formData, songImage: e.target.value })}
                                />
                            </div>

                            <div className="profilegrpbt form-group box-shadow purple-circle-container profilecontainer">
                                <div className='dark-glow leadShowcase'>
                                    <label className="bluebtn purple-circle-container" htmlFor="description">
                                        <p className="purple-circle-container">
                                            <Link to="/AddSong" className="dark-glow dark-card-cover lead" onMouseEnter={(e) => placeholderhover(e)}>
                                                {placeholderSongDescription}
                                            </Link>
                                        </p>
                                    </label>
                                    <textarea
                                        autoFocus={true}
                                        autoComplete="on"
                                        className="textShowcase"
                                        rows="10"
                                        cols="20"
                                        type="text"
                                        value={formData.songDescription || ''} // Change this line
                                        onChange={(e) => setFormData({ ...formData, songDescription: e.target.value })}
                                        style={{ cursor: 'pointer' }}
                                    />

                                    <div className=" dark-overlay purple-circle-container form-group">
                                        <p className="leadShowcase purple-circle-container dark-card-cover dark-overlay">
                                            <input className="textShowcase bluebtn" type="file" accept="audio/mp3" onChange={(e) => setMp3Data(e.target.files[0])} style={{ cursor: 'pointer' }} />
                                        </p>
                                        <p className="textShowcase purple-circle-container dark-card-cover">
                                            <label className="bluebtn leadShowcase dark-card-cover dark-glow" htmlFor="description" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '16px' }}>
                                                {statusMsg}

                                                <input
                                                    style={{ cursor: 'pointer' }}
                                                    type="checkbox"
                                                    checked={formData.isPrivate || false} // Assuming isPrivate is a boolean
                                                    onChange={
                                                        (e) => {
                                                            setFormData({ ...formData, isPrivate: e.target.checked })
                                                            {
                                                                if (statusMsg === 'Make Private') {
                                                                    setStatusMsg('Make Public')
                                                                } else {
                                                                    setStatusMsg('Make Private')
                                                                }
                                                            }
                                                        }
                                                    }
                                                />
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bluebtn margin-big">
                                <p className="leadShowcase purple-circle-container ">
                                    <button className="bluebtn leadShowcase dark-profile-overlay dark-card-cover my-1">
                                        <p className="bluebtn lead">Upload Song!</p>
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSong;
