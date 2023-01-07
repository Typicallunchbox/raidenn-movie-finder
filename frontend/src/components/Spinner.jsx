import React from 'react';
import loadingAnimation from '../static/animations/loadingAnimation.webm';


function Spinner(props) {
  const {label} = props
  return (
    <div className='loadingSpinnerContainer'>
        {/* <div className='loadingSpinner'></div> */}
        <div className='flex flex-col'>
          <video className={`w-24 h-24 mx-auto`} autoPlay loop muted>
                <source type="video/webm" src={loadingAnimation}></source>
        </video>
        <p>{label}</p></div>
        
    </div>
  )
}

export default Spinner