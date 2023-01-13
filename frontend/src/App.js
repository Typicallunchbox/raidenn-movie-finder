import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

function App() {
  const {user} = useSelector((state) => state.auth)

  return (
    <>
      <Router>
      <Header />
        <div className="header-gap">
          <Routes>
            {user ? <><Route path="/" element={<Home />} /></> : <><Route path="/" element={<Landing />} /></>}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
            {user &&
            <>
              <Route path="/about" element={<About />} />
              <Route path={`/movie/:id`} element={<Movie />} />
              <Route path={`/watchlist`} element={<Watchlist />} />
              <Route path={`/settings`} element={<Settings />} />
            </>
            }

          </Routes>
        </div>
        {/* {user && <div className="h-screen"></div>} */}
        <Footer/>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
