import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { API } from 'aws-amplify'
import NavBar from '../../Components/NavBar'


const MenteeHome = ({ user, timestamp }) => {
    const [profile, setProfile] = useState(null)
    const handleImage = (image) => {
        console.log("image", image)
    }
    let userType = user ? user['custom:groupName'] : ''
    useEffect(() => {
    const getProfile = async () => {
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
    

  return (
    <>
    <div { ...user && user['custom:groupName'] === 'mentee' ? { className: "mentee-dashboard" } : { className: "dashboard" } }>
    <Header timestamp={timestamp} user={user} handleImage={handleImage} profile={profile} />
    <NavBar userType={userType} />
    <div className="information-boxes">
      <h2>
        Welcome to your Mentee Dashboard!
      </h2>
      <p>
        Here you can view your mentor requests and tasks. 
      </p>
      </div>
    </div>

  </>
  )
}

export default MenteeHome
