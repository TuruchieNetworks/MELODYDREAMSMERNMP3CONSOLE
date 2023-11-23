import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Landing = () => {

  return (
    <section className="landing">
      <div className="profilecontainer profileCoverShowcase">
        <div className="main-container">
          <div className="profileShowcase padding-big">
            <div className="dark-card-cove profilegrpbtns dark-glo">
              <div className="dark-card-cove leadShowcase">
                <h1 className="leadShowcase dark-glow dark-profile-overla">
                  <a className="leadShowcas profilegrpbtn" href="/sasquaches/{{sasquach.id}}/stories">MELODY DREAMS <i className="fas fa-cloud-moon lea"></i>
                  </a>
                </h1>
              </div>
              <div className="profileTitle leadShowcase profilegrpbtns profilecontainer dark-card-cover dark-overlay purple-circle-container ">
                <h1 className="leadShowcase dark-profile-overlay"><a className="profilegrpbtns leadShowcase" href="/sasquaches" onmouseenter="signuphover(this)">Released Tracks <i className="fas fa-ghost lea"></i></a></h1>  

                <h1 className="leadShowcase dark-card-cover dark-glo dark-profile-overlay-longwor"><a className="leadShowcase dark-glo profilegrpbtns" href="/users/{{sasquach.id}}"><i className="fas fa-eye leadShowcase" > Track Playing</i></a></h1>
              </div>
              <div class="dojoCar dark-overla profilegrpbtns dark-glow">
                <div class="program third_btn_hover leadShowcas dark-card-cove purple-circle-container">
                  <a class="text-bold leadShowcase dark-glow profilegrpbtns" href="/sasquaches/{{sasquach.id}}"><i class="fas fa-cat leadShowcase"> watch</i></a>  
                </div>       
                <i class="fas fa-ghost leadShowcas" onmouseenter="ghostHover(this)"></i>

                <div class="seventh-width leadShowcas box-shadow dark-card-cove dark-glow profilegrpbtn">
                  <div class=" leadShowcase dark-glo profilegrpbtns purple-circle-container">
                    <a class="flex profilegrpbtn leadShowcase" href="/sasquaches/{{sasquach.id}}"><i class="fas fa-bell action leadShowcase"> New Track Alert!</i></a>
                    <a class="leadShowcas dark-glo" href="/sasquaches"><i class="fas fa-skull-crossbones actio textShowcase dar" onmouseenter="landingHover(this)">new tracks!</i></a>
                  </div>
                  <div class="inner-card-showcase dark-overlas">
                    <p class="leadShowcase purple-circle-container profilegrpbtns">
                      <a class="profilegrpbtns leadShowcase dark-overlay" href= "/sasquaches/{{sasquach.id}}"></a>
                    </p>
                    <p><h2 class="leadShowcase dark-card-cove profilegrpbtn"><i class="fas fa-skull-crossbones"> Music by:  at </i></h2></p>
                  </div>
                </div>
                <div class="profilegrpbtns dark-glow textShowcase">
                  <p class="profilegrpbtns my">Date of release: </p>
                  <p class="dark-card-cove leadShowcas"><a class="dark-card-cove textShowcase" href="/"><i class="fas fa-eye"> 's watch! </i> since </a></p>
                </div>
                <div class="flex">
                  <p><a href="/edit"><i class="fas fa-edit"></i></a></p>
                  <p><a href="/}"> <i class="fas fa-trash"></i></a></p>
                </div>
                <div class="sized-width">
                </div>
    </div>

            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Landing