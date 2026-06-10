import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "" // Add this line
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsCheckboxChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  const login = async () => {
    try {
      console.log("Login function executed", formData);
      const response = await fetch('http://localhost:4000/login', { // Use the correct IP address or localhost
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace("/");
        } else {
          throw new Error(responseData.error || "Login failed");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }
    } catch (error) {
      console.error("Login failed", error.message);
      alert(`Login failed: ${error.message}`); // Display error to the user
    }
  };
  
  

  const signup = async () => {
    try {
      console.log("Sign up function executed", formData);
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.success) {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace("/");
        } else {
          throw new Error(responseData.error || "Signup failed");
        }
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error("Signup failed", error.message);
      alert("Signup failed. Please try again."); // Display error to the user
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign up" &&
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Your name'
            />
          }
          {state === "Sign up" && 
            <input
              name='phone'
              value={formData.phone}
              onChange={changeHandler}
              type="tel"
              placeholder='Phone number'
            />
          }
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Email address'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
          />
        </div>
        <div className="loginsignup-show-password">
          <input
            className='loginsignup-show-password-checkbox'
            type="checkbox"
            onChange={handlePasswordCheckboxChange}
          />
          <p>Show password</p>
        </div>
        <button onClick={() => state === "Login" ? login() : signup()}>
          Continue
        </button>
        <p className="loginsignup-login">
          {state === "Sign up"
            ? "Already have an account? "
            : "Create an account? "
          }
          <span onClick={() => setState(state === "Login" ? "Sign up" : "Login")}>
            {state === "Sign up" ? "Login here" : "Click here"}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input
            className='loginsignup-agree-checkbox'
            type="checkbox"
            onChange={handleTermsCheckboxChange}
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;


