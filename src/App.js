import "./Signup.css";
import "./Login.css";
import React, { useState, useEffect } from "react"; 
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";

import MentorLogin from "./pages/mentor_pages/MentorLogin";
import MentorSignup from "./pages/mentor_pages/MentorSignup";
import MenteeLogin from "./pages/mentee_pages/MenteeLogin";
import MenteeSignup from "./pages/mentee_pages/MenteeSignup";
import AdminLogin from "./pages/admin_pages/AdminLogin";
import AdminSignup from "./pages/admin_pages/AdminSignup";
import Header from "./Components/Header";

function App() {
  const location = useLocation();
  const action = useNavigationType();
  const pathname = location.pathname;
  
  useEffect(() => {
    if (action !== "POP") {
        window.scrollTo(0, 0);
    }
  }, [action, pathname]);
  
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
            <Route path="/edit/profile" element={ <Header timestamp={timestamp} />} />
        </Routes>
    );
}

export default App;
