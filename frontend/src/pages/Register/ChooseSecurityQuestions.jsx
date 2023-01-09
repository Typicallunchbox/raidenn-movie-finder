import './Register.scss'
import React from 'react'
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../../features/auth/authSlice';
import { validUserName, validEmail, validPasswordStrength } from '../../static/regex'


const Login = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isError, isSuccess, message} = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if(isError){
      toast.error(message)
    }

    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())

  },[user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault()

    if(!validUserName.test(name.trim())){toast.error('Username should be between 4 - 25 Characters (No Special Characters)'); return;}
    if(!validEmail.test(email.trim())) {toast.error('Enter in a valid email'); return;}


    if(!validPasswordStrength.test(password.trim())){
      toast.error('Please make a more complex password(Uppercase & Lowercase letters, minimum 7 characters, 1 Number & Special character)')
    }else if(password.trim() !== password2.trim()){
      toast.error('Passwords do not match')    }

  
    else{
      const userData = {
        name,
        email,
        password,
        password2
      }

      dispatch(register(userData))
    }
  };

  return (
    <div>
      <div className='login_container'>
        <div className='inner-container'>
          <div className='px-12 pt-6'>
            <h1
              className='bk-text-colour'
              style={{
                fontFamily: "ThunderBoldLC",
                fontSize: "35px",
                letterSpacing: "3px",
              }}
            >
              Register
            </h1>
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  onSubmit(e);
                }
              }}
              onChange={onChange}
              id='name'
              name='name'
              value={name}
              type='text'
              placeholder='Enter your username'
            />
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  onSubmit(e);
                }
              }}
              onChange={onChange}
              id='email'
              name='email'
              value={email}
              type='email'
              placeholder='Enter your email'
            />
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  onSubmit(e);
                }
              }}
              onChange={onChange}
              id='password'
              name='password'
              value={password}
              type='password'
              placeholder='Password'
            />
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  onSubmit(e);
                }
              }}
              onChange={onChange}
              id='password2'
              name='password2'
              value={password2}
              type='password'
              placeholder='Password Confirm'
            />
          </div>
          <button onClick={onSubmit} type='submit' className='btn-primary'>
            Save
          </button>
          <div>
            <Link to='/login'>
              <p className='bk-text-colour my-4 text-sm'>
                Already have an account?{" "}
                <p className='bk-text-colour underline'>Sign In</p>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login