import React from "react";
import Signup_Component from "../../Components/SignupComponent";

const Mentor_Signup = ({target_user, timestamp, getUserDetails }) => {
    return (
        <div>
            <Signup_Component target_user={target_user} timestamp={timestamp} getUserDetails={getUserDetails} />
        </div>
    );
};

export default Mentor_Signup;
