import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

export default function EditProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
 

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    // Add the token to the headers
    const headers = {
      Authorization: token,
    };

    // Send a GET request to fetch the user's profile data
    axios
      .get("http://localhost:3001/userprofile", { headers })
      .then((response) => {
        const userData = response.data;
        setUsername(userData.username);
        setEmail(userData.email);
		
      })
      .catch((error) => {
        console.error("Error fetching user profile data:", error);
      });
  });




  

  return (
    <div id="editprofile">
      <div className="profilepiccontain">
        <div className="profilepic" style={{ width: "120px", height: "120px" }}>
          <img src="./images/profile.webp" alt="" />
        </div>
        <div className="usernamediv">Hello, {username}</div>
      </div>

	  
      
      
      


	  
    </div>
  );
}
