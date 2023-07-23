import React, { useState } from "react";
import Header from "../../Components/Header";

const EditProfile = ({ timestamp }) => {
    const [value, setValue] = useState('')
    const [data, setData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        job: '',
    })
    const { name, surname, email, password, job } = data
    const handleInput = (e) => {
        setValue(e.target.value)
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        const user = { name, surname, email, password, job }
        console.log(user)
    }
    return (
        <div className="dashboard">
            <Header timestamp={timestamp} />
            
            <div className="dashboard-item" />
            <div className="information-boxe">
                <div className="information-box">
                    <input className="name-input" placeholder="Enter your Name" value={name} name='name' onChange={handleChange} />
                </div>
                <div className="information-box1">
                    <input className="name-input" placeholder="Enter your Surname" name='surname' value={surname} onChange={handleChange} />
                </div>
                <div className="information-box2">
                    <input className="name-input" placeholder="Enter your Email" value={email} name='email' onChange={handleChange} />
                </div>
                <div className="information-box3">
                    <input className="name-input" placeholder="Enter your Password" value={password} name='password' onChange={handleChange} />
                </div>
                <div className="information-box4">
                    <input className="name-input" placeholder="Enter your Job" name='job' value={job} onChange={handleChange} />
                </div>
            </div>
            <div className="btn1 btn-button">
                <button className="button-text" onClick={handleSubmit}>Edit Profile</button>
            </div>
            <div className="btn2 btn-button">
                <button className="button-text" onClick={handleSubmit}>Upgrade</button>
            </div>
        </div>
    );
};

export default EditProfile;
