import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import NavBar from '../../Components/NavBar'
import { API, Auth } from 'aws-amplify'

const MenteeHome = ({ user, timestamp, signOut }) => {
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

    const handleSignOut = async ({ timestamp, user}) => {
        try {
          const response = await Auth.signOut()
          console.log(response)
          signOut()

        } catch (error) {
          console.log('error signing out: ', error);
        }
      }
    return (
        <>
            <div { ...user && user['custom:groupName'] === 'mentee' ? { className: "mentee-dashboard" } : { className: "dashboard" } }>
                <Header timestamp={timestamp} user={user} handleImage={handleImage} profile={profile} />
                <NavBar />
            </div>
        </>
      )
}

export default MenteeHome
