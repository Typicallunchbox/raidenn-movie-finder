import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import SearchDropDown from "./SearchDropDown/SearchDropDown";
import {reset as resetMovies} from "../features/movies/movieSlice"
import { FaSignInAlt, FaUser } from "react-icons/fa";
import {reset as resetWatchlist} from "../features/watchlists/watchlistSlice";
import btnAnimation from '../static/animations/menuBtnAnimation.webm';


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const { user } = useSelector((state) => state.auth);
  const [openSearchTab, setOpenSearchTab] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const openSearchMobile = () => {
    setOpenSearchTab(!openSearchTab);
    setOpenMenu(false);

  }


  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    dispatch(resetWatchlist())
    dispatch(resetMovies())

    window.scrollTo(0, 0);
    navigate('/')
  }

  const clickedMenu = () =>{
    setOpenMenu(!openMenu)

    if(window){
      return window.innerWidth < 600 ?   setOpenSearchTab(false) : ''
    }
  }

  useEffect(()=>{
    setOpenSearchTab(false)
    setOpenMenu(false);
  },[pathname])
    

  return (
    <>

    <header className={`header ${window.location.origin + "/" === window.location.href && !user ? 'bg-transparent' : 'primary-bg-colour'}`}>
      <div className='logo'>
        <a className="tertiary-text-colour" style={{fontFamily: 'ThunderBoldLC', fontSize: '35px'}}  href='/'>Raidenn</a>
      </div>
      {user && 
      <div className="flex gap-12 justify-center">
              <Link to='/watchlist' className="tertiary-text-colour hidden md:block" onClick={() => {setOpenSearchTab(false)}}>
                My Watchlist
              </Link>
              {window.location.origin + "/" === window.location.href && <Link to={'#'} className="tertiary-text-colour hidden md:block" onClick={() => {setOpenSearchTab(!openSearchTab)}}>
                 Search
              </Link>}
            </div>}
      <ul>
        {user ? (
          <>
            <div className="w-24"></div>
            <div className={`options-block ${openMenu ? 'is-open' : ''}`}>
              <div onClick={clickedMenu} className="options-container-btn">
             
                <div className={`inner-container ${openMenu ? 'is-open' : ''}`}>
                  <p>Menu</p>
                </div>
                <video  className={`absolute top-0 left-0 ${openMenu ? 'is-open' : ''}`} autoPlay loop muted>
                <source type="video/webm" src={btnAnimation}></source>
              </video>
              </div>
              <div className={`options-menu flex relative h-80 md:h-60 ${openMenu ? 'is-open' : 'hidden'}`}>
                <div className="block md:hidden">
                  <Link to={'#'} className="bk-text-colour mb-2 p-1 shader" onClick={() => {openSearchMobile()}}>
                    Search
                  </Link>
                </div>
                <Link onClick={() => {setOpenMenu(false); setOpenSearchTab(!openSearchTab);}} className="bk-text-colour mb-2 p-1 shader" to='/watchlist'>
                    My Watchlist 
                  </Link>
                <Link onClick={() => {setOpenMenu(false)}} className="bk-text-colour mb-2 p-1 shader" to='/settings'>
                  Profile 
                </Link>
                <Link onClick={() => {setOpenMenu(false)}} className="bk-text-colour shader p-1" to='/about'>
                  About 
                </Link>
                <Link onClick={() => {onLogout(); setOpenMenu(false)}} className="text-red-500 absolute bottom-5 right-5 " to='/'>
                  Logout 
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                Login &nbsp; <FaSignInAlt />
              </Link>
            </li>
            <li>
              <Link to='/register'>
                Register &nbsp; <FaUser />
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
    {user &&
    <SearchDropDown openSearch={openSearchTab} />}
    </>
  );
}

export default Header;
