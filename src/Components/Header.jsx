import React from "react";

const Header = ({ timestamp, target_user }) => {
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
                <img className="photo-icon" alt="" src="/daudabarry@2x.png" />
            </div>
            <img className="camera-icon" alt="" src="/camera.svg" />
            <div className="welcome-container">
                <span className="welcome-container1">
                    <span className="welcome">{`Welcome `}</span>
                    <span className="dauda-bary">Dauda BARY</span>
                </span>
            </div>
        </div>
    );
};

export default Header;
