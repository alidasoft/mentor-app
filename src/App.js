import "./App.css";
import React, { useState, useEffect } from "react"; 
import { Routes, Route, useNavigationType, useLocation, useNavigate } from "react-router-dom";

import MentorLogin from "./pages/mentor_pages/MentorLogin";
import MentorSignup from "./pages/mentor_pages/MentorSignup";
import MenteeLogin from "./pages/mentee_pages/MenteeLogin";
import MenteeSignup from "./pages/mentee_pages/MenteeSignup";
import AdminLogin from "./pages/admin_pages/AdminLogin";
import AdminSignup from "./pages/admin_pages/AdminSignup";
import Header from "./Components/Header";
import ConfirmSignup from "./Components/ConfirmSignup";
import UnderConstruction from "./Components/UnderConstruction";
import EditProfile from "./pages/edit-profile/EditProfile";
import "@aws-amplify/ui-react/styles.css";

import HomeComponent from "./Components/HomeComponent";

function App({ signOut }) {
  const Navigate = useNavigate();
  const location = useLocation();
  const action = useNavigationType();
  const pathname = location.pathname;
  useEffect(() => {
    if (action !== "POP") {
        window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const user = await Auth.currentAuthenticatedUser();
  //       setUser(user);
  //     } catch (error) {
  //       setUser(null);
  //     }
  //   };
  //   getUser();
  //   const listener = (data) => {
  //     switch (data.payload.event) {
  //       case "signIn":
  //         return getUser();
  //       case "signOut":
  //         return setUser(null);
  //       default:
  //         return;
  //     } 
  //   };
  //   Hub.listen("auth", listener);
  //   return () => Hub.remove("auth", listener);
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     Navigate("/home");
  //   } else {
  //     Navigate("/");
  //   }
  // }, [user]);
  
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

    return (
        <Routes>
            <Route path="/mentor/signup" element={<MentorSignup target_user={'mentor'} timestamp={timestamp}  />} />
            <Route path="/mentor/login" element={<MentorLogin target_user={'mentor'} timestamp={timestamp} />} />
            <Route path="/mentee/signup" element={<MenteeSignup target_user={'mentee'} timestamp={timestamp} />} />
            <Route path="/mentee/login" element={<MenteeLogin target_user={'mentee'} timestamp={timestamp} />} />
            <Route path="/admin/signup" element={<AdminSignup target_user={`admin`} timestamp={timestamp} />} />
            <Route path="/admin/login" element={<AdminLogin target_user={'admin'} timestamp={timestamp} />} />
            <Route path="/edit/profile" element={ <EditProfile timestamp={timestamp} />} />
            <Route path="/home" element={<UnderConstruction timestamp={timestamp} />} />
            <Route path="/" element={<HomeComponent timestamp={timestamp} />} />
            <Route path="/confirm" element={<ConfirmSignup timestamp={timestamp} /> } />
        </Routes>
    );
}

export default App;
