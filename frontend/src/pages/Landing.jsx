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
        {/* <div className="promo-text">
          <div className="left-text">
            <h2></h2>
            <h2>Save</h2>
            <h2></h2>
          </div>
          <div className="right-text">
            <h2>Time</h2>
            <div>
              <h2>Raidenn</h2>
              <h4>To Your Bookmarks</h4>
            </div>
            <h2>Entertainment</h2>
          </div>
        </div> */}
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
      <div className="instructions"></div>
    </div>
    </>
  );
};
export default Landing