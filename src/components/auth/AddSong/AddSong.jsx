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
    const [placeholderSongImage, setPlaceholderSongImage] = useState('Track Image 📷');
    const [placeholderSongDescription, setPlaceholderSongDescription] = useState('Please Describe Your Song!');
    const [statusMsg, setStatusMsg] = useState('Make Track Private');
    const [statusClass, setStatusClass] = useState("bluebtn leadShowcase dark-card-cover dark-glow")
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
        if (e.target.innerText === 'Track Image 📷') {
            setPlaceholderSongImage('📷 Please Enter Track Image!')
        }
        else {
            setPlaceholderSongImage(' Track Image 📷')
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
                        <form className="form bluebtn box-shadow profilecontainer" onSubmit={uploadSong}>
                            <div className="bluebtn leadShowcase profilecontainer dark-card-cove">
                                <label className="bluebtn dark-card-cover purple-circle-container" htmlFor="songName">
                                    <p className="leadShowcas purple-circle-container">
                                        <Link to="/AddSong" className="dark-glow leadShowcase dark-profile-overlay dar-glow" onMouseEnter={(e) => placeholderhover(e)}>
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
                            <div className="profilecontainer purple-circle-container form-group ">
                                <div className="bluebtn">
                                    <label className="purple-circle-container " htmlFor="songArtist">
                                        <p className=" leadShowcase dark-card-cover">
                                            <Link to="/AddSong" className="bluebtn dark-overlay" onMouseEnter={(e) => placeholderhover(e)}>
                                                {placeholderSongOwner}
                                            </Link>
                                        </p>
                                    </label>
                                    <input
                                        className="textShowcase"
                                        type="text"
                                        placeholder={placeholderSongOwner}
                                        value={formData.songArtst || ''}
                                        onChange={(e) => setFormData({ ...formData, songArtst: e.target.value })}
                                    /></div>
                            </div>

                            <div className="profilecontainer purple-circle-container form-group">
                                <div className='leadShowcase bluebtn dar-card-cover'>
                                    <label className="bluebt dark-card-cover padding" htmlFor="songImage">
                                        <p className="purple-circle-container">
                                            <Link to="/AddSong" className="bluebtn leadShowcase dark-card-cover" onMouseEnter={(e) => placeholderhover(e)}>
                                                <p className='leadShowcase dark-glo bluebtn dark-overlay'>{placeholderSongImage}</p>
                                            </Link>
                                        </p>
                                    </label>
                                    <input
                                        className="textShowcase"
                                        type="file"
                                        placeholder={placeholderSongImage}
                                        value={formData.songImage || ''}
                                        onChange={(e) => setFormData({ ...formData, songImage: e.target.value })}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>

                            <div className="form-group box-shadow purple-circle-container profilecontainer bluebtn">
                                <div className='dark-card-cover leadShowcas'>
                                    <label className="purple-circle-container" htmlFor="description">
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

                                    <div className="purple-circle-container form-group">
                                        <div className="dark-card-cover bluebtn leadShowcase">
                                            <label className="" htmlFor="description">
                                                <p className="purple-circle-container">
                                                    <Link to="/AddSong" className="dark-glow dark-card-cover lead" onMouseEnter={(e) => placeholderhover(e)}>
                                                        <p className=''>Please Select Song!</p>
                                                    </Link>
                                                </p>
                                            </label>
                                        <p className="leadShowcase dark-card-cover">
                                            <input className="textShowcase bluebtn" type="file" accept="audio/mp3" onChange={(e) => setMp3Data(e.target.files[0])} style={{ cursor: 'pointer' }} />
                                        </p>
                                            <label className="bluebtn dark-glow leadShowcase dark-card-cover" htmlFor="description" >
                                                <div className={statusClass} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '16px' }}>
                                                    <p className="textShowcase dark-card-cover dark-overly">{statusMsg}</p>

                                                    <input
                                                        style={{ cursor: 'pointer' }}
                                                        type="checkbox"
                                                        checked={formData.isPrivate || false}
                                                        onChange={
                                                            (e) => {
                                                                setFormData({ ...formData, isPrivate: e.target.checked })
                                                                {
                                                                    if (statusMsg === 'Make Track Private') {
                                                                        setStatusMsg('Make Track Public')
                                                                        setStatusClass('leadShowcase bluebtn dark-card-cover')
                                                                    } else {
                                                                        setStatusMsg('Make Track Private')
                                                                        setStatusClass('my-1 bluebtn leadShowcase dark-card-cover dark-glow')
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    />
                                                </div>
                                            </label>
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSong;
