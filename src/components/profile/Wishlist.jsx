import { useState, useEffect } from "react";
import axios from "axios";
import WishlistItem from "./WishlistItem";
import { ToastContainer, toast } from "react-toastify";

export default function Wishlist() {
	const [wishlist, setWishlist] = useState([]);

	useEffect(() => {
		// Fetch the list of courses in the cart from your API
		axios
			.get("http://localhost:3001/wishlist")
			.then((response) => {
				setWishlist(response.data);
			})
			.catch((error) => {
				console.error("Error fetching cart data:", error);
			});
	}, []);

	const removeFromWishlist = async (courseTitle) => {
		try {
			// Make an API request to remove the course from the backend
			await axios.delete(
				`http://localhost:3001/wishlist/remove/${courseTitle}`
			);
			toast.success("Course removed from wishlist ");

			// After successful removal from the backend, update the cart on the frontend
			setWishlist((prevWishlist) => {
				// Filter out the removed item
				const updatedWishlist = prevWishlist.filter(
					(course) => course.title !== courseTitle
				);

				return updatedWishlist;
			});
		} catch (error) {
			console.error("Error removing course from cart:", error);
		}
	};

	return (
		<div>
			<h2 className='mycoursehead ml-8'>Wishlist</h2>
			<div className=" wishitemcontainer">
				<ul className='flex flex-col  '>
					{wishlist.length === 0 ? (
						<p >Your wishlist is empty.</p>
					) : (
						<div>
							{wishlist.map((course) => (
								<WishlistItem
									key={course.id}
									price={course.price}
									title={course.title}
									course={course}
									removeFromWishlist={removeFromWishlist}
								/>
							))}
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}
