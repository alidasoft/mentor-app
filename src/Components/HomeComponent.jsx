import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ timestamp }) => {
  return (
    <div className="login">
      <div className="ellipse" />
      <div className="icon-system">
        <img className="vector-icon" alt="" src="/vector.svg" />
        <img className="vector-icon1" alt="" src="/vector1.svg" />
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <b className="timestamp">{timestamp}</b>
      </div>
      <img className="logo-image" alt="guineansyouthorganization" src="/logo.png" />
      <div className="information" />
      <div>
        <div className="banner">
          <div className="user-login">
            <div className="card mentor-card" >
              <h2>Mentor</h2>
              <p>Are you here to mentor others?</p>
              <Link to="/mentor/signup">Select Mentor</Link>
            </div>
            <div className="card mentee-card">
              <h2>Mentee</h2>
              <p>Are you looking for a mentor?</p>
              <Link to="/mentee/signup">Select Mentee</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
