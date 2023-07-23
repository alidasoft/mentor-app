import React, { useRef, useState } from "react";

const Header = ({ timestamp, target_user }) => {
    const fileInputRef = useRef(null)
    const [image, setImage] = useState(null)

    const handleImage = (e) => {
        console.log('file');
        const file = e.target.files[0]; 
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); 
        };

        if (file) {
            reader.readAsDataURL(file); 
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
            <div className="photo">
                <div className="photo-child" />
                {/* Display the selected image */}
                {image && <img className="photo-icon" alt="" src={image} />}
            </div>
            <label>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImage}  />
                <img className="camera-icon" alt="" src="/camera.svg" />
            </label>
            <div className="welcome-container">
                <span className="welcome-container1">
                    <span className="welcome">{`Welcome `}</span>
                    <span className="user-name">Dauda BARY</span>
                </span>
            </div>
        </div>
    );
};

export default Header;
