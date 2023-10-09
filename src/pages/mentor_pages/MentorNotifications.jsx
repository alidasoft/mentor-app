import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { API } from 'aws-amplify'
import NavBar from '../../Components/NavBar'


const MentorNotifications = ({ user, timestamp }) => {
    const [profile, setProfile] = useState(null)
    const handleImage = (image) => {
    }
    let userType = user ? user['custom:groupName'] : ''
    useEffect(() => {
    const getProfile = async () => {
        let email = user ? user.email : ''
        try {
        const userProfile = await API.get('profileAPI', `/${userType}/object/` + email)
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
    //notifications
    <div className='information-boxes'>
    <h2>
        Notifications
    </h2>
    <p>
        Here you can view your notifications
    </p>
    {profile && profile['custom:notifications'] ? profile['custom:notifications'].map((notification, index) => {
        return (
        <div key={index}>
            <h3>
            {notification}
            </h3>
        </div>
        )}) : 
        <>
        <h3 style={{color: 'red'}}>You have no notifications.</h3>
        <br />
        <h3>We will notify you when a mentee has requested your help</h3>
        </>

    }
    </div>
    </div>

  </>
  )
}

export default MentorNotifications
