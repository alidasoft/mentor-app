import React, { useState, useEffect } from 'react';
import Header from "./Header";
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MentorProfile = ({ timestamp, user }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [collegeMajor, setCollegeMajor] = useState('');
  const [data, setData] = useState({
    name: '',
    surname: '',
    email: '',
    location: {
        country: '',
        city: '',
    },
    current_job: '',
    college_major: '',
    major: '',
  });

  const { name, surname, email, location: { city }, current_job, college_major, major } = data;

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleCityChange = (e) => {
    setData({ ...data, location: { ...data.location, city: e.target.value } });
  };

  // Use useEffect to set initial values based on the user prop
  useEffect(() => {
    if (user) {
      setData({
        name: user.name || '',
        surname: user.family_name || '',
        email: user.email || '',
        location: {
            country: '',
            city: '',
        },
        current_job: '',
        college_major: '',
        major: '',
      });
    }
  }, [user]);

  useEffect(() => {
    // Fetch a list of countries with their major cities from an API
    fetch('https://countriesnow.space/api/v0.1/countries')
        .then((response) => response.json())
        .then((data) => {
            setCountries(data.data.map((country) => country.country));
        })
        .catch((error) => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        if (selectedCountry !== '') {
            console.log("selectedCountry", selectedCountry)
            countries.forEach((country) => {
                if (country === selectedCountry) {
                    console.log("country", country)
                    fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            country: country,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("response for cities", data)
                            setCities(data.data.map((city) => city));
                        })
                        .catch((error) => console.error('Error fetching cities:', error));
                }
            }
            );
        }
    }, [selectedCountry]);
    

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleCollegeMajor = (e) => {
    const value = e.target.value;
    setCollegeMajor(value);

    // Set major to "none" if collegeMajor is "no"
    if (value === "no") {
      setData({ ...data, major: "none" });
    }
  };

  const handleSubmit = () => {
    const user_profile = { name, surname, email, location: {country: selectedCountry, city}, current_job, college_major: collegeMajor, major };
    if ( !user_profile.name || !user_profile.surname || !user_profile.email || !user_profile.location.country || !user_profile.location.city || !user_profile.current_job ) {
      toast.error("Please fill in all required fields");
      return;
    }

    API.post('profile', '/mentors', {
        body: user_profile,
        })
        .then((response) => {
            console.log("response from post", response);
            if (response.success) {
                toast.success("Profile updated successfully");
                navigate('/home');
            } else {
                toast.error("Error updating profile");
            }
        })
        .catch((error) => {
            console.log("error from post", error);
        })
  };

  return (
    <div className="dashboard">
      <Header timestamp={timestamp} />
      <div className="dashboard-item" >
      <div className="information-boxe">
        <div className="information-box">
          <input className="profile-input" placeholder="Enter your Name" value={name} name="name" onChange={handleInput} disabled />
        </div>
        <div className="information-box1">
          <input className="profile-input" placeholder="Enter your Surname" name="surname" value={surname} onChange={handleInput} disabled />
        </div>
        <div className="information-box2">
          <input className="profile-input" placeholder="Enter your Email" value={email} name="email" onChange={handleInput} disabled />
        </div>
        <div className="information-box3">
          <select className="name-input" placeholder="Select Country" name="country" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="information-box4">
          <select className="name-input" placeholder="Select City" name="city" value={city} onChange={handleCityChange}>
            <option value="">Select City</option>
            {cities ? cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            )) : ''}
          </select>
        </div>
        <div className="information-box5">
          <input className="name-input" placeholder="Enter your current Job" name="current_job" value={current_job} onChange={handleInput} />
        </div>
        <div className="information-box6">
            <select className="name-input" placeholder="Do you have a college major" name="college_major" value={college_major} onChange={handleCollegeMajor}>
                <option value="">Do you have a college major</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>
        {collegeMajor === 'yes' ? (
                    <div className="information-box7">
                    <input className="name-input" placeholder="Enter your college major" name="major" value={major} onChange={handleInput} />
                  </div>
                  ) : ''}
      </div>
      <div className="btn1 btn-button">
        <button className="button-text" onClick={handleSubmit}>Update Profile</button>
      </div>
      <div className="btn2 btn-button">
        <button className="button-text" onClick={handleSubmit}>Update</button>
      </div>
      </div>
    </div>
  );
};

export default MentorProfile;
