import "./App.css";
import React, { useState, useEffect } from "react"; 
import { Routes, Route, useNavigationType, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MentorLogin from "./pages/mentor_pages/MentorLogin";
import Protected from "./Components/Protected";
import MentorSignup from "./pages/mentor_pages/MentorSignup";
import MenteeLogin from "./pages/mentee_pages/MenteeLogin";
import MenteeSignup from "./pages/mentee_pages/MenteeSignup";
import AdminLogin from "./pages/admin_pages/AdminLogin";
import AdminSignup from "./pages/admin_pages/AdminSignup";
import MentorProfile from "./Components/MentorProfile";
import ConfirmSignup from "./Components/ConfirmSignup";
import UnderConstruction from "./Components/UnderConstruction";
import MentorNetowrk from "./pages/mentor_pages/MentorNetwork";
import MentorNotifications from "./pages/mentor_pages/MentorNotifications";
import EditProfile from "./pages/edit-profile/EditProfile";
import "@aws-amplify/ui-react/styles.css";
import { Auth, Hub, API } from "aws-amplify";

import HomeComponent from "./Components/HomeComponent";
import MenteeHome from "./pages/mentee_pages/MenteeHome";
import MentorHome from "./pages/mentor_pages/MentorHome";
import MenteeNetwork from "./pages/mentee_pages/MenteeNetwork";
import MenteeNotifications from "./pages/mentee_pages/MenteeNotifications";

function App({ signOut }) {
  const [user, setUser] = useState(null);
  // const [profile, setProfile] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const action = useNavigationType();
  const pathname = location.pathname;
  useEffect(() => {
    if (action !== "POP") {
        window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user.attributes);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    getUser();
    const listener = (data) => {
      switch (data.payload.event) {
        case "signIn":
          return getUser();
        case "signOut":
          setIsAuthenticated(false);
          return setUser(null);
        default:
          return;
      } 
    };
    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  const getFormattedTime = () => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    const [hour, minute] = time.split(/:| /);
    const formattedHour = hour.padStart(2, '0');
    const formattedMinute = minute.padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  };
  
  const [timestamp, setTimestamp] = useState(getFormattedTime());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(getFormattedTime());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getUserDetails = (user) => {
    setUser(user);
    console.log("user from app.js", user);
  }


    return (
      <>
        <Routes>
            <Route path="/mentor/signup" element={<MentorSignup target_user={'mentor'} timestamp={timestamp} getUserDetails={getUserDetails} />} />
            <Route path="/mentor/login" element={<MentorLogin target_user={'mentor'} timestamp={timestamp} />} />
            <Route path="/mentee/signup" element={<MenteeSignup target_user={'mentee'} timestamp={timestamp} getUserDetails={getUserDetails} />} />
            <Route path="/mentee/login" element={<MenteeLogin target_user={'mentee'} timestamp={timestamp} />} />
            <Route path="/admin/signup" element={<AdminSignup target_user={`admin`} timestamp={timestamp} />} />
            <Route path="/admin/login" element={<AdminLogin target_user={'admin'} timestamp={timestamp} />} />
            <Route path="/edit/profile" element={ <EditProfile timestamp={timestamp} />} />
            <Route path="/home" element={
              // <Protected isAuthenticated={isAuthenticated} user={user} timestamp={timestamp}>
            <UnderConstruction timestamp={timestamp} user={user} />
              // </Protected>
            } />
            <Route path="/home/mentor" element={ <MentorHome timestamp={timestamp} user={user} />} />
            <Route path="/home/mentor/network" element={ <MentorNetowrk timestamp={timestamp} user={user} />} />
            <Route path="/home/mentor/notifications" element={ <MentorNotifications timestamp={timestamp} user={user} />} />
            <Route path="/home/mentee" element={ <MenteeHome timestamp={timestamp} user={user} />} />
            <Route path="/home/mentee/network" element={ <MenteeNetwork timestamp={timestamp} user={user} />} />
            <Route path="/home/mentee/notifications" element={ <MenteeNotifications timestamp={timestamp} user={user} />} />
            <Route path="/" element={<HomeComponent timestamp={timestamp} />} />
            <Route path="/confirm" element={<ConfirmSignup timestamp={timestamp} user={user} /> } />
            <Route path="/mentor/profile" element={<MentorProfile timestamp={timestamp} user={user}  />} />
            <Route path="/mentee/profile" element={<MentorProfile timestamp={timestamp} user={user}  />} />
        </Routes>
        <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light" 
            />
        </>
    );
}

export default App;
