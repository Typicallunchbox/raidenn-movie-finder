import { React, useEffect, useState } from "react";
import Spinner from '../components/Spinner';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, updatePassword, getMe, updateProfile } from "../features/auth/authSlice";
import { GetGenreOptions } from "../providers/moviesProvider";
import Meta from "../components/MetaTag/MetaTag";


const inputStyling =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full px-2.5 py-3";
const UserProfileSettings = (props) => {
  const {title} = props;
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
  const [savedGenres, setSavedGenres] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const delay = ms => new Promise(res => setTimeout(res, ms));
 
  useEffect(() => {
    if (!user) {
        navigate("/login");
    }
    
    let response = null;
    const getUserProfile = async() => {
       response = await getMe();

       setFormData({
        name: response.name,
        email: user?.email,
        genrePreferences: response.genrePreferences,
      });

      const genreOptions =  await GetGenreOptions();
      if(genreOptions.length > 0){
         let temp = genreOptions.map(obj => ({ ...obj, isSelected: false }))
         setGenreOptions(temp);
      }

      if (response.genrePreferences.length > 0) {
        let temp = [...genreOptions]
        for (let i = 0; i < response.genrePreferences.length; i++) {
          let genre = response.genrePreferences[i];

          for (let index = 0; index < temp.length; index++) {
            const item = temp[index];
            if(item.name === genre.name){temp[i]["isSelected"] = true; break;}
            else{temp[i]["isSelected"] = false;}
          }
        }
        setGenreOptions(temp);
       }
    }
    getUserProfile();
  }, [user, navigate]);
  

  const onBlur = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const changePassword = async () => {
    setErrorMsg('')
    if (confirmPassword !== '' && newPassword !== '') {
      let resp = await updatePassword({
        confirmPassword,
        password: newPassword,
      });

      if (resp?.status === "OK") {
        setMsg('You will be logged out shortly...');
        await delay(4000)
        setIsLoading(true);
        await delay(5000)

        dispatch(logout());
        navigate("/login");
      } 
      else {
        setMsg(resp);
      }
    }
  };

  const changeUserDetails = async() => {
    let payload = {}

    if(formData.name !== ''){
      payload.name = formData.name
    }

    if (savedGenres.length > 0) {
      let genresSelected = []
      genresSelected = [...savedGenres.filter(genre => genre.isSelected === true)];
      payload.genresPref = genresSelected;
    }   
    let response = await updateProfile({profile: payload});

    if(response?.status === 'OK'){
      setMsg('Updated Profile!')
      setTimeout(()=> {setMsg('')},5000)
    }
    else{
      setMsg('Something went wrong :(')
      setTimeout(()=> {setMsg('')},5000)
    }
  };

  const updateGenreOptions = (index) => {
    let tempGenres = null;
    tempGenres = [...genreOptions];
    tempGenres[index]["isSelected"] = !tempGenres[index]["isSelected"]
    setSavedGenres(tempGenres);
  }

  if(isLoading){
    return <Spinner label="Redirecting back to login." />
  }

  return (
    <>
      <Meta title={`Raidenn ${'- '+ title || ''}`} />
      <div className='container absolute top-2/4 -translate-y-2/4'>
        <h1 className='mt-0 text-[30px] font-mediumLC tracking-[3px]'>
          Profile Settings
        </h1>

        <div className='profile-settings w-5/6 md:w-4/6 lg:w-2/6 text-left mx-auto mt-10'>
          <div className='mb-5'>
            <p>Username</p>
            <input 
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
                id='currentPassword'
                className={inputStyling}
                placeholder='*******'
                required
              ></input>
              <p
                onClick={() => {
                  setClickedResetPassword(!clickedResetPassword);
                  setViewGenres(false);
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
          {!clickedResetPassword && <div className='mb-20'>
            {genreOptions && (
              <>
                <p>Genre Preferences</p>
                <div className={`genres flex flex-wrap gap-5 mt-2 w-full px-5 ${clickedResetPassword ? 'opacity-10':''}`}>
                  {genreOptions.map((item,i) => {
                    if(item.isSelected){
                      return <p onClick={()=>updateGenreOptions(i)} className="text-sm py-2 px-4 border-white text-white border-2 bg-transparent rounded-lg cursor-pointer select-none" key={item.id}>{item.name}</p>
                    }
                    else{
                      if(viewGenres){
                        return <p onClick={()=>updateGenreOptions(i)} className="text-sm py-2 px-4 border-gray-500 text-gray-500 border-2 bg-transparent rounded-lg cursor-pointer select-none" key={item.id}>{item.name}</p>
                      }
                    }
                    return true;
                    })}
                  <p onClick={()=>{setViewGenres(!viewGenres)}} className={`cursor-pointer rounded-lg text-sm py-2 px-4 hover:text-white ${viewGenres ? 'bg-blue-400 text-white':'text-blue-400'}`}>{viewGenres ? 'Confirm' : '+ Add Genre'}</p>
                </div>
              </>
            )}
            {/* multi-select dropdown display div of all selected genres */}
          </div>}
          <div className='w-full text-right'>
            <button
              disabled={msg || viewGenres}
              // hidden={!clickedResetPassword}
              onClick={() => {
                clickedResetPassword ? changePassword() : changeUserDetails();
              }}
              className={`px-6 bg-blue-400 ${viewGenres ? 'opacity-25' : ''}`}
            >
              {clickedResetPassword ? "Update Password" : "Save Changes"}
            </button>
            <p className='text-sm pt-6 pl-2'>{msg}</p>
            <p className='text-sm text-rose-500 pt-6 pl-2'>{errorMsg}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfileSettings;
