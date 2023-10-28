import React, { useState } from "react";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../header/AuthContext";


export default function Login() {

  
  const { setIsLoggedIn } = useAuth();
  
 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  
  //to navigate to profle after login
  const navigate = useNavigate();
  

    //popup
    const showMessage = (text, isError = false) => {
   
        toast.info(text, {
          autoClose: 3500, 
          className: isError ? "toast-error" : "toast-success", 
        });
        // Log the message to the console
        console.log(text);
      }


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/login", formData);
      const { success, token, admin, error,user } = response.data;
  
      if (success) {
        localStorage.setItem("jwtToken", response.data.token);
        
        setIsLoggedIn(true);
        console.log(response.data)
  
        if (admin) {
          // If the user is an admin, redirect to /admin
          showMessage("Logged in as admin. You can now upload courses.");
          setTimeout(() => {
            navigate("/admin");
          }, 3000);
        } else {
          // If the user is not an admin, redirect to /profile
          showMessage("Login successful!");
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        }
  
        // Reset the input fields to empty strings
        setFormData({
          email: "",
          password: "",
        });
  
        // Log the JWT token to the console
        console.log("JWT Token:", token);
       
       
      } else {
        // Display an error toast
        showMessage(error);
      }
    } catch (error) {
      // Handle network or other errors
      console.error(error);
    }
  };
  
  
  return (
    <div className="login">
      <h2 className="signheading">Login</h2>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            minLength="8"
            required
            style={{outline:'none'}}
          />
        </div>
        <center>
          <button className="button1" type="button" onClick={handleLogin}>
            Login
          </button>
        </center>
        <div className="endform">
         <p>New User?</p>
         <Link to="/signup"><button className="button2">SignUp</button></Link>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={false} 
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
