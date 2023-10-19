import { useState,useEffect } from "react";
import { BiSolidUser } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";


export default function AdminCourseCard({ image, title, rating, cname,removeFromList }) {
    
    const handleRemoveClick = () => {
		// Call the removeFromCart function with the course.id
		removeFromList(title);
	};
	return (
        <div>
            <ToastContainer/>
			<div
				className='card  cursor-pointer shadow-xl border-2 shadow-slate-300  hover:shadow-pink-200 '
				id='coursecard'
				style={{ height: "430px" }}>
				<div className='img-section' id='courseimg'>
					<img src={`http://localhost:3001/uploads/${image}`} />
				</div>

				<div className='content-section px-2'>
					<div className='rating flex justify-between mt-1'>
						<div className='flex item-center '>
							<p className='ml-2' id='student'>
								12
							</p>
							<BiSolidUser
								className=' my-1 ml-1'
								style={{ color: "#f5ac82" }}
							/>
						</div>

						<div className='flex item-center  '>
							<p className='mr-1' id='rating'>
								{rating}
							</p>
							<AiFillStar className=' my-1 mr-1' style={{ color: "#f5ac82" }} />
						</div>
					</div>
					<div className='text-center font-bold text-xl my-2 flex  flex-col items-center justify-center '>
						<p> {cname} </p>
					</div>
					<div className='text-center font-bold text-xl my-3 flex  flex-col items-center justify-center '>
						<p style={{ color: "#a11afe" }}> {title} </p>
					</div>

					<div className='text-center' id='coursetitle'>
						<button className='studybtn' onClick={handleRemoveClick}>Remove</button>
					</div>
				</div>
			</div>
		</div>
	);
}
