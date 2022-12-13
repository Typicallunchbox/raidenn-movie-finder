import { React, useEffect, useState } from "react";

const Landing = () => {
  function scrollPlay() {
    // var scrollTop = document.querySelector(".container").scrollTop;
    // var frameNumber = scrollTop/playbackConst;
    // vid.currentTime = frameNumber;
    // window.requestAnimationFrame(scrollPlay);
  }

  return (
    <> 
    <div className="container">
      <div className="landing-page">
        <div className="inner-container flex">
          <div>
          <video width="920" autoplay="autoplay">
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
          {/* video animation */}
        </div>
        <div className="content">
          <h3>Steps to get started:</h3>
          <div className="flex">
            <span>1</span>
            <p>Create your Raidenn profile</p>
          </div>
          <div className="flex">
            <span>2</span>
            <p>Start finding and watchlisting movies</p>
          </div>
          <div className="flex">
            <span>3</span>
            <p>Well...that's pretty much it</p>
          </div>
          <button className="prim-button">Lets Goooooo!</button>
        </div>
      </div>
    </div>
    </>
  );
};
export default Landing