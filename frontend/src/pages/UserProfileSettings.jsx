import { React, useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, updatePassword } from "../features/auth/authSlice";
import { reset as resetMovies } from "../features/movies/movieSlice";
import { reset as resetWatchlist } from "../features/watchlists/watchlistSlice";

const inputStyling =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5";
const UserProfileSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [clickedResetPassword, setClickedResetPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading]= useState(false)

  const { user } = useSelector((state) => state.auth);

 

  useEffect(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    if (!user) {
      const exit = async() => {
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

        dispatch(logout());
        dispatch(reset());
        dispatch(resetWatchlist());
        dispatch(resetMovies());

      } else {
        if(resp?.error){
            setErrorMsg(resp.error);
        }
      }
    }
  };

  const changeUserDetails = () => {
    //empty for now
  };


  if(isLoading){
    return <Spinner label="Redirecting back to login." />
  }

  return (
    <>
      <div className='container'>
        <h1 className='mt-52'>Profile Settings</h1>

        <div className='profile-settings w-5/6 md:w-2/6 text-left mx-auto mt-10'>
          <div className='Input mb-5'>
            <p>Fullname</p>
            <input
              disabled={clickedResetPassword}
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
          <div className='Input mb-5'>
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
          <div className='Input mb-5'>
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
                placeholder='*'
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
            <div className='Input mb-5 '>
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
          {/* <div className="Input mb-5">
                    {formData.genrePreferences && <>
                        <p>Genre Preferences</p>
                        <div className="genres flex gap-5 ml-5">
                            {formData.genrePreferences.map((genre)=>(
                                <p key={genre}>{genre}</p>
                            ))}
                        </div>
                    </>}
                    multi-select dropdown
                    display div of all selected genres
                </div> */}
          <button
            onClick={() => {
              clickedResetPassword ? changePassword() : changeUserDetails();
            }}
            className='px-6'
          >
            {clickedResetPassword ? "Update Password" : "Save Changes"}
          </button>
          <p className='text-sm text-rose-500 pt-6 pl-2'>{errorMsg}</p>
        </div>
      </div>
    </>
  );
};
export default UserProfileSettings;
