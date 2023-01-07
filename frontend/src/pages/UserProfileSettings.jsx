import { React, useEffect, useState } from "react";
// import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import { logout, reset, updatePassword } from '../features/auth/authSlice';
import {reset as resetMovies} from "../features/movies/movieSlice"
import {reset as resetWatchlist} from "../features/watchlists/watchlistSlice";


const inputStyling = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5'
const UserProfileSettings = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({});
    const [clickedResetPassword, setClickedResetPassword] = useState(false);
    const [confirmPassword, setconfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    
    const {user} = useSelector((state) => state.auth)

    if(!user){
        navigate('/login')
    }

    // DO API CALL HERE AS IT SHOWS LOCALSTORAGE INSTEAD OF NEW NAME
    useEffect(() => {
        setFormData({name : user.name, email: user.email, genrePreferences : ['action', 'comedy']})
    }, [user])

    const onBlur = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const changePassword = async() => {
        // regex validate password strength
        if(true){
            let resp = await updatePassword({confirmPassword, password: newPassword});
            console.log('resp:', resp)
            

            if(resp?.status === 'OK'){
                dispatch(logout())
                dispatch(reset())
                dispatch(resetWatchlist())
                dispatch(resetMovies())
            
                window.scrollTo(0, 0);
                navigate('/')
            }else{
                setErrorMsg(resp);
            }
            
        }
    }

    const changeUserDetails = () => {
        //empty for now
    }
    return (
      <> 
        <div className="container">
        <h1 className="mt-52">Profile Settings</h1>

            <div className="profile-settings w-5/6 md:w-2/6 text-left mx-auto mt-10">

                <div className="Input mb-5">
                    <p>Fullname</p>
                    <input disabled={clickedResetPassword} onBlur={(e) => onBlur(e)} defaultValue={formData.name} type="text" name="name" id="name" className={inputStyling} placeholder="Fullname" required></input>
                </div>
                <div className="Input mb-5">
                    <p>Email</p>
                    <input disabled onBlur={(e) => onBlur(e)} defaultValue={formData.email} type="text" name="email" id="email" className={inputStyling} placeholder="Email" required></input>
                </div>
                <div className="Input mb-5">
                    <p>{clickedResetPassword ? 'Confirm Current Password' : 'Password'} </p>
                    <div className="flex relative">
                        <input onChange={(e) => setconfirmPassword(e.target.value)} disabled={!clickedResetPassword} defaultValue={clickedResetPassword ? '' : '**********'} type="password" id="password" className={inputStyling} placeholder="Password" required></input>
                        <p onClick={() => {setClickedResetPassword(!clickedResetPassword); setErrorMsg('')}} disabled={clickedResetPassword} className="b-text-colour absolute right-2 top-2 hover:cursor-pointer">{clickedResetPassword ? 'Cancel' : 'Reset'}</p>
                    </div>
                </div>
                {clickedResetPassword && 
                <div className="Input mb-5 ">
                    <p>New Password</p>
                    <div className="flex relative">
                        <input onChange={(e) => setNewPassword(e.target.value)} disabled={!clickedResetPassword} type="password" id="password" className={inputStyling} placeholder="Password" required></input>
                    </div>
                </div>}
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
                <button onClick={() => { changePassword()}} className="px-6">{clickedResetPassword ? 'Update Password' : 'Save Changes'}</button>
                <p className="text-sm text-rose-500 pt-6 pl-2">{errorMsg}</p>

            </div>
        </div>
      </>
      );
};
export default UserProfileSettings