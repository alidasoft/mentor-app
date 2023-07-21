import React from "react";
import Login_Component from "../../Components/LoginComponent";

const MentorLogin = ({ target_user, timestamp }) => {
    return (
        <div>
            <Login_Component target_user={target_user} timestamp={timestamp}  />
        </div>
    );
};

export default MentorLogin;
