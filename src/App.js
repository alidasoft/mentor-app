import "./Signup.css";
import "./Login.css";
import React, { useState, useEffect } from "react"; 
import { Routes, Route } from "react-router-dom";

import MentorLogin from "./pages/mentor_pages/MentorLogin";
import MentorSignup from "./pages/mentor_pages/MentorSignup";
import MenteeLogin from "./pages/mentee_pages/MenteeLogin";
import MenteeSignup from "./pages/mentee_pages/MenteeSignup";
import AdminLogin from "./pages/admin_pages/AdminLogin";
import AdminSignup from "./pages/admin_pages/AdminSignup";

function App() {
  const getFormattedTime = () => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    return time;
  };
  const [timestamp, setTimestamp] = useState(getFormattedTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(getFormattedTime());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  console.log("timestamp", timestamp);



    return (
        <Routes>
            <Route path="/mentor/signup" element={<MentorSignup target_user={'mentor'} />} />
            <Route path="/mentor/login" element={<MentorLogin target_user={'mentor'} />} />
            <Route path="/mentee/signup" element={<MenteeSignup target_user={'mentee'} />} />
            <Route path="/mentee/login" element={<MenteeLogin target_user={'mentee'} />} />
            <Route path="/admin/signup" element={<AdminSignup target_user={`admin`} />} />
            <Route path="/admin/login" element={<AdminLogin target_user={'admin'} />} />
        </Routes>
    );
}

export default App;
