import React, { useEffect, useRef, useState } from "react";
import { Storage, API, Auth } from 'aws-amplify';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


const Header = ({ timestamp, user, handleImage, profile, signOut }) => {
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState(null)
    const handleImageUpload = async (e) => {
        console.log("triggered")
        const file = e.target.files[0]; 
        console.log("file", file)
       //authenticated users can upload files to the s3 bucket
       try {
        const result = await Storage.put(file.name, file, {
            level: 'protected',
            contentType: 'image/png'
        })
        console.log("result", result)
        setImage(result.key)
          // Construct the image URL (required for displaying the image)
            const imageUrl = await Storage.get(result.key, { level: 'protected' })
          setImageURL(imageUrl)
          console.log("imageUrl", imageUrl)
       } catch (error) {
              console.log(error)
         }
    }
    //get the route for the current page
    const route = window.location.pathname
    useEffect(() => {
        handleImage(image)
    }, [image])
    useEffect(() => {
        const getImage = async () => {
            if (profile) {
                const imageUrl = await Storage.get(profile.image, { level: 'protected' })
                setImageURL(imageUrl)
            }
        }
        getImage()
    }, [profile])
    const handleGoBack = () => {
        // Go back to the previous page
        window.history.back();
    }
    const handleLogout = async () => {
        try {
          const response = await Auth.signOut()
          navigate('/')
        } catch (error) {
          console.log('error signing out: ', error);
        }
      }
    return (
        <div className="dashboard">
            <div className="dashboard-child" />
            <img className="shipe-icon" alt="" src="/shipe.svg" />
            <div className="icon-system">
                <img className="vector-icon2" alt="" src="/vector2.svg" />
                <img className="vector-icon1" alt="" src="/vector1.svg" />
                <img className="vector-icon" alt="" src="/vector.svg" />
                <div className="timestamp">{timestamp}</div>
            </div>
            {route.includes('home') ? (
                <Link to={user?`/${user['custom:groupName']}/profile`:''}>
                    <div className="photo">
                <div className="photo-child" />
                {/* Display the selected image */}
                <img className="photo-icon" alt="" src={imageURL ? imageURL : profile} />
            </div>
                </Link>
            ) : (
                <div className="photo">
                <div className="photo-child" />
                {/* Display the selected image */}
                <img className="photo-icon" alt="" src={imageURL ? imageURL : profile} />
            </div>
            )}
            {route.includes('profile') ? (
                            <label>
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload}  />
                            <img className="camera-icon" alt="" src="/camera.svg" />
                        </label>
            ) : ''}
            <div className="welcome-container">
                <img className="back-arrow" alt="" src="/back-arrow-svgrepo-com.svg" onClick={handleGoBack} />
                <span className="welcome-container1">
                    <span className="welcome">{`Welcome `}</span>
                    <span className="user-name">{user ? user.name + ' ' + user.family_name  : ''}</span>
                </span>
                <img className="logout-icon" alt="" src="/logout-svgrepo-com.svg" onClick={handleLogout} />
            </div>
        </div>
    );
};

export default Header;