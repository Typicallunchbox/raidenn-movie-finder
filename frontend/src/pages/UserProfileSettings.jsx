import { React, useEffect, useState } from "react";
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'
// import {useSelector, useDispatch} from 'react-redux';


const UserProfileSettings = () => {
    return (
      <> 
        <div className="container">
            <h2>Profile Settings</h2>
            <div className="profile-settings w-2/6 text-left mx-auto mt-32">
                <div className="Input mb-5">
                    <p>Fullname</p>
                    <input type="text" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Fullname" required></input>
                </div>
                <div className="Input mb-5">
                    <p>Email</p>
                    <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Email" required></input>
                </div>
                <div className="Input mb-5">
                    <p>Password</p>
                    <input value={'*********'} type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-100 block w-full p-2.5" placeholder="Password" required></input>
                </div>
                <div className="Input mb-5">
                    <p>Genre Preferences</p>
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