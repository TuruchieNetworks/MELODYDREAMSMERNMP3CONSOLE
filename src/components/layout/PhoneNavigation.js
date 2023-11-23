import { Link} from "react-router-dom";
import { useEffect, useState } from 'react';

const PhoneNavigation = () => {

  return (
    <section className="landing" style={{ height: '100vh' }}>
      {/* {user ? */}
      <div className="profilecontainer profileCoverShowcase">
        <div className="main-container" >
          <div className="profileShowcase">
            <div className="dark-card-cove profilegrpbtns leadShowcase bluebtn padding" style={{ padding: '15px' }}>
              <div className="leadShowcase profilegrpbtns profilecontainer dark-card-cove dark-overlay purple-circle-container bluebt">
                
                <li className="bluebtn leadShowcase"><Link to="/Profiles" className="leadShowcase bluebtn"> Artists <i className="fas fa- ">🎙</i></Link></li>
                <li className="bluebtn leadShowcase"><Link to="/Register" className="leadShowcase bluebtn">Register <i className="fas fa-user"></i></Link></li>
                <li className="bluebtn leadShowcase landing purple-circle-container"><Link to="/Login" className="leadShowcase purple-circle-container bluebtn">Login  <i className="fas fa-sign-out-alt "></i></Link></li>
                <li className="bluebtn leadShowcase dark-card-cover"><Link to="/Landing" className="leadShowcase bluebtn">Media Player <i className="fas fa-music lead"></i></Link></li>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* : <p>Page Loading!!!</p>} */}
    </section>
  )
}

export default PhoneNavigation