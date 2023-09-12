import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Auth } from "aws-amplify";
import { Hub } from 'aws-amplify';
import { toast } from 'react-toastify';
import { Authenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';


const ConfirmSignup = ({ timestamp, user }) => {
    const navigate = useNavigate()
    console.log("user", user)
    const [authenticationCode, setAuthenticationCode] = useState('');
    const [userDetails, setUserDetails] = useState({}) // {username: '', password: ''}
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleConfirm = async () => {
      try {
          setIsLoading(true);
          const response = await Auth.confirmSignUp(username, authenticationCode);
          if (response === 'SUCCESS') {
            await Auth.signIn(username, password);
            const authenticatedUser = await Auth.currentAuthenticatedUser();
            if (authenticatedUser) {
              const user_type = authenticatedUser.attributes['custom:groupName']
                navigate(`/${user_type}/login`)
                toast.success(`user confirmed! please login`)
                setIsLoading(false);
            } else {
              console.log('error')
              toast.error('Confirmation failed')
              setIsLoading(false);
            }
          } else {
              console.log('error');
              toast.error('Confirmation failed');
              setIsLoading(false);
          }
      } catch (err) {
          console.log('error confirming code: ', err);
          toast.error(err.message);
          setIsLoading(false);
      }
  };
  
    const handleResend = async () => {
        try {
            await Auth.resendSignUp(username);
            toast.success(`code resent successfully`)
        } catch (err) {
            toast.error(`${err.message}`)
        }
    }

    useEffect(() => {
      if (user) {
        setUserDetails(user)
        setUsername(user.username)
        setPassword(user.password)
      }
    } , [user])

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
            <input  className="name-input" placeholder="Enter your email" name='username' value={username} readOnly />
        </div>
        <div className="information-box3">
            <input className="name-input" placeholder="Enter your verification code" name='authenticationCode' onChange={(e) => {setAuthenticationCode(e.target.value)}} />
        </div>
          <div className="resend_link">
            <Link onClick={handleResend}>Resend Code</Link>
        </div>
      </div>
      <div className="btn btn-button">
        <button className="button-text" onClick={handleConfirm} disabled={isLoading}>{isLoading ? 'confirming...' : 'Confirm'}</button>
      </div>

      
    </div>
  )
}

export default ConfirmSignup
