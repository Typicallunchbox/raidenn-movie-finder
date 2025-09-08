import { useState } from 'react';
import blueLightning from '../static/animations/aboutUsLightning.webm';
import Meta from "../components/MetaTag/MetaTag";


const About = (props) => {
  const {title} = props;
  const [hover, setHover] = useState(false);

  const triggerAnimation = () => {
      setHover(true);
      let vid = document.getElementById("blueLightning");
      vid.currentTime = 0;
      vid.play();
  }
  
  return (
    <div className='about-page w-full'>
      <Meta title={`Raidenn ${'- '+ title || ''}`} />
      
      <div className='about-text w-96 absolute'>
        <h2 className='text-2xl'>Raidenn</h2>
        <p className='mt-12 leading-6 text-gray-400'>
          Raidenn is a project which was created as a portfolio piece. It was
          also to be a challenge as new packages were used in Raidenn the
          creator had never used before. It will be going through many version
          updates, which will include improvements to the UX as well as new
          backend functionality. The premise of this project for the creator was
          also o practise his design skills and animation skills. All clip
          animations(WebM Format) on the site were hand crafted for this
          project. Any and all feedback is welcome on this project, drop me an
          email and I will be sure to check it out.
        </p>

        <p className='mt-10 text-sm text-slate-500'>
          "Experience is a master teacher, even when it’s not our own"
        </p>
      </div>
      <div className='bgVideo'></div>
      <video
        muted
        id='blueLightning'
        className={`absolute right-0 ${hover ? "is-open" : ""}`}
        tabindex='0'
        autobuffer='autobuffer'
        preload='preload'
      >
        <source type='video/webm' src={blueLightning}></source>
      </video>
      <h3
        onClick={() =>
          (window.location = "mailto:keegan.launspach1@hotmail.com")
        }
        onMouseLeave={() => setHover(false)}
        onMouseOver={() => triggerAnimation()}
        className={`h-max p-4 contact-me absolute`}
      >
        Contact Me
      </h3>
    </div>
  );
};

export default About