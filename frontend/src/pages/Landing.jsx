import { React, useEffect, useState } from "react";
import placeholder from '../static/images/wire.png'
import landingAnimation from '../static/animations/webRgb.webm'

const Landing = () => {
  // function scrollPlay() {
  //   var scrollTop = document.querySelector(".container").scrollTop;
  //   var frameNumber = scrollTop/playbackConst;
  //   vid.currentTime = frameNumber;
  //   window.requestAnimationFrame(scrollPlay);
  // }

  useEffect(() => {
    var frameNumber = 0,
    playbackConst = 80, 
    setHeight = document.getElementById("set-height"), 
    vid = document.getElementById('v0'); 

    // dynamically set the page height according to video length
    vid.addEventListener('loadedmetadata', function() {
      // setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
    });

    // Use requestAnimationFrame for smooth playback
    function scrollPlay(){  
      var frameNumber  = window.pageYOffset/playbackConst;
      vid.currentTime  = frameNumber;
      window.requestAnimationFrame(scrollPlay);
    }

    window.requestAnimationFrame(scrollPlay);
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
          <button type="button" className="prim-button absolute bottom-0 left-0">Get Started</button>
          </div>
        </div>
      </div>
      <div className="instructions">
        <div>
          <img src={placeholder} alt='placeholder'></img>
        </div>
        <div className="setup-content">
          <div>
          <h3 className="text-left ml-14 mb-14">Steps to get started:</h3>
          <div className="flex mb-5">
            <span>1</span>
            <p className="ml-8 my-auto">Create your Raidenn profile</p>
          </div>
          <div className="flex mb-5">
            <span>2</span>
            <p className="ml-8 my-auto">Start finding and watchlisting movies</p>
          </div>
          <div className="flex mb-5">
            <span>3</span>
            <p className="ml-8 my-auto">Well...that's pretty much it</p>
          </div>
          <button className="prim-button mt-14">Lets Goooooo!</button>
        </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Landing