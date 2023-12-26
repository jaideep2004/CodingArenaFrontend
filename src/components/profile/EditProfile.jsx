import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import jwtDecode from "jwt-decode";
import { useAuth } from "../header/AuthContext";
import { useNavigate } from "react-router-dom";

import '../header/header.css'



function EditProfile() {
	const [user, setUser] = useState({ email: "", username: "" });
	const [newUsername, setNewUsername] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		// Get the JWT token from local storage (you might want to handle this more securely)
		const token = localStorage.getItem("jwtToken");

		if (token) {
			// Decode the token to get user data
			const decoded = jwtDecode(token);
			const { email, username } = decoded.user;

			// Update the user state
			setUser({ email, username });
		}
	}, []);
	const handleEditClick = () => {
		setIsEditing(true);
	};
	const navigate = useNavigate();

	const { setIsLoggedIn } = useAuth();

	const handleSaveClick = (e) => {
		e.preventDefault();

		// Prepare the updated user data
		const updatedUserData = {
			username: newUsername,
			email: newEmail,
		};

		// Send a PUT request to update the user's information
		axios
			.put(
				`http://localhost:3001/users/updateprofile/${user.email}`,
				updatedUserData
			)
			.then((response) => {
				const { email, username } = response.data.updatedUser;
				setUser({ email, username });
				setIsEditing(false);
				toast.success("Profile Updated successfully");
				handleLogout();
			})
			.catch((error) => {
				console.error("Error updating profile:", error);
				toast.error("Error Updating Profile");
			});
	};
	const handleLogout = () => {
		localStorage.removeItem("jwtToken");
		setIsLoggedIn(false);
		toast.success("Logged Out! Login with new credentials");
	};

	return (
		<div id='editprofile'>
			<div className='profilepic'>
				<img src='./images/profile.webp' alt='' />
			</div>
			<div className='usernamediv'>
				<span id="welcomemsg">Welcome Back,</span>
				<br />
				{user.username}
				<br />
				{user.email}{" "}
			</div>

			<form onSubmit={handleSaveClick} className='ml-6'>
				<div className='mb-3 mobilecourseinput'>
					<label htmlFor='newUsername' className='createcourselabel'>
						New Username
					</label>
					<input
						className='form-control'
						type='text'
						id='newUsername'
						name='newUsername'
						value={newUsername}
						onChange={(e) => setNewUsername(e.target.value)}
						required
						
						placeholder='Update Username'
					/>
				</div>
				<div className='mb-3 mobilecourseinput'>
					<label htmlFor='newEmail' className='createcourselabel'>
						New Email
					</label>
					<input
						className='form-control'
						type='email'
						id='newEmail'
						name='newEmail'
						value={newEmail}
						onChange={(e) => setNewEmail(e.target.value)}
						required
						
						placeholder='Update Email'
					/>
				</div>
				<button type='submit' className='coursebtn'>
					Save
				</button>
			</form>

			<ToastContainer />
		</div>
	);
}

export default EditProfile;
