import React, { useState,useEffect } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


  

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //navigate to login after signup
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //popup
  const showMessage = (text, isError = false) => {
   
    toast.info(text, {
      autoClose: 5000, // Auto-close the notification after 5 seconds
      className: isError ? "toast-error" : "toast-success", 
    });
    // Log the message to the console
    console.log(text);
  }
  
 
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3001/signup", formData); // Updated endpoint
      const { success, token, error } = response.data;
  
      if (success) {
        
       
       // Handle successful signup
       showMessage("Signup successful! Check your Email for OTP");
       
       setTimeout(() => {
        navigate('/verifyotp');
      }, 3000); 

       
         // Reset the input fields to empty strings
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      } else {
        // Handle signup error and display the error message
        showMessage(error, true);
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
    }
    

  };

  return (
    <div className="signup  ">
      <h2 className="signheading" >Sign Up</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleInputChange}
            value={formData.username}
            required
            autoFocus
            style={{outline:'none'}}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
            required
            style={{outline:'none'}}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength="8"
            onChange={handleInputChange}
            value={formData.password}
            required
            style={{outline:'none'}}
          />
        </div>
        <center>
          <button className="button1" type="button" onClick={handleSignup}>
            Sign Up
          </button>
        </center>
        <div className="endform">
         <p>Already have an account?</p>
         <Link to="/login"><button className="button2">Login</button></Link>
         
        </div>
        

        <ToastContainer
          position="top-right"
          autoClose={false} // Do not auto-close notifications
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    </div>
  );
}


export default Signup;
