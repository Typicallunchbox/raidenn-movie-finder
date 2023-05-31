import './Login.scss'
import React from 'react'
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../../features/auth/authSlice';
import ForgotPassword from '../../components/ForgotPassword';



const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;
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

      const redirect = async() => {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        setIsLoading(true);
        await delay(1000)
        setIsLoading(false);
        navigate('/')

      }
      redirect();
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

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div data-aos="fade-up" data-aos-duration="800" className='login_container'>
        <div className='inner-container'>
          {!showForgotPassword ? (<div>
          <div  className='px-12 pt-6'>
            <h1
              className='bk-text-colour mb-6 text-[35px] font-thunderBoldLC tracking-[3px]'
            >
              Sign In
            </h1>
            <input
              onKeyDown={(e) => {
                if (e.code === 'Enter') {
                  onSubmit(e)
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
            <div className='w-full relative text-right mb-6'>
              <Link onClick={()=>{setShowForgotPassword(true)}} to='#' className='bk-text-colour text-xs underline bk-text-colour'>
                  Forgot Password?
              </Link>
            </div>
          </div>
          <button onClick={onSubmit} type='submit' className='btn-primary'>
            Sign In
          </button>
          <div>
            <Link to='/register'>
              <p className='bk-text-colour my-4 text-sm underline bk-text-colour'>
                Create an Account
              </p>
            </Link>
          </div>
          </div>)
          : 
        (<div>
          <ForgotPassword />
        </div>)}
        </div>
      </div>
    </div>
  );
}
export default Login