import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
      <img
        className="whatsapp-image"
        alt=""
        src="/whatsapp-image-20230613-at-2143-1@2x.png"
      />
      <div className="login-info" />
      <div className="login-banner">{target_user} Login</div>

      <img
        className="undraw-mobile-ux"
        alt=""
        src="/undraw-mobile-ux.svg"
      />
      
      <div className="login-details">
        <div className="information-box2">
          <div className="information-box-child" />
          <div className="email-label">
            <input className="name-input" placeholder="Enter your Email" value={email} onChange={handleInput} name='email' />
          </div>
        </div>
        <div className="information-box3">
          <div className="information-box-child" />
          <div className="password-label">
            <input className="name-input" placeholder="Enter your Password" value={password} onChange={handleInput} name='password' />
          </div>
        </div>
      </div>

      <div className="forgot-password">
        <span><Link to='/reset_password'>Forgot your password?</Link></span>
      </div>

      <div className="log-in-button">
        <div className="log-in-button-child" />
        <button className="log-in-button-child" onClick={handleSubmit}>Log in</button>
      </div>
      <div className="already-have-account">
        <span>{`Don't have an account ? `}</span>
        <span className="sign-in"><Link to={`/${target_user}/signup`}>signup </Link> </span>
      </div>
    </div>
  )
}

export default LoginComponent
