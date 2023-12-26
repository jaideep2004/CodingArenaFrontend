import React from "react";
import { useAuth } from "../header/AuthContext";
import { useLocation } from "react-router-dom";
import "../header/header.css";



export default function CourseMaterial({
	cname,
	price,
	rating,
	title,
	image,
	description,
	date,
	pdf,
	video,
}) {
	const location = useLocation();
	const courseData = location.state?.course || {};
	const { isLoggedIn } = useAuth();

	return (
		<>
			<div className='coursematerial'>
				<h2 id='coursecontentheading2'>Course Content</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam odit
					ratione cupiditate labore. Distinctio rerum sequi quia voluptas,
					facilis sed dolorum mollitia harum, fugiat assumenda modi provident
					sunt officia nobis!
				</p>

				<div>
					{isLoggedIn ? (
						<div>
							<object
								className='cmaterial'
								data={`http://localhost:3001/uploads/${courseData.pdf}`} // Specify the URL to the PDF here
								type='application/pdf' // MIME type for PDF
								width='65%'
								height='300'
							/>
							<h2 id='coursecontentheading3'>Video Lecture</h2>
              <video
                id="mobilevideo"
								className='cmaterial'
								src={`http://localhost:3001/uploads/${courseData.video}`}
								width='500'
								height='300'
								controls></video>
						</div>
					) : (
						<div>
							<h2>Please log in to access course content</h2>
							{/* You can optionally render a login button or a message */}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
