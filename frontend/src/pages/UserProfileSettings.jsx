import { React, useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, updatePassword } from "../features/auth/authSlice";
import { reset as resetMovies } from "../features/movies/movieSlice";
import { reset as resetWatchlist } from "../features/watchlists/watchlistSlice";

const inputStyling =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full px-2.5 py-3";
const UserProfileSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [clickedResetPassword, setClickedResetPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading]= useState(false)
  const { user } = useSelector((state) => state.auth);
  const [viewGenres, setViewGenres] = useState(false);

  const [savedGenres, setSavedGenres] = useState([
    {genre:'action',isSelected:false},
    {genre:'adventure',isSelected:false},
    {genre:'drama',isSelected:false},
    {genre:'comedy',isSelected:false},
  ])

 
  useEffect(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    if (!user) {
      const exit = async() => {
        await delay(4000)
        setIsLoading(true);
        await delay(5000)
      
        navigate("/login");
      }
      exit();
    
      return;
    }
    
    setFormData({
      name: user?.name,
      email: user?.email,
      genrePreferences: ["action", "comedy"],
    });

    let tempGenrePreferences=["action", "comedy"];
    if (tempGenrePreferences.length > 0) {
      let temp = [...savedGenres]
      for (let i = 0; i < tempGenrePreferences.length; i++) {
        let genre = tempGenrePreferences[i].toLowerCase();
        temp.find((item, i) => {
          if (item.genre === genre) {
            temp[i]["isSelected"] = true;
            return true;
          }
          return false;
        });
      }
      setSavedGenres(temp);
      console.log('savedGenres:', savedGenres)
    }
  }, [user, navigate]);
  

  const onBlur = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const changePassword = async () => {
    setErrorMsg('')
    if (true) {
      let resp = await updatePassword({
        confirmPassword,
        password: newPassword,
      });

      if (resp?.status === "OK") {
        setMsg('You will be logged out shortly...')
        dispatch(logout());
        dispatch(reset());
        dispatch(resetWatchlist());
        dispatch(resetMovies());
      } 
      else 
      {
        if(resp?.error){
            setErrorMsg(resp.error);
        }
      }
    }
  };

  const changeUserDetails = () => {
    //empty for now
  };

  const updateGenreOptions = (index) => {
    let tempGenres = null;
    tempGenres = [...savedGenres];
    if(tempGenres[index]["isSelected"]){
      tempGenres[index]["isSelected"] = false;
    }else{
      tempGenres[index]["isSelected"] = true;
    }
    setSavedGenres(tempGenres);
  }

  if(isLoading){
    return <Spinner label="Redirecting back to login." />
  }

  return (
    <>
      <div className='container absolute top-2/4 -translate-y-2/4'>
        <h1 className='mt-0 text-[30px] font-mediumLC tracking-[3px]'>
          Profile Settings
        </h1>

        <div className='profile-settings w-5/6 md:w-2/6 text-left mx-auto mt-10'>
          <div className='mb-5'>
            <p>Username</p>
            <input disabled
              onBlur={(e) => onBlur(e)}
              defaultValue={formData.name}
              type='text'
              name='name'
              id='name'
              className={inputStyling}
              placeholder='Fullname'
              required
            ></input>
          </div>
          <div className='mb-5'>
            <p>Email</p>
            <input
              disabled
              onBlur={(e) => onBlur(e)}
              defaultValue={formData.email}
              type='text'
              name='email'
              id='email'
              className={inputStyling}
              placeholder='Email'
              required
            ></input>
          </div>
          <div className='mb-5'>
            <p>
              {clickedResetPassword ? "Confirm Current Password" : "Password"}
            </p>
            <div className='flex relative'>
              <input
                onBlur={(e) => setconfirmPassword(e.target.value)}
                disabled={!clickedResetPassword}
                type='password'
                id='password'
                className={inputStyling}
                placeholder='*******'
                required
              ></input>
              <p
                onClick={() => {
                  setClickedResetPassword(!clickedResetPassword);
                  setErrorMsg("");
                }}
                disabled={clickedResetPassword}
                className='b-text-colour absolute right-2 top-2 hover:cursor-pointer'
              >
                {clickedResetPassword ? "Cancel" : "Reset"}
              </p>
            </div>
          </div>
          {clickedResetPassword && (
            <div className='mb-5 '>
              <p>New Password</p>
              <div className='flex relative'>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!clickedResetPassword}
                  type='password'
                  id='newPassword'
                  className={inputStyling}
                  placeholder='Password'
                  required
                ></input>
              </div>
            </div>
          )}
          <div className='mb-5'>
            {savedGenres && (
              <>
                <p>Genre Preferences</p>
                <div className='genres flex gap-5 mt-2 bg-slate-400 w-full px-5'>
                  {savedGenres.map((item,i) => {
                    console.log('item:', item)
                    if(item.isSelected){
                      return <p onClick={()=>updateGenreOptions(i)} className="py-2 px-4 border-white text-white border-2 bg-transparent rounded-lg cursor-pointer select-none" key={item.genre}>{item.genre}</p>
                    }
                    else{
                      return <p onClick={()=>updateGenreOptions(i)} className="py-2 px-4 border-gray-500 text-gray-500 border-2 bg-transparent rounded-lg cursor-pointer select-none" key={item.genre}>{item.genre}</p>
                    }
                    })}
                  {/* <p onClick={()=>{showGenreOptions()}} className="cursor-pointer text-blue-400 text-sm py-2 px-4 hover:text-white">+ Add Genre</p> */}
                </div>
              </>
            )}
            {/* multi-select dropdown display div of all selected genres */}
          </div>
          <div className='w-full text-right'>
            <button
              disabled={msg}
              hidden={!clickedResetPassword}
              onClick={() => {
                clickedResetPassword ? changePassword() : changeUserDetails();
              }}
              className='px-6'
            >
              {clickedResetPassword ? "Update Password" : "Save Changes"}
            </button>
          </div>
          <p className='text-sm pt-6 pl-2'>{msg}</p>
          <p className='text-sm text-rose-500 pt-6 pl-2'>{errorMsg}</p>
        </div>
      </div>
    </>
  );
};
export default UserProfileSettings;
