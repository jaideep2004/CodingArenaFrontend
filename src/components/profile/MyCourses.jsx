import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

export default function MyCourses() {
	const [orders, setOrders] = useState([]);

	// Fetch orders based on the user's email
	useEffect(() => {
		const token = localStorage.getItem("jwtToken");
		const headers = {
			Authorization: token,
		};

		// Send a GET request to fetch the user's orders
		axios
			.get("http://localhost:3001/orders", { headers })
			.then((response) => {
				setOrders(response.data);
			})
			.catch((error) => {
				console.error("Error fetching user's orders:", error);
			});
	}, []);


	return (
		<div>
			<h2 className='mycoursehead ml-8 '>My Courses</h2>

			<div className="cards flex justify-center my-4 ml-5 flex-wrap  md:flex-row flex-col items-center">
				{orders.map((order) => (
					<CourseCard
						key={order._id.$oid}
						image={order.cart[0].image}
						title={order.cart[0].title}
												
					/>
				))}

				
			</div>
		</div>
	);
}
