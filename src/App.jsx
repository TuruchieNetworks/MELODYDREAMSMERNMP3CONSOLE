import React from 'react';
import { useState, useEffect } from 'react';
import { Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import Profiles from './components/layout/Profiles';
import AddSong from './components/auth/AddSong/AddSong';
import PhoneNavigation from './components/layout/PhoneNavigation';
// import Alert from './components/layout/Alert';
// Redux
// import { Provider } from 'react-redux';
// import store from './store';

function App() {
  const [userToken, setUserToken] = useState("")
  useEffect(() => {
    axios.get('http://localhost:8000/api/users',
      { withCredentials: true })
      .then(res => {
        // setUser(res.data.users)
        setUserToken(res.config.xsrfCookieName)
        // console.log('🚀🚀🚀', res.data.users)
        console.log('🚀🚀🚀', res.config.xsrfCookieName
        )
      })
      .catch(err => {
        console.log('🔭🎡🎡', err)
      });
  }, []);
  return (
    <section className="landing" style={{ height: '100vh' }}>
      {/* {userToken ?
        <Navbar />
        : */}
        <div>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Navigate to='/Register' />} />
            <Route exact path='/Landing' element={<Landing />} />
            <Route exact path='/Register' element={<Register />} />
            <Route exact path='/PhoneNavigation' element={<PhoneNavigation />} />
            {/* <Route exact path='/Profiles' element={ <Profiles /> } /> */}
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/AddSong' element={<AddSong />} />
          </Routes>
        </div>
      {/* } */}
    </section>

  );
}

export default App;