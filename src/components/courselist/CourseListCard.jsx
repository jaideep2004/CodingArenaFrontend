import { useState, useEffect } from "react";

import { BiSolidUser } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./courselist.css";

export default function CourseListCard({
	cname,
	price,
	rating,
	title,
	image,
	description,
	date,
	onClick,
	
}) {
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (isHovered) {
			// Dismiss any existing notifications before showing a new one
			toast.dismiss();
			toast.info(description, {
				autoClose: 3000,
			});
		}
	}, [isHovered]);

	

	return (
		<div
			className='card  cursor-pointer   mx-4 w-11/12 md:w-3/12  shadow-xl border-2 shadow-slate-300  hover:shadow-pink-200 '
			id='coursecard'
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<ToastContainer />

			<div className='img-section' id='courseimg'>
				<img src={`http://localhost:3001/uploads/${image}`}
				loading="lazy"/>
			</div>

			<div className='content-section px-2'>
				<div className='rating flex justify-between mt-1'>
					<div className='flex item-center '>
						<p className='ml-2' id='student'>
							
							12
						</p>
						<BiSolidUser className=' my-1 ml-1' style={{ color: "#f5ac82" }} />
					</div>

					<div className='flex item-center  '>
						<p className='mr-1' id='rating'>
							{rating}
						</p>
						<AiFillStar className=' my-1 mr-1' style={{ color: "#f5ac82" }} />
					</div>
				</div>

				<div className='text-center font-bold text-xl my-3 flex  flex-col items-center justify-center '>
					<p> {cname} </p>
				</div>

				<div className='text-center' id='coursetitle' style={{color: '#333'}}>
					{title}
				</div>

				<div className='flex justify-between my-4' id='pricediv'>
					<p>Beginner Friendly </p>
					<p> ₹ {price} </p>
				</div>
				
			</div>
		</div>
	);
}
