import React from 'react';
import loadingAnimation from '../static/animations/loadingAnimation.webm';


function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
        {/* <div className='loadingSpinner'></div> */}
        <video className={`w-24 h-24`} autoPlay loop muted>
                <source type="video/webm" src={loadingAnimation}></source>
        </video>
    </div>
  )
}

export default Spinner