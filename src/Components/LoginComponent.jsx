import React from 'react'
import { Link } from 'react-router-dom'

const LoginComponent = ({ target_user, timestamp }) => {
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
            <input className="name-input" placeholder="Enter your Email" />
          </div>
        </div>
        <div className="information-box3">
          <div className="information-box-child" />
          <div className="password-label">
            <input className="name-input" placeholder="Enter your Password" />
          </div>
        </div>
      </div>

      <div className="forgot-password">
        <span><Link to='/reset_password'>Forgot your password?</Link></span>
      </div>

      <div className="log-in-button">
        <div className="log-in-button-child" />
        <div className="log-in-btn">Login</div>
      </div>
      <div className="already-have-account">
        <span>{`Don't have an account ? `}</span>
        <span className="sign-in"><Link to={`/${target_user}/signup`}>signup </Link> </span>
      </div>
    </div>
  )
}

export default LoginComponent
