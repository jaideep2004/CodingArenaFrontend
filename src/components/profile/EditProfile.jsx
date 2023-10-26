import { useEffect, useState } from "react";
import axios from "axios";

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
		<div id='editprofile'>
			<div className='profilepic'>
				<img src='./images/profile.webp' alt='' />
				<div className='usernamediv'>Hello, {username}</div>
			</div>

			<div className='editidform'>
				<form>
					<div>
						
						<div className='mb-3'>
							<label htmlFor='instructor' className='createcourselabel'>
								Name
							</label>
							<input
								type='text'
								className='form-control'
								id='cname'
								name='cname'
								required
								placeholder='Update Username'
								style={{ width: "800px" }}
							/>
						</div>

						<div className='mb-3'>
							<label htmlFor='title' className='createcourselabel'>
								Email
							</label>
							<input
								type='text'
								className='form-control'
								id='title'
								name='title'
								required
								placeholder='Update Email'
								style={{ width: "800px" }}
							/>
						</div>

						<button type='submit' className='coursebtn'>
							Update Profile
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
