import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const SignupComponent = ({ target_user, timestamp }) => {
  const [value, setValue] = useState('')
  const [data, setData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    job: '',
  })
  const { name, surname, email, password, job } = data
  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    const user = { name, surname, email, password, job }
    console.log(user)
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
      <img
        className="whatsapp-image"
        alt=""
        src="/whatsapp-image-20230613-at-2143-1@2x.png"
      />
      <div className="signup-information" />
      <div className="signup-banner">{target_user} Sign-up</div>
      <div className="information-security">
        Your information will remain secure
      </div>
      <div className="information-boxes">
        <div className="information-box">
          <div className="information-box-child" />
          <div className="name-label">
            <input className="name-input" placeholder="Enter your Name" value={name} name='name' onChange={handleChange} />
          </div>
        </div>
        <div className="information-box1">
          <div className="information-box-child" />
          <div className="surname-label">
            <input className="name-input" placeholder="Enter your Surname" name='surname' value={surname} onChange={handleChange}  />
          </div>
        </div>
        <div className="information-box2">
          <div className="information-box-child" />
          <div className="email-label">
            <input className="name-input" placeholder="Enter your Email" value={email} name='email' onChange={handleChange} />
          </div>
        </div>
        <div className="information-box3">
          <div className="information-box-child" />
          <div className="password-label">
            <input className="name-input" placeholder="Enter your Password" value={password} name='password' onChange={handleChange} />
          </div>
        </div>
        <div className="information-box4">
          <div className="information-box-child" />
          <div className="job-label">
            <input className="name-input" placeholder="Enter your Job" name='job' value={job} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="signup-button">
        <div className="signup-button-child" />
        <button className="signup-button-text" onClick={handleSubmit}>Sign Up</button>
      </div>
      <div className="already-have-account">
        <span>{`Already have an account? `}</span> 
        <Link to={`/${target_user}/login`}>Login</Link>
      </div>
    </div>
  )
}

export default SignupComponent

