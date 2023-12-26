import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Signup from "./components/signuplogin/Signup";
import Login from "./components/signuplogin/Login";
import CourseList from "./components/courselist/CourseList";
import Profile from "./components/profile/Profile";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CourseContent from "./components/coursecontent/CourseContent";
import Cart from "./components/cart/Cart";
import VerifyOtp from "./components/signuplogin/VerifyOtp";
import { ToastContainer, toast } from "react-toastify";
import Checkout from "./components/cart/Checkout";
import Admin from "./components/instructor/Admin";
import Footer from "./components/footer/Footer";
 
import { AuthProvider } from "./components/header/AuthContext";
import { CartProvider } from "./components/cart/CartContext";


function App() {
	const [cart, setCart] = useState([]);
	return (
		
		<CartProvider>
			<AuthProvider>
		<BrowserRouter>
					<Header />
					

			<Routes>
				<Route path='header' element={<Header cart={cart} />} />

				<Route path='signup' element={<Signup />} />

				<Route path='verifyotp' element={<VerifyOtp />} />

				<Route path='login' element={<Login />} />

				<Route path='courselist' element={<CourseList />} />

				<Route path='profile' element={<Profile />} />

				<Route path='coursecontent' element={<CourseContent />} />

				<Route path='admin' element={<Admin />} />

				<Route path='checkout' element={<Checkout />} />

				<Route path='cart' element={<Cart />} />

						<Route path='/' element={<Main />} />
						<Route path='footer' element={<Footer />} />
						
				</Routes>
				
			</BrowserRouter>
			</AuthProvider>
			</CartProvider>
			
			
	);
}

export default App;
