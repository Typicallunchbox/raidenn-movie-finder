import './Login.scss'
import React from 'react'
import {toast} from 'react-toastify'
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../../features/auth/authSlice'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  };

  return (
    <div>
      <div className='login_container'>
      <div className='inner-container'>
        <div className='px-12 pt-6'>
          <h1 className='bk-text-colour' style={{fontFamily: 'ThunderBoldLC', fontSize: '35px', letterSpacing:'3px'}} >Sign In</h1>
          <input onChange={onChange} id='email' name='email' value={email} type="email" placeholder='Enter your email' />
          <input onChange={onChange} id='password' name='password' value={password} type="password" placeholder='Password' />
        </div>
        <button onClick={onSubmit} type='submit' className='btn-primary'>Sign In</button>
        <div>
        <Link to='/register'>
          <p className='bk-text-colour my-4 text-xs'>New to Raidenn? <a className='bk-text-colour' href='/register'>Sign Up Now</a></p>
        </Link>
        </div>
      </div> 
    </div>
    </div>
  )
}
export default Login