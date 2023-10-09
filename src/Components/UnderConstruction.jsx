import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth, API } from "aws-amplify";

const PageEnConstruction = ({ timestamp, signOut, user }) => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const user_type = user ? user['custom:groupName'] : ''
  console.log("user_type", user_type)
  const navigate = useNavigate()
  //check if user has profile 
  useEffect(() => {
    setLoading(true)
    const getProfile = async () => {
      let userType = user ? user['custom:groupName'] : ''
      let email = user ? user.email : ''
      try {
        const userProfile = await API.get('profileAPI', `/${userType}/object/` + email)
        console.log("userProfile", userProfile)
        setProfile(userProfile)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()
  }, [user])
  console.log("profile", profile)
  const handleSignOut = async () => {
    try {
      const response = await Auth.signOut()
      console.log(response)
      navigate('/')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <div className="page-en-construction">
      <div className="ellipse" />
      <div className="icon-system">
        <img className="vector-icon" alt="" src="/vector.svg" />
        <img className="vector-icon1" alt="" src="/vector1.svg" />
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <b className="timestamp">{ timestamp }</b>
      </div>
      <div className="page-en-construction-text">
        <h2>Welcome { user ? user.name : '' }</h2>
        { loading ? <p style={{ color: 'black' }} >Loading...</p> 
        : (
          <>
        { profile && profile.location !== '' ? (
          <>
          <p style={{ color: 'black' }} >You are registered as a { user_type }. Please navigate to <Link to={`${user_type}`}>{user_type} dashboard</Link> for more details </p>
          </>
        ) : (
          <p style={{ color: 'black' }} > Fill in your <Link to={`/${user_type}/profile`}>profile</Link> to get started</p>
        ) }
        </>
        )}
      </div>
      <button className="btn btn-button" onClick={handleSignOut}>Sign Out</button>
      <div className="page-en-construction-bottom" />
    </div>
  );
};

export default PageEnConstruction;