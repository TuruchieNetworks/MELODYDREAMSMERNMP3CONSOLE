import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

// import { IconButton, div } from '@material-ui/core';
// import PublishIcon from '@material-ui/icons/Publish';

const AddSong = ({ onUpload }) => {
    const [placeholderSongTitle, setPlaceholderSongTitle] = useState('🎺 Please Enter Song Title')
    const [placeholderSongOwner, setPlaceholderSongOwner] = useState('Artist 🎙')
    const [placeholderSongDescription, setPlaceholderSongDescription] = useState('Please Describe Your Song!')
    const [songData, setSongData] = useState({});
    const [mp3Data, setMp3Data] = useState();
    const navigate = useNavigate()

    // const uploadSong = async () => {
    //     //Upload the song
    //     console.log('songData', songData);
    //     const { title, description, owner } = songData;

    //     // const { key } = await Storage.put(`${uuid()}.mp3`, mp3Data, { contentType: 'audio/mp3' });

    //     const createSongInput = {
    //         id: uuid(),
    //         title,
    //         description,
    //         owner,
    //         // filePath: key,
    //         like: 0,
    //         isPrivate: false,
    //         comments: '',
    //     };
    //     axios.post('http://localhost:8000/api/songs', createSongInput)
    //         .then(res => {
    //             console.log('✔✔✔👌', res.data)
    //             navigate('/');
    //         })
    //     //     .catch(err => console.log('🎡🎡🔭', err));
    //     // await API.graphql(graphqlOperation(createSong, { input: createSongInput }));
    //     // onUpload();
    // };
    const uploadSong = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', mp3Data);
        formData.append('title', songData.title);
        formData.append('description', songData.description);
        formData.append('owner', songData.owner);

        axios.post('http://localhost:8000/api/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log('✔✔✔👌', res.data);
                navigate('/');
            })
            .catch((err) => console.log('🎡🎡🔭', err));
    };
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
        if (e.target.innerText === '🎶 Description! 🎧') {
            setPlaceholderSongDescription('🎶 Please Describe Your Song! 🎧')
        }
        else {
            setPlaceholderSongDescription('🎶 Description! 🎧')
        }
    }
    return (
        <div className="landing">
            <div className="profilecontainer profileCoverShowcase">
                <div className="profileShowcase padding-big">
                    <div className="border-box profilegrpbtns leadShowcase">
                        <form className="form bluebt purple-circle-containe padding" onSubmit={uploadSong}>
                            <div className="bluebtn leadShowcase profilegrpbtns profilecontainer dark-card-cover dark-overlay purple-circle-container form-group">
                                <label className="bluebtn padding" htmlFor="title">
                                    <p className="leadShowcas purple-circle-container">
                                        <Link to="/AddSong" className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={(e) => placeholderhover(e)}>
                                            {placeholderSongTitle}
                                        </Link>
                                    </p>
                                </label>
                                <input
                                    className="textShowcase"
                                    type="text"
                                    placeholder={placeholderSongTitle}
                                    value={songData.title || ''}
                                    onChange={(e) => setSongData({ ...songData, title: e.target.value })}
                                />
                            </div>
                            <div className="profileTitle leadShowcase profilegrpbtns profilecontainer dark-card-cover dark-overlay purple-circle-container form-group">
                                <label className="bluebtn" htmlFor="songOwner">
                                    <p className="leadShowcas purple-circle-container padding">
                                        <Link to="/AddSong" className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={(e) => placeholderhover(e)}>
                                            {placeholderSongOwner}
                                        </Link>
                                    </p>
                                </label>
                                <input
                                    className="textShowcase"
                                    type="text"
                                    placeholder={placeholderSongOwner}
                                    value={songData.owner || ''}
                                    onChange={(e) => setSongData({ ...songData, owner: e.target.value })}
                                />
                            </div>
                            <div className="profileTitle leadShowcase profilegrpbtns profilecontainer dark-card-cover dark-overlay purple-circle-container form-group">
                                <label className="bluebtn" htmlFor="description">
                                    <p className="leadShowcas purple-circle-container padding">
                                        <Link to="/AddSong" className="bluebtn leadShowcase dark-profile-overla dark-card-cove" onMouseEnter={(e) => placeholderhover(e)}>
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
                                    value={songData.description || ''} // Change this line
                                    onChange={(e) => setSongData({ ...songData, description: e.target.value })}
                                    style={{ cursor: 'pointer' }}
                                />

                                <div className="bluebtn">
                                    <p className="leadShowcase purple-circle-container padding">
                                        <input className="textShowcase" type="file" accept="audio/mp3" onChange={(e) => setMp3Data(e.target.files[0])} style={{ cursor: 'pointer' }} />
                                    </p>
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
