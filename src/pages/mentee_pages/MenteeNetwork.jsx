import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { API } from 'aws-amplify'
import NavBar from '../../Components/NavBar'


const MenteeNetwork = ({ user, timestamp }) => {
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
    <div className="information-boxes">
      <h2>
        Here you can view your mentor network!
      </h2>
      {profile && profile['custom:mentees'] ? profile['custom:mentees'].map((mentee, index) => {
        return (
          <div key={index}>
            <h3>
              {mentee}
            </h3>
          </div>
        )}) : 
        <>
        <h3 style={{color: 'red'}}>You have no mentor.</h3>
        <br />
        <h3>We will match you with suitable candidates according to your career goal</h3>
        </>
      }
      </div>
    </div>

  </>
  )
}

export default MenteeNetwork

