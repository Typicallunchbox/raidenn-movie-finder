import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from "./components/Register/Register";
import ErrorPage  from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login2 from "./components/Login/Login"
import Home from "./pages/Home"
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
            <Route path="/login" element={<Login2 />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path={`/movie/:id`} element={<Movie />} />
            <Route path={`/watchlist`} element={<Watchlist />} />
            <Route path={`/settings`} element={<Settings />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
