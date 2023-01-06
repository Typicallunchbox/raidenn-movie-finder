import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Footer() {
  const { user } = useSelector((state) => state.auth);
 
  return (
    <>
    {user &&
    <footer className='footer'>
        <div className="links">
            <h3>Links</h3>
            <Link to='/'>
                <a>Home</a>
            </Link>
            <Link to='/settings'>
                <a>Profile Settings</a>
            </Link>
            <Link to='/watchlist'>
                <a>My Watchlist</a>
            </Link>
        </div>
        <div className="links">
            <h3>Creator</h3>
            <a href="https://github.com/Typicallunchbox/Typicallunchbox" target="_blank">Github</a>
        </div>
    </footer>}
    </>
  );
}

export default Footer;
