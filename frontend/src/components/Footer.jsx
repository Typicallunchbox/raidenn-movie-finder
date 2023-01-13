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
                <a href="/">Home</a>
                <a href="/settings">Profile Settings</a>
                <a href="/watchlist">My Watchlist</a>
        </div>
        <div className="links">
            <h3>Creator</h3>
            <a href="https://github.com/Typicallunchbox" target="_blank">Github</a>
        </div>
    </footer>}
    </>
  );
}

export default Footer;
