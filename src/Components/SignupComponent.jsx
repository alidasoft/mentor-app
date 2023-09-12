import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from "aws-amplify";
import { toast } from 'react-toastify';

import { Authenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';


const SignupComponent = ({ target_user, timestamp, getUserDetails }) => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  console.log("target", target_user)
  const [data, setData] = useState({
    name: '',
    family_name: '',
    email: '',
    password: '',
    groupName: target_user
  })
  const { name, family_name, email, password, groupName } = data
  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async () => {
    const user = { name, family_name, username: email, password }
    console.log(data)
    try {
      const response = await Auth.signUp({username: email, password, attributes: {name, family_name, 'custom:groupName': groupName}})
      console.log(response)
      if (response) {
        getUserDetails(user)
        navigate('/confirm')
        toast.success(`check email for confirmation code`)
      } else {
        console.log('error')
        toast.error(`${response.message}`)
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error.message}`)
      
    }
  }
  return (
    <div className="signup">
      <div className="ellipse" />
      <div className="icon-system">
        <img className="vector-icon" alt="" src="/vector.svg" />
        <img className="vector-icon1" alt="" src="/vector1.svg" />
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <b className="timestamp">{timestamp}</b>
      </div>
      <img className="logo-image" alt="guineansyouthorganization" src="/logo.png" />

      <div className="information" />
      <div className="banner">{target_user} Sign-up</div>
      <div className="information-security">
        Your information will remain secure
      </div>
      <div className="information-boxes">
        <div className="information-box">
          <input className="name-input" placeholder="Enter your Name" value={name} name='name' onChange={handleChange} />
        </div>
        <div className="information-box1">
          <input className="name-input" placeholder="Enter your Surname" name='family_name' value={family_name} onChange={handleChange} />
        </div>
        <div className="information-box2">
          <input className="name-input" placeholder="Enter your Email" value={email} name='email' onChange={handleChange} />
        </div>
        <div className="information-box3">
            <input className="name-input" placeholder="Enter your Password" value={password} name='password' onChange={handleChange} />
        </div>
        <div className="information-box4">
            <input className="name-input" type='hidden' name='job' value={groupName} onChange={handleChange} />
        </div>
      </div>
      <div className="btn btn-button">
        <button className="button-text" onClick={handleSubmit}>Sign Up</button>
      </div>
      <div className="already-have-account">
        <span>{`Already have an account? `}</span>
        <Link to={`/${target_user}/login`}>Login</Link>
      </div>
      <div className="home">
        <Link to={`/`}>homepage</Link>
      </div>
    </div>
  )
}

export default SignupComponent
