import { Link } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import EditProfile from "./EditProfile";
import MyCourses from "./MyCourses";
import Wishlist from "./Wishlist";

import "../header/header.css";

function Profile() {
	const navigate = useNavigate();
	const navigatecart = () => {
		navigate("/cart");
	};

	// const handleLogout = () => {
	// 	// Remove the JWT token from localStorage
	// 	localStorage.removeItem("jwtToken");

	// 	console.log("Logged Out");
	// 	toast.success("Logged Out");

	// 	setTimeout(() => {
	// 		navigate("/");
	// 	}, 2000);
	// };

	const [content, setContent] = useState("editprofile"); // Default content is the dashboard

	// Function to switch content based on sidebar link click
	const switchContent = (newContent) => {
		setContent(newContent);
	};

	return (
		<div>
			<div id='' className='flex '>
				<ToastContainer />
				{/* sidebar */}
				<nav id='sidebar2' className='col-md-3 col-lg-2 d-md-block  '>
					<ul className='nav flex-column profilesidebar'>
						<li className='navsidebaropt2' style={{ cursor: "pointer" }}>
							<a
								className={`sidebaropt2 ${
									content === "editprofile" ? "active" : ""
								}`}
								onClick={() => switchContent("editprofile")}>
								<i class='fa-solid fa-user fa-lg '></i>
								<span id="profileopt">Edit Profile</span>
							</a>
						</li>
						<li className='navsidebaropt2' style={{ cursor: "pointer" }}>
							<a
								className={`sidebaropt2 ${
									content === "mycourses" ? "active" : ""
								}`}
								onClick={() => switchContent("mycourses")}>
								<i class='fa-solid fa-book fa-lg '></i>
								<span id="profileopt">My Courses </span>
							</a>
						</li>
						<li className='navsidebaropt2'>
							<a
								className={`sidebaropt2 ${
									content === "wishlist" ? "active" : ""
								}`}
								onClick={() => switchContent("wishlist")}>
								<i class='fa-solid fa-heart fa-lg '></i>
								<span id="profileopt">Wishlist </span>
							</a>
						</li>
						<li className='navsidebaropt2'>
							<a className=' sidebaropt2' onClick={navigatecart}>
								<i class='fa-solid fa-cart-shopping fa-lg'></i>
								<span id="profileopt">My Cart </span> 
							</a>
						</li>

						<li className='navsidebaropt2'>
							<a className=' sidebaropt2'>
								<i class='fa-solid fa-chalkboard-user fa-lg'></i>
								<span id="profileopt">Tests </span>
							</a>
						</li>
					</ul>
				</nav>
				{/* main */}
				<div className='container'>
					{content === "editprofile" && <EditProfile />}
					{content === "mycourses" && <MyCourses />}
					{content === "wishlist" && <Wishlist />}
				</div>
			</div>
		</div>
	);
}

export default Profile;
