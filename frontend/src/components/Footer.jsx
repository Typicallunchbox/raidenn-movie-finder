import { useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import SearchDropDown from "./SearchDropDown/SearchDropDown";

function Footer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [openSearchTab, setOpenSearchTab] = useState(false);
 
  return (
    <>
    {user &&
    <footer className='footer'>
        <div className="links">
            <h3>Links</h3>
            <a href="/">Home</a>
            <a href="/settings">Profile Settings</a>
            <a href="/watchlist">My Watchlist</a>
        </div>
        <div className="links">
            <h3>Creator</h3>
            <a href="https://github.com/Typicallunchbox/Typicallunchbox" target="_blank">Github</a>
            {/* <a href="/">Profile Settings</a>
            <a href="/">My Watchlist</a> */}
        </div>
    </footer>}
    </>
  );
}

export default Footer;