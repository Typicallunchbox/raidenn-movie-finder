import { React, useEffect, useState, useRef } from "react";
import placeholder from '../static/images/wire.png';
import 'animate.css';
import { Link } from "react-router-dom";
import landingAnimation from '../static/animations/webRgb.webm';

const Landing = () => {
  const myRef = useRef();
  const [myElementIsVisible, updateMyElementIsVisible] = useState(false);

  useEffect(() => {
    var playbackConst = 80, 
    vid = document.getElementById('v0'); 

    function scrollPlay(){  
      var frameNumber  = window.pageYOffset/playbackConst;
      vid.currentTime  = frameNumber;
      window.requestAnimationFrame(scrollPlay);
    }
    window.requestAnimationFrame(scrollPlay);
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
    const entry = entries[0];
    updateMyElementIsVisible(entry.isIntersecting);

  });
    observer.observe(myRef.current);
  }, [])
  
  return (
    <> 
    <div id="set-height"></div>
    <p id="time"></p>
    <video style={{opacity: '5%'}} id="v0" tabindex="0" autobuffer="autobuffer" preload="preload">
      <source type="video/webm" src={landingAnimation}></source>
    </video>
    <div className="container">
      <div className="landing-page">
        <div className="inner-container flex">
          <div>
          <video width="920" autoplay="autoplay" muted>
            <source src={process.env.PUBLIC_URL + "animations/landingAnimation.webm"} type="video/webm" />
          </video> 
          </div>
          <div className="relative">
          <a href="#instructions" type="button" className={`prim-button w-max absolute bottom-16 left-24 animate__animated animate__fadeInUp animate__delay-2s`}>Get Started</a>
          </div>
        </div>
      </div>
      <div ref={myRef}  className={`instructions`}>
        <div className="animation-container">
          <img onScr src={placeholder} alt='placeholder'></img>
        </div>
        <div className={`setup-content`}>
          <h3 id='instructions' className="text-left ml-14 mb-14">Steps to get started:</h3>
          <div className={`flex mb-5 ${myElementIsVisible ? 'animate__animated animate__fadeInUp animate__delay-1s' : ''}`}>
            <span>1</span>
            <p className="ml-8 my-auto">Create your Raidenn profile</p>
          </div>
          <div className={`flex mb-5 ${myElementIsVisible ? 'animate__animated animate__fadeInUp animate__delay-2s' : ''}`}>
            <span>2</span>
            <p className="ml-8 my-auto">Start finding and watchlisting movies</p>
          </div>
          <div className={`flex mb-5 ${myElementIsVisible ? 'animate__animated animate__fadeInUp animate__delay-3s' : ''}`}>
            <span>3</span>
            <p className="ml-8 my-auto">Well...that's pretty much it</p>
          </div>
          <Link to='/register'>
            <button className={`prim-button mt-14 ${myElementIsVisible ? 'animate__animated animate__fadeInUp animate__delay-3s' : ''}`}>
              Lets Goooooo!
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};
export default Landing