import React, { useState, useEffect } from 'react';
import Header from "./Header";
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MentorProfile = ({ timestamp, user }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [currentUniversity, setCurrentUniversity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [profile, setProfile] = useState({});
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
    university: '',
    studyMajor: '',
    career_goal: '',
    image: '',
  });

  const { name, surname, email, university, career_goal, studyMajor, location: { city }, current_job, college_major, major, image } = data;

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleCityChange = (e) => {
    setData({ ...data, location: { ...data.location, city: e.target.value } });
  };
useEffect(() => {
    if (user) {
      const user_type = user['custom:groupName']
      if (user_type === 'mentor') {
        API.get('profileAPI', '/mentor/object/' + user.email)
        .then((response) => {
          console.log("response from get", response);
          setProfile(response);
        })
        .catch((error) => console.error('Error fetching profile:', error));
      } else {
      API.get('profileAPI', '/mentee/object/' + user.email)
        .then((response) => {
          console.log("response from get", response);
          setProfile(response);
        })
        .catch((error) => console.error('Error fetching profile:', error));
    }
  }
  }, [user]);
  // Use useEffect to set initial values based on the user prop
  useEffect(() => {
    if (user) {
      profile && profile.university && setCurrentUniversity('yes');
      profile && profile.major != '' ? setCollegeMajor('yes') : setCollegeMajor('no');
      profile && profile.location && profile.location.country && setSelectedCountry(profile.location.country);
      profile && profile.location && profile.location.city && setData({ ...data, location: { ...data.location, city: profile.location.city } });
      setData({
        name: user.name || '',
        surname: user.family_name || '',
        email: user.email || '',
        location: {
            country: profile?.location?.country || '',
            city: profile?.location?.city || '',
        },
        current_job: profile?.current_job || '',
        college_major: profile?.college_major || '',
        major: profile?.major || '',
        university: profile?.university || '',
        studyMajor: profile?.studyMajor || '',
        career_goal: profile?.career_goal || '',
        image: profile?.image || '',
      });
    }
    console.log("running ")
  }, [profile]);

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
  const handleCurrentUniversity = (e) => {
    const value = e.target.value;
    setCurrentUniversity(value);
    console.log("currentUniversity", currentUniversity)

    // Set major to "none" if collegeMajor is "no"
    if (value === "no") {
      setData({ ...data, university: "none" });
    }
  };

  const handleSubmit =  async (user) => {
    const user_type = user ? user['custom:groupName'] : ''
    if (user_type === 'mentor') {
    const user_profile = { name, surname, email, location: {country: selectedCountry, city}, current_job, college_major: collegeMajor, major, image };
    if ( !user_profile.name || !user_profile.surname || !user_profile.email || !user_profile.location.country || !user_profile.location.city || !user_profile.current_job ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const response = await API.post('profileAPI', '/mentor', {
      body: user_profile,
    });
    console.log("response from post", response);
    if (response.success) {
      toast.success("Profile updated successfully");
      navigate(`/home/${user['custom:groupName']}`); // navigate to mentor dashboard
    } else {
      toast.error("Error updating profile");
    }
    }
     else {
      const user_profile = { name, surname, email, location: {country: selectedCountry, city}, current_job, college_major: collegeMajor, major, university, studyMajor, career_goal, image };
      if ( !user_profile.name || !user_profile.surname || !user_profile.email || !user_profile.location.country || !user_profile.location.city ) {
        toast.error("Please fill in all required fields");
        return;
      }
     const response = await API.post('profileAPI', '/mentee', {
          body: user_profile,
          })
          if (response.success) {
              toast.success("Profile updated successfully");
              navigate('/home/mentee'); // navigate to mentee dashboard
          } else {
              toast.error("Error updating profile");
          }
    }
  };
  const handleImage = (image) => {
    console.log("imageURL", image)
    setData({ ...data, image });
  };

  return (
    <div { ...user && user['custom:groupName'] === 'mentee' ? { className: "mentee-dashboard" } : { className: "dashboard" } }>
      <Header timestamp={timestamp} user={user} handleImage={handleImage} profile={profile} />
      <div { ...user && user['custom:groupName'] === 'mentee' ? { className: "mentee-dashboard-item" } : { className: "dashboard-item" } }>
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
        {user && user['custom:groupName'] === 'mentee' ? ( 
          <>
        <div className="information-box8">
          <select className="name-input" placeholder="Are you currently enrolled in a university" name="currentUniversity" value={currentUniversity} onChange={handleCurrentUniversity}>
              <option value="">Currently in university</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
          </select>
        </div>
        {currentUniversity === 'yes' ? (
                  <>
                    <div className="information-box9">
                      <input className="name-input" placeholder="Enter your university" name="university" value={university} onChange={handleInput} />
                    </div>
                    <div className="information-box10">
                      <input className="name-input" placeholder="Enter Current Major" name="studyMajor" value={studyMajor} onChange={handleInput} />
                    </div>
                    <div className="information-box11">
                      <input className="name-input" placeholder="Enter your Career Goal" name="career_goal" value={career_goal} onChange={handleInput} />
                    </div>
                  </>
                  ) : ''}
        </>

        
        ) : ''}
      </div>
      <div className="btn1 btn-button">
        <button className="button-text" onClick={handleSubmit}>Update Profile</button>
      </div>
      <div { ...user && user['custom:groupName'] === 'mentee' ? { className: "mentee-btn2 btn-button " } : { className: "btn2 btn-button" } }>
        <button className="button-text" onClick={()=>handleSubmit(user)}>Update</button>
      </div>
      </div>
    </div>
  );
};

export default MentorProfile;
