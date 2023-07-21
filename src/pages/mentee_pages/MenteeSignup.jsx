import React from "react";
import Signup_Component from "../../Components/SignupComponent";

const MenteeSignup = ({ target_user, timestamp }) => {
    return (
        <div>
            <Signup_Component target_user={target_user} timestamp={timestamp} />
        </div>
    );
};

export default MenteeSignup;
