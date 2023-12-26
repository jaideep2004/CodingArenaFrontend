import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../header/header.css";



function Cart() {
	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		// Fetch the list of courses in the cart from your API
		axios
			.get("http://localhost:3001/cart")
			.then((response) => {
				setCart(response.data);

				// Calculate the total when the cart data is fetched
				const cartTotal = response.data.reduce(
					(acc, course) => acc + course.price,
					0
				);
				setTotal(cartTotal);
			})
			.catch((error) => {
				console.error("Error fetching cart data:", error);
			});
	}, []);

	const removeFromCart = async (courseTitle) => {
		try {
			// Make an API request to remove the course from the backend
			await axios.delete(`http://localhost:3001/cart/remove/${courseTitle}`);
			toast.success("Course removed ");

			// After successful removal from the backend, update the cart on the frontend
			setCart((prevCart) => {
				// Filter out the removed item
				const updatedCart = prevCart.filter(
					(course) => course.title !== courseTitle
				);

				// Recalculate the total based on the updatedCart
				const cartTotal = updatedCart.reduce(
					(acc, course) => acc + course.price,
					0
				);

				// Update the total
				setTotal(cartTotal);

				return updatedCart;
			});
		} catch (error) {
			console.error("Error removing course from cart:", error);
		}
	};

	const navigate = useNavigate();

	const navigatecourses = () => {
		navigate("/courselist");
	};

	
	const navigatecheckout = () => {
		// Check if the user is authenticated (token is available)
		const token = localStorage.getItem("jwtToken");

		if (token) {
			navigate("/checkout");
		} else {
			alert("Please log in to continue to checkout.");
		}
	};

	return (
		<div>
			<ToastContainer />
			<h1
				style={{
					fontSize: "33px",
					color: "#a11afe",
					fontWeight: "800",
					marginTop: "35px",
					marginLeft: "70px",
				}}>
				Shopping Cart
			</h1>
			<div className='flex mt-2' id="cartcontain">
				{/* cart section */}

				<div
					id="cartsection"
					className='flex flex-col  p-4  '
					>
					<ul id="orderitems" className='flex flex-col divide-y divide-gray-700'>
						{cart.length === 0 ? (
							<p>Your cart is empty.</p>
						) : (
							<div>
								{cart.map((course) => (
									<CartItem
										key={course.id}
										price={course.price}
										title={course.title}
										course={course}
										removeFromCart={removeFromCart}
									/>
								))}
							</div>
						)}
					</ul>

					<div className='flex justify space-x-4 my-3'>
						<button
							type='button'
							className='px-6 py-2 border rounded-md '
							style={{
								backgroundColor: "#f5ac82",
								color: "white",
								fontSize: "18px",
							}}
							onClick={navigatecourses}>
							Back to Shop
						</button>

						<button
							type='button'
							className='px-6 py-2 border rounded-md '
							style={{
								backgroundColor: "#a11afe",
								color: "white",
								fontSize: "18px",
							}}
							onClick={navigatecheckout}>
							Continue to Checkout
						</button>
					</div>
				</div>

				{/* order item section */}
				<div class='flex flex-col  p-4 'id="checkoutsection"
					>
					<div class='container mx-auto'>
						<div class='bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-left'>
							<div class='text-gray-700 font-bold py-1'>Total: ₹ {total} </div>

							<div class='text-gray-600 py-1'>Original Price ₹ {total}</div>

							<div classname='text-600'>
								<i class='fa-solid fa-check'></i>
								COUPON123 is Applied{" "}
							</div>

							<div class='mt-4 flex items-center'>
								<input
									class='w-full px-3 py-2 border rounded-l-lg'
									type='text'
									placeholder='Enter Coupon'
								/>
								<button
									class='px-4 py-2 rounded-r-lg flex-shrink-0'
									style={{
										backgroundColor: "#a11afe",
										color: "white",
										fontSize: "18px",
									}}>
									Apply Coupon
								</button>
							</div>

							<button
								class='w-full mt-4 px-4 py-2 rounded-lg'
								style={{
									backgroundColor: "#a11afe",
									color: "white",
									fontSize: "18px",
								}}
								onClick={navigatecheckout}>
								Checkout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
