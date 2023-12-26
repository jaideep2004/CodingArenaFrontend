import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../cart/CartContext";

function Header() {
	const { state, fetchCartItemCount } = useCart();
	const { cartItemCount } = state;

	useEffect(() => {
		fetchCartItemCount();
	}, [fetchCartItemCount]);

	const { isLoggedIn } = useAuth();
	const { setIsLoggedIn } = useAuth();

	const navigate = useNavigate();

	// Callback function to update the state when the user logs out
	const handleLogout = () => {
		localStorage.removeItem("jwtToken");
		setIsLoggedIn(false);
		toast.success("Logged Out!");
		setTimeout(() => {
			navigate("/");
		}, 2000);
	};
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const [isIconVisible, setIsIconVisible] = useState(false);

	const toggleIcon = () => {
		setIsIconVisible(!isIconVisible);
	};

	const handleButtonClick = () => {
		toggleVisibility();
		toggleIcon();
		// Add any other functions you want to call here
	};

	const handleLinkClick = () => {
		// Close the menu when a link is clicked
		setIsVisible(false);
		setIsIconVisible(false);
	};

	return (
		<header className='shadow-sm'>
			<Link to='/'>
				<div className='logo'>
					<img src='./images/logo3.png' alt='' />
					<div className='logoname'>CODING ARENA</div>
				</div>
			</Link>

			{/* mobile menu icon */}
			<div onClick={handleButtonClick}>
				{/* <i id='mobilemenuicon' class='fa-solid fa-bars fa-xl' ></i> */}
				{isIconVisible ? (
					<i id='mobilemenuicon' class='fa-solid fa-circle-xmark fa-2xl'></i>
				) : (
					<i id='mobilemenuicon' class='fa-solid fa-bars fa-2xl'></i>
				)}
			</div>

			{isVisible && (
				<div className='mobilemenu'>
					<ul className='mobilemenuitems'>
						<li onClick={handleLinkClick}>
							<Link to='/'>HOME</Link>
						</li>
						<li onClick={handleLinkClick}>
							<Link to='/courselist'>COURSES</Link>
						</li>
						<li onClick={handleLinkClick}>
							<Link to='admin'>INSTRUCTOR</Link>
						</li>
						<li onClick={handleLinkClick}>
							<Link to='/cart'>
								CART
								{cartItemCount > 0 && (
									<span className='cart-counter'>{cartItemCount}</span>
								)}
							</Link>
						</li>
						<div className='mobilebuttons'>
							{isLoggedIn ? (
								<>
									<Link to='profile'>
										<img
											
											className='headerprofile '
											src='./images/profile.webp'
											alt='Profile'
											onClick={handleLinkClick}
											  
										/>
									</Link>
									<div onClick={handleLinkClick}>
									<button onClick={handleLogout} className='mobbutton'
									>
										Logout
									</button></div>
								</>
							) : (
								<>
									<Link to='signup' onClick={handleLinkClick}>
										<button className='mobbutton'>Sign Up</button>
									</Link>
									<Link to='login' onClick={handleLinkClick}>
										<button className='mobbutton'>Login</button>
									</Link>
								</>
							)}
						</div>
					</ul>
				</div>
			)}

			{/* laptop menu */}
			<nav>
				<ul className='menu'>
					<li className='menu-item'>
						<Link to='/'>HOME</Link>
					</li>
					<li className='menu-item '>
						<Link to='/courselist'>COURSES</Link>
					</li>
					<li className='menu-item'>
						<Link to='admin'>INSTRUCTOR</Link>
					</li>
					<li className='menu-item'>
						<Link to='/cart'>
							CART
							{cartItemCount > 0 && (
								<span className='cart-counter'>{cartItemCount}</span>
							)}
						</Link>
					</li>
				</ul>
			</nav>
			<div className='buttons'>
				{isLoggedIn ? (
					<>
						<Link to='profile'>
							<img
								className='headerprofile button'
								src='./images/profile.webp'
								alt='Profile'
							/>
						</Link>
						<button onClick={handleLogout} className='button'>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to='signup'>
							<button className='button'>Sign Up</button>
						</Link>
						<Link to='login'>
							<button className='button'>Login</button>
						</Link>
					</>
				)}
			</div>
		</header>
	);
}

export default Header;
