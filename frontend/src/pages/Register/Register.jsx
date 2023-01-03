import './Register.scss'
import React from 'react'
import {toast} from 'react-toastify'
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
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
      <div className='px-12 pt-6'>
        <h1 className='bk-text-colour' style={{fontFamily: 'ThunderBoldLC', fontSize: '35px', letterSpacing:'3px'}} >Register</h1>
        <input onChange={onChange} id='name' name='name' value={name} type="text" placeholder='Enter your username' />
        <input onChange={onChange} id='email' name='email' value={email} type="email" placeholder='Enter your email' />
        <input onChange={onChange} id='password' name='password' value={password} type="password" placeholder='Password' />
        <input onChange={onChange} id='password2' name='password2' value={password2} type="password" placeholder='Password Confirm' />
      </div>
        <button onClick={onSubmit} type='submit' className='btn-primary'>Register</button>
        <div>
          <p className='my-12'></p>
        </div>
      </div> 
    </div>
    </div>
  )
}
export default Login