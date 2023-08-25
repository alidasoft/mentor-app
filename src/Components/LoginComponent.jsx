import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from "aws-amplify";


const LoginComponent = ({ target_user, timestamp }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleInput = (e) => {
    if (e.target.placeholder === 'Enter your Email') {
      setEmail(e.target.value)
    }
    if (e.target.placeholder === 'Enter your Password') {
      setPassword(e.target.value)
    }

  }
  const handleSubmit = () => {
    const user = {
      email,
      password
    }
    console.log(user)
  }
  return (
    <div className="login">
      <div className="ellipse" />
      <div className="icon-system">
        <img className="vector-icon" alt="" src="/vector.svg" />
        <img className="vector-icon1" alt="" src="/vector1.svg" />
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <b className="timestamp">{timestamp}</b>
      </div>
      <img className="logo-image" alt="guineansyouthorganization" src="/logo.png" />
      <div className="information" />
      <div className="banner">{target_user} Login</div>

      <img className="undraw-mobile-ux" alt="" src="/undraw-mobile-ux.svg" />

      <div className="login-details">
        <div className="information-box2">
          <input className="name-input" placeholder="Enter your Email" value={email} name='email' onChange={handleInput} />
        </div>
        <div className="information-box3">
          <input className="name-input" placeholder="Enter your Password" value={password} name='password'  onChange={handleInput} />
        </div>
      </div>
      <div className="forgot-password">
        <span><Link to='/reset_password'>Forgot your password?</Link></span>
      </div>

      <div className="btn btn-button">
        <button className="button-text" onClick={() => Auth.signIn(email, password)}>Login</button>
      </div>
      <div className="dont-have-account">
        <span>{`Don't have an account ? `}</span>
        <Link to={`/${target_user}/signup`}>Sign-up</Link>
      </div>
      <div className="home">
        <Link to={`/`}>homepage</Link>
      </div>
    </div>
  )
}

export default LoginComponent