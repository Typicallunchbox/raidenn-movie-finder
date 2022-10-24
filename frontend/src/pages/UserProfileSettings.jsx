import { React, useEffect, useState } from "react";
// import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
const inputStyling = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5'
const UserProfileSettings = () => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const [formData, setFormData] = useState({});
    const {user} = useSelector((state) => state.auth)

    if(!user){
        navigate('/login')
    }

    useEffect(() => {
        setFormData({name : user.name, email: user.email, genrePreferences : ['action', 'comedy']})
    }, [user])

    const onBlur = (e) => {
        console.log(e.target.value)
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        console.log(formData)
    }
    return (
      <> 
        <div className="container">
        <h1 className="mt-52">Profile Settings</h1>

            <div className="profile-settings w-2/6 text-left mx-auto mt-10">

                <div className="Input mb-5">
                    <p>Fullname</p>
                    <input onBlur={(e) => onBlur(e)} defaultValue={formData.name} type="text" name="name" id="name" className={inputStyling} placeholder="Fullname" required></input>
                </div>
                <div className="Input mb-5">
                    <p>Email</p>
                    <input onBlur={(e) => onBlur(e)} defaultValue={formData.email} type="text" name="email" id="email" className={inputStyling} placeholder="Email" required></input>
                </div>
                <div className="Input mb-5">
                    <p>Password</p>
                    <input onBlur={(e) => onBlur(e)} disabled value={'*********'} type="text" id="password" className={inputStyling} placeholder="Password" required></input>
                </div>
                <div className="Input mb-5">
                    {formData.genrePreferences && <>
                        <p>Genre Preferences</p>
                        <div className="genres flex gap-5 ml-5">
                            {formData.genrePreferences.map((genre)=>(
                                <p>{genre}</p>
                            ))}
                        </div>
                    </>}
                    {/* multi-select dropdown */}
                    {/* display div of all selected genres */}
                </div>
                <button>Save Changes</button>
            </div>
        </div>
      </>
      );
};
export default UserProfileSettings