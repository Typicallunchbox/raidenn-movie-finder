import { React, useEffect, useState } from "react";
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'
// import {useSelector, useDispatch} from 'react-redux';


const UserProfileSettings = () => {
    return (
      <> 
        <div className="container">
            <h2>Profile Settings</h2>
            <div className="profile-settings">
                <div className="Input">
                    <p>Fullname</p>
                    <input></input>
                </div>
                <div className="Input">
                    <p>Email</p>
                    <input></input>
                </div>
                <div className="Input">
                    <p>Password</p>
                    <input></input>
                </div>
                <div className="Input">
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