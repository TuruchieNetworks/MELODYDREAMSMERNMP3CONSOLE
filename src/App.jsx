import React from 'react';
import { Router, Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import Profiles from './components/layout/Profiles';
import AddSong from './components/auth/AddSong/AddSong';
// import Alert from './components/layout/Alert';
// Redux
// import { Provider } from 'react-redux';
// import store from './store';

function App() {

  return ( 
    <div>
      {/* { isToken ?  */}
      {/* <Navbar />  : */}
      <div> 
      <Navbar /> 
      <Routes>
        <Route exact path='/' element={<Navigate to='/Register'/>} />
        <Route exact path='/Landing' element={ <Landing /> } />
        <Route exact path='/Register' element={ <Register /> } />
        {/* <Route exact path='/Profiles' element={ <Profiles /> } /> */}
        <Route exact path='/Login' element={ <Login /> } />
        <Route exact path='/AddSong' element={ <AddSong /> } />
      </Routes>
      </div>
      {/* }  */}
    </div>
    );
}

export default App;