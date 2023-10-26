
import { Link } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import EditProfile from "./EditProfile";
import MyCourses from "./MyCourses";
import Wishlist from "./Wishlist";

function Profile() {
	const navigate = useNavigate();
	const navigatecart =()=>{
		navigate("/cart")
	}

	

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
		<div className='profilecontainer'>
			<ToastContainer />
			{/* sidebar */}
			<nav id='sidebar' className='col-md-3 col-lg-2 d-md-block  '>
				<div className='position-sticky'>
					<ul className='nav flex-column profilesidebar'>
						<li className='navsidebaropt'>
							
							<a
									className={`sidebaropt ${
										content === "editprofile" ? "active" : ""
									}`}
									onClick={() => switchContent("editprofile")}>
										<i class="fa-solid fa-user fa-lg "></i>
									Edit Profile
								</a>
						</li>
						<li className='navsidebaropt'>
						<a
									className={`sidebaropt ${
										content === "mycourses" ? "active" : ""
									}`}
									onClick={() => switchContent("mycourses")}>
										<i class="fa-solid fa-book fa-lg "></i>
									My Courses
								</a>
						</li>
						<li className='navsidebaropt'>
						<a
									className={`sidebaropt ${
										content === "wishlist" ? "active" : ""
									}`}
									onClick={() => switchContent("wishlist")}>
										<i class="fa-solid fa-heart fa-lg "></i>
									WishList
								</a>
						</li>
						<li className='navsidebaropt'>
							<a className=' sidebaropt' onClick={navigatecart}>
								<i
									class='fa-solid fa-cart-shopping fa-lg'></i>
								My Cart
							</a>
						</li>

						<li className='navsidebaropt'>
							<a className=' sidebaropt'>
								<i
									class='fa-solid fa-chalkboard-user fa-lg'></i>
								Tests
							</a>
						</li>
						
					</ul>
				</div>
			</nav>
			{/* main */}
			<div className='maincontent'>
					{content === "editprofile" && <EditProfile />}
					{content === "mycourses" && <MyCourses />}
					{content === "wishlist" && <Wishlist />}
					
				</div>
			
		</div>
	);
}

export default Profile;
