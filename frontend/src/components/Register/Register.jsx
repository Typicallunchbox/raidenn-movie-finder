import React from 'react'
import './Register.scss'
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../../features/auth/authSlice'

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

    if(password !== password2){
      toast.error('Passwords do not match')
    }else{
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
        <h1>Register</h1>
        <input onChange={onChange} id='name' name='name' value={name} type="text" placeholder='Email your name' />
        <input onChange={onChange} id='email' name='email' value={email} type="email" placeholder='Email your email' />
        <input onChange={onChange} id='password' name='password' value={password} type="password" placeholder='Password' />
        <input onChange={onChange} id='password2' name='password2' value={password2} type="password" placeholder='Password' />
        <button onClick={onSubmit} type='submit' className='btn-primary'>Register</button>
      </div> 
    </div>
    </div>
  )
}
export default Login