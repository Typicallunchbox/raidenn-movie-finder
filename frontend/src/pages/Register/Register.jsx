import './Register.scss'
import React from 'react'
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../../features/auth/authSlice';
import { validUserName, validEmail, validPasswordStrength } from '../../static/regex';
import RegisterSecurityQuestions from '../../components/RegisterSecurityQuestions';
import { Helmet, HelmetProvider } from "react-helmet-async";

const Register = (props) => {
  const {title} = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    securityQuestions: null
  });
  const [showMainRegister, setShowMainRegister] = useState(true);

  const { name, email, password, password2} = formData;

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

  const setUserData = (e) => {
    e.preventDefault()

    if(!validUserName.test(name.trim())){toast.error('Username should be between 4 - 25 Characters (No Special Characters)'); return;}
    if(!validEmail.test(email.trim())) {toast.error('Enter in a valid email'); return;}


    if(!validPasswordStrength.test(password.trim())){
      toast.error('Please make a more complex password(Uppercase & Lowercase letters, minimum 7 characters, 1 Number & Special character)')
    }else if(password.trim() !== password2.trim()){
      toast.error('Passwords do not match')    }

  
    else{
      setShowMainRegister(false);
    }
  };

  const registerUser = (data) => {
    const userData = {
        name,
        email,
        password,
        password2,
        securityQuestions : data
      }
    if(userData){
        dispatch(register(userData));
    }
  }

  return (
    <div>
      <HelmetProvider>
          <Helmet>
            <title>{`Raidenn ${'- '+ title || ''}`}</title>
          </Helmet>
      </HelmetProvider>
      <div className={`login_container  ${!showMainRegister ? 'w-10/12 md:w-4/12':''}`}>
        <div className='inner-container'>
          {showMainRegister ? (<div>
          <div className='px-12 pt-6'>
            <h1
              className='bk-text-colour mb-6 text-[35px] font-thunderBoldLC tracking-[3px]'
            >
              Register
            </h1>
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setUserData(e);
                }
              }}
              onChange={onChange}
              id='name'
              name='name'
              value={name}
              type='text'
              placeholder='Enter your username'
              className='mb-2'
            />
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setUserData(e);
                }
              }}
              onChange={onChange}
              id='email'
              name='email'
              value={email}
              type='email'
              placeholder='Enter your email'
              className='mb-2'
            />
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setUserData(e);
                }
              }}
              onChange={onChange}
              id='password'
              name='password'
              value={password}
              type='password'
              placeholder='Password'
              className='mb-2'
            />
            <input
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  setUserData(e);
                }
              }}
              onChange={onChange}
              id='password2'
              name='password2'
              value={password2}
              type='password'
              placeholder='Password Confirm'
              className='mb-6'
            />
          </div>
          <button onClick={setUserData} type='submit' className='btn-primary'>
            Register
          </button>
          <div>
            <Link to='/login'>
              <p className='bk-text-colour my-4 text-sm'>
                Already have an account?{" "}
                <p className='bk-text-colour underline'>Sign In</p>
              </p>
            </Link>
          </div>
        </div>) 
        : 
        (<div>
          <RegisterSecurityQuestions registerUser={registerUser}/>
        </div>)}
        </div>
      </div>
    </div>
  );
}
export default Register