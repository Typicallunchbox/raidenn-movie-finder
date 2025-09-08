import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import Register from "./pages/Register/Register";
import ErrorPage  from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Movie from "./pages/Movie";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/UserProfileSettings";
import Landing from "./pages/Landing";
import AOS from 'aos';
import { useEffect } from "react";

function App() {
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    AOS.init({
      once: true,
      startEvent: 'load',
      delay: 0
    });
  }, []);

  return (
    <>
      <Router>
      <Header />
        <div className="main">
          <Routes>
            {user ? <><Route path="/" element={<Home />} /></> : <><Route path="/" element={<Landing />} /></>}
            <Route path="/register" element={<Register title="Register"/>} />
            <Route path="/login" element={<Login title="Login"/>} />
            <Route path="*" element={<ErrorPage title="Error"/>} />
            <Route path="/about" element={<About title="About"/>} />

            {user &&
            <>
              <Route path={`/movie/:id`} element={<Movie />} />
              <Route path={`/watchlist`} element={<Watchlist title="Watchlist"/>} />
              <Route path={`/settings`} element={<Settings title="Settings"/>} />
            </>
            }

          </Routes>
        </div>
        <Footer/>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
