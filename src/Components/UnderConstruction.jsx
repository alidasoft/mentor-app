import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from "aws-amplify";
import { AmplifySignOut } from '@aws-amplify/ui-react';

const PageEnConstruction = ({ timestamp, signOut }) => {
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      const response = await Auth.signOut()
      console.log(response)
      navigate('/')
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  return (
    <div className="page-en-construction">
      <div className="ellipse" />
      <div className="icon-system">
        <img className="vector-icon" alt="" src="/vector.svg" />
        <img className="vector-icon1" alt="" src="/vector1.svg" />
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <b className="timestamp">{ timestamp }</b>
      </div>
      <div className="page-en-construction-text">Page en construction</div>
      <button className="btn btn-button" onClick={handleSignOut}>Sign Out</button>
      <div className="page-en-construction-bottom" />
    </div>
  );
};

export default PageEnConstruction;