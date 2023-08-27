import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from "aws-amplify";
import { Hub } from 'aws-amplify';
import { Authenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';


const ConfirmSignup = ({ timestamp }) => {
    const navigate = useNavigate()
    const [authenticationCode, setAuthenticationCode] = useState('');
    const [username, setUsername] = useState('');
    console.log(username)
    const handleConfirm = async () => {
        try {
            await Auth.confirmSignUp(username, authenticationCode);
            console.log('code confirmed');
            navigate('/home')
        } catch (err) {
            console.log('error confirming code: ', err);
        }
    }
    const handleResend = async () => {
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    function listenToAutoSignInEvent() {
    Hub.listen('auth', ({ payload }) => {
        const { event } = payload;
        if (event === 'autoSignIn') {
        const user = payload.data;
        // assign user
        } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
        }
    })
    }
  return (
    <div className="signup">
      <div className="ellipse" />
      <div className="icon-system">
        <img className="vector-icon" alt="" src="/vector.svg" />
        <img className="vector-icon1" alt="" src="/vector1.svg" />
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <b className="timestamp">{timestamp}</b>
      </div>
      <img className="logo-image" alt="guineansyouthorganization" src="/logo.png" />

      <div className="information" />
      <div className="information-security">
        Your information will remain secure
      </div>
      <div className="information-boxes">
      <div className="information-box2">
            <input  className="name-input" placeholder="Enter your email" name='username' onChange={(e) => {setUsername(e.target.value)}} />
        </div>
        <div className="information-box3">
            <input className="name-input" placeholder="Enter your verification code" name='authenticationCode' onChange={(e) => {setAuthenticationCode(e.target.value)}} />
        </div>
          <div className="resend_link">
            <Link onClick={handleResend}>Resend Code</Link>
        </div>
      </div>
      <div className="btn btn-button">
        <button className="button-text" onClick={handleConfirm}>Confirm</button>
      </div>

      
    </div>
  )
}

export default ConfirmSignup
