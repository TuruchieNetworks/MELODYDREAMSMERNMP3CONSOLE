import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navPhone, setNavPhone] = useState({ display: 'block' }); // set to 'block' initially

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // Update the navigation state based on the screen width
      setIsNavOpen(window.innerWidth <= 500);

      // Hide navigation items when screen width is less than or equal to 650 pixels
      setNavPhone({ display: window.innerWidth <= 650 ? 'none' : 'block' });
    };

    // Add a resize event listener to check for screen width changes
    window.addEventListener('resize', handleResize);

    // Initialize the navigation state on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar bg-dark">
      <div className='Showcase'>
        <h1 className="leadShowcase">
          <Link to='/Landing' className='lead'>
            🎶 Melody Dreams 🎶
          </Link>
        </h1>
      </div>

      {/* Mobile-friendly menu */}
      <div className="mobile-menu" onClick={toggleNav}>
        <Link to='/PhoneNavigation'>
          <i style={{ cursor: 'pointer', padding: '10px' }} className={` ${isNavOpen ? 'fas fa-chevron-up' : 'fas fa-sign-out-alt'} toggle-icon`}></i>
        </Link>
      </div>

      {/* Nav links */}
      <ul className={`navLead ${isNavOpen ? 'nav-open' : ''}`}>
        <li style={navPhone}><Link to="/Profiles" className="leadShowcase">Artists 🎙<i className="fas fa-use"></i></Link></li>
        <li style={navPhone}><Link to="/Register" className="leadShowcase">Register <i className="fas fa-musi"></i></Link></li>
        <li style={navPhone}><Link to="/Login" className="textShowcase"><i className="fas fa-sign-out-al"></i>Login <i className="fas fa-sign-out-alt"></i></Link></li>
      </ul>

      {/* Logout link */}
      <h1 style={navPhone}><Link to="/Login"><i className="fas fa-sign-out-alt">Logout</i></Link></h1>
    </nav>
  );
}

export default Navbar;
