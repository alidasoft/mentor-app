import React, { useEffect, useRef, useState } from "react";
import { Storage, API } from 'aws-amplify';


const Header = ({ timestamp, user, handleImage, profile }) => {
    console.log("profile", profile)
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
    useEffect(() => {
        handleImage(image)
    }, [image])
    useEffect(() => {
        const getImage = async () => {
            if (profile) {
                const imageUrl = await Storage.get(profile, { level: 'protected' })
                setImageURL(imageUrl)
            }
        }
        getImage()
    }, [profile])
    console.log("profile", profile)
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
            <div className="photo">
                <div className="photo-child" />
                {/* Display the selected image */}
                <img className="photo-icon" alt="" src={imageURL ? imageURL : profile} />
            </div>
            <label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload}  />
                <img className="camera-icon" alt="" src="/camera.svg" />
            </label>
            <div className="welcome-container">
                <span className="welcome-container1">
                    <span className="welcome">{`Welcome `}</span>
                    <span className="user-name">{user ? user.name + ' ' + user.family_name  : ''}</span>
                </span>
            </div>
        </div>
    );
};

export default Header;