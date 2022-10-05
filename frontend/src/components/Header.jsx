import { useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
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
    navigate('/')
  }

  return (
    <>

    <header className='header'>
      <div className='logo'>
        <Link to='/'>Raidenn</Link>
      </div>
      {user && 
      <div className="flex gap-12 justify-center ">
              <a href="/" className="text-gray-500 hover:text-gray-700">
                 My Watchlist
              </a>
              <a className="text-gray-500 hover:text-gray-700" onClick={() => {setOpenSearchTab(true)}}>
                 Search
              </a>
            </div>}
      <ul>
        {user ? (
          <>
            <li>
              <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                Login
                <FaSignInAlt />
              </Link>
            </li>
            <li>
              <Link to='/register'>
                Register
                <FaUser />
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
