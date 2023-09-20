import React, { useEffect } from 'react'
import { useState } from 'react'
import Header from './Header'
import { Storage, API, Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'


const HomeMentor = ({ user, timestamp, signOut }) => {
    const navigate = useNavigate
    const [imageURL, setImageURL] = useState(null)
    const [profile, setProfile] = useState(null)
    const handleImage = (image) => {
        console.log("image", image)
    }
    useEffect(() => {
    const getProfile = async () => {
        let userType = user ? user['custom:groupName'] : ''
        let email = user ? user.email : ''
        try {
        const userProfile = await API.get('profileAPI', `/${userType}/object/` + email)
        console.log("userProfile", userProfile)
        setProfile(userProfile)
        } catch (error) {
        console.log(error)
        }
    }
    getProfile()
    } , [user])
    
const handleSignOut = async () => {
    try {
      const response = await Auth.signOut()
      console.log(response)
      signOut()
      navigate('/')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <>
    <Header timestamp={timestamp} user={user} handleImage={handleImage} profile={profile} />

  </>
  )
}

export default HomeMentor
