import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // Update the navigation state based on the screen width
      setIsNavOpen(window.innerWidth <= 700);
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
        <i className={`fas ${isNavOpen ? 'fa-chevron-up' : 'fa-chevron-down'} toggle-icon`}></i>
      </div>

      {/* Nav links */}
      <ul className={`navLead ${isNavOpen ? 'nav-open' : ''}`}>
        <li><Link to="/Profiles" className="leadShowcase">Artists 🎙<i className="fas fa-use"></i></Link></li>
        <li><Link to="/Register" className="leadShowcase">Register <i className="fas fa-musi"></i></Link></li>
        <li><Link to="/Login" className="textShowcase"><i className="fas fa-sign-out-al"></i>Login <i className="fas fa-sign-out-alt"></i></Link></li>
      </ul>

      {/* Logout link */}
      <h1 className='leadShowcase'><Link to="/Login"> <i className="fas fa-sign-out-alt">Logout</i></Link></h1>
    </nav>
  );
}

export default Navbar;
