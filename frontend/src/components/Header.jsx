import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import SearchDropDown from "./SearchDropDown/SearchDropDown";
import {reset as resetMovies} from "../features/movies/movieSlice"
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import {reset as resetWatchlist} from "../features/watchlists/watchlistSlice"

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openSearchTab, setOpenSearchTab] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);


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
  }

  return (
    <>

    <header className={`header ${window.location.origin + "/" === window.location.href && !user ? 'bg-transparent' : 'primary-bg-colour'}`}>
      <div className='logo'>
        <Link className="tertiary-text-colour" style={{fontFamily: 'ThunderBoldLC', fontSize: '35px'}}  to='/'>Raidenn</Link>
      </div>
      {user && 
      <div className="flex gap-12 justify-center ">
              <Link to='/watchlist' className="tertiary-text-colour">
                My Watchlist
              </Link>
              <a className="tertiary-text-colour" onClick={() => {setOpenSearchTab(!openSearchTab)}}>
                 Search
              </a>
            </div>}
      <ul>
        {user ? (
          <>
            {/* <li>
              <a className="tertiary-text-colour hover:text-gray-700" onClick={onLogout}>
               Logout &nbsp; <FaSignOutAlt />
              </a>
            </li> */}
            <div className="options-block">
              <div onClick={clickedMenu} className="options-container-btn">
                <div className={`inner-container ${openMenu ? 'is-open' : ''}`}>
                  <p>Menu</p>
                </div>
              </div>
              <div className={`options-menu ${openMenu ? 'is-open' : ''}`}></div>
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
