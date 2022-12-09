import { useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import {reset as resetWatchlist} from "../features/watchlists/watchlistSlice"
import { useNavigate } from "react-router-dom";
import SearchDropDown from "./SearchDropDown/SearchDropDown";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openSearchTab, setOpenSearchTab] = useState(false);

  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    dispatch(resetWatchlist())
    
    navigate('/')
  }

  return (
    <>

    <header className='header'>
      <div className='logo'>
        <Link className="tertiary-text-colour" style={{fontFamily: 'ThunderBoldLC', fontSize: '35px'}}  to='/'>Raidenn</Link>
      </div>
      {user && 
      <div className="flex gap-12 justify-center ">
              <Link to='/watchlist' className="tertiary-text-colour">
                <a>My Watchlist</a>
              </Link>
              <a className="tertiary-text-colour" onClick={() => {setOpenSearchTab(!openSearchTab)}}>
                 Search
              </a>
            </div>}
      <ul>
        {user ? (
          <>
            <li>
              <a className="tertiary-text-colour hover:text-gray-700" onClick={onLogout}>
               Logout &nbsp; <FaSignOutAlt />
              </a>
            </li>
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
