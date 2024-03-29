import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import placeholder from '../static/images/wire.png';
import landingAnimation from '../static/animations/webRgb.webm';
import InfoAnimation from '../static/animations/landingInfoAnimation.webm';


const Landing = () => {
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
  
  return (
    <> 
      <div id="set-height"></div>
      <p id="time"></p>
      <video disableremoteplayback="true" style={{opacity: '5%'}} id="v0" tabindex="0" autobuffer="autobuffer" preload="preload">
        <source type="video/webm" src={landingAnimation}></source>
      </video>
      <div className="container">
        <Link to='/about' className="fixed right-10 bottom-10 hover:w-20 flex gap-2 items-center ">
          <FaInfoCircle className="h-6 w-6 mt-1" /> 
          About
        </Link>
        <div className="overflow-x-hidden h-screen">
          <div className="inner-container relative top-24 left-0 md:flex  md:left-24 md:top-[30%] md:-translate-y-[30%]">
            <div>
            <video disableremoteplayback="true"  width={window.innerWidth < 600 ? '100%' : '920'} autoplay="autoplay" muted>
              <source src={process.env.PUBLIC_URL + window.innerWidth < 600 ? "animations/mobileLandingAnimation.webm" : "animations/landingAnimation.webm"} type="video/webm" />
            </video> 
            </div>
            <div className="relative">
            <a data-aos="fade-right" data-aos-delay="500" data-aos-duration="1000" href="#instructions" type="button" className={`prim-button w-max absolute bottom-16`}>Get Started</a>
            </div>
          </div>
        </div>
        <div className={`instructions h-[80vh] md:flex md:w-5/6 md:mx-auto md:mt-[20rem]`}>
          <div className="animation-container mx-auto">
            <video muted disableremoteplayback="true" style={{opacity: '90%'}} tabindex="0" autoPlay loop autobuffer="autobuffer" preload="preload">
              <source type="video/webm" src={InfoAnimation}></source>
            </video>
          </div>
          <div className={`setup-content`}>
            <h3 id='instructions' className="text-left mt-10 md:mt-0 ml-10 md:ml-14 mb-14">Steps to get started:</h3>
            <div data-aos="fade-up" data-aos-delay="500" data-aos-duration="500" className={`flex mb-5`}>
              <span>1</span>
              <p className="ml-8 my-auto">Create your Raidenn profile</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="700" data-aos-duration="500" className={`flex mb-5`}>
              <span>2</span>
              <p className="ml-8 my-auto">Start finding and watchlisting movies</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="900" data-aos-duration="500" className={`flex mb-5`}>
              <span>3</span>
              <p className="ml-8 my-auto">Well...that's pretty much it</p>
            </div>
            <Link to='/register'>
              <button data-aos="fade-up" data-aos-delay="500" data-aos-duration="1500" className={`prim-button my-14`}>
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