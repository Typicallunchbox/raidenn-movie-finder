import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
import Register from "./components/Register/Register";
import ErrorPage  from "./pages/ErrorPage";
import Header from "./components/Header";
import Login2 from "./components/Login/Login"
import Home from "./pages/Home"

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/register" element={<Register />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/login" element={<Login2 />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
