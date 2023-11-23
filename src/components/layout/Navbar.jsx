import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <div className='Showcase'>
        <h1 className=" leadShowcase">
          <Link to='/Landing' className='lead'>
            🎶 Melody Dreams 🎶
          </Link>
        </h1>
      </div>
      <ul className='navLead'>
        <li><Link to="/Profiles" className="leadShowcase">Artists 🎙<i className="fas fa-use"></i></Link></li>

        <li><Link to="/Register" className="leadShowcase">Register <i className="fas fa-musi"></i></Link></li>

        <li><Link to="/Login" className="textShowcase"><i className="fas fa-sign-out-al"></i>Login <i className="fas fa-sign-out-alt"></i></Link></li>

      </ul>
      <h1 className='leadShowcase'><Link to="/Login"> <i className="fas fa-sign-out-alt">Logout</i></Link></h1>
    </nav>
  );
}

export default Navbar