import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const PhoneNavigation = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth <= 700);
    };

    // Add a resize event listener to check for screen width changes
    window.addEventListener('resize', handleResize);

    // Initialize the visibility state on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className={`landing ${isVisible ? 'visible' : 'hidden'}`} style={{ height: '' }}>
      <div className="profilecontainer profileCoverShowcase">
        <div className="main-container">
          <div className="profileShowcase">
            <div className="dark-card-cove profilegrpbtns leadShowcase bluebtn padding" style={{ padding: '15px' }}>
              <div className="leadShowcase profilegrpbtns profilecontainer dark-card-cove dark-overlay purple-circle-container bluebt">
                <li className="bluebtn leadShowcase">
                  <Link to="/Profiles" className="leadShowcase bluebtn">
                    Artists <i className="fas fa- ">🎙</i>
                  </Link>
                </li>
                <li className="bluebtn leadShowcase">
                  <Link to="/Register" className="leadShowcase bluebtn">
                    Register <i className="fas fa-user"></i>
                  </Link>
                </li>
                <li className="bluebtn leadShowcase landing purple-circle-container">
                  <Link to="/Login" className="leadShowcase purple-circle-container bluebtn">
                    Login  <i className="fas fa-sign-out-alt "></i>
                  </Link>
                </li>
                <li className="bluebtn leadShowcase dark-card-cover">
                  <Link to="/Landing" className="leadShowcase bluebtn">
                    Media Player <i className="fas fa-music lead"></i>
                  </Link>
                </li>
                <li className="bluebtn leadShowcase dark-card-cover">
                  <Link to="/AddSong" className="leadShowcase bluebtn">
                    Add New Track <i className="fas fa-guitar lead"></i>
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhoneNavigation;
