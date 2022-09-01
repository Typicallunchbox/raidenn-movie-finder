import React from 'react'
import './Login.scss'
import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../../features/auth/authSlice'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(
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
        <h1>Sign In</h1>
        <input onChange={onChange} id='email' name='email' value={email} type="email" placeholder='Email your email' />
        <input onChange={onChange} id='password' name='password' value={password} type="text" placeholder='Password' />
        <button onClick={onSubmit} type='submit' className='btn-primary'>Sign In</button>
        <div>
          <p>New to Netflix? <a href='*'> Sign Up Now</a></p>
        </div>
      </div> 
    </div>
    </div>
  )
}
export default Login