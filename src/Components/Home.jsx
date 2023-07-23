import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({ timestamp }) => {
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
      <div className="information" />
        <div>
            <div className="banner">
                <div className="user-login">
                    <Link to={'/mentor/login'} className="user-login1">Mentor Login</Link>
                    <Link to={'/mentee/login'} className="user-login2">Mentee Login</Link>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Home
