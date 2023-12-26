import { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import '../header/header.css'




function CreateCourse() {
	const [courseData, setCourseData] = useState({
		cname: "",
		title: "",
		description: "",
		price: "",
		image: null,
	});

	//form data
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCourseData({ ...courseData, [name]: value });
	};

	const [imagePreview, setImagePreview] = useState(null);
	
	const [pdfPreview, setPdfPreview] = useState(null);
const [videoPreview, setVideoPreview] = useState(null);


	//image upload
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setCourseData({ ...courseData, image: file });
		// Display a preview of the selected image
		const reader = new FileReader();
		reader.onload = (event) => {
			setImagePreview(event.target.result);
		};
		reader.readAsDataURL(file);
	};

	//to check admin
	const isAdmin = () => {
		const token = localStorage.getItem("jwtToken");
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken.user && decodedToken.user.admin) {
					return true; // User is an admin
				}
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		}
		return false; // User is not an admin
	};

	//notifications
	const showMessage = (text, isError = false) => {
		toast.info(text, {
			autoClose: 6000,
			className: isError ? "toast-error" : "toast-success",
		});
		console.log(text);
	};

	// course upload
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Check if the user is an admin before allowing course creation
		if (!isAdmin()) {
			alert("You don't have admin access to create a course.");
			return;
		}

		const formData = new FormData();
		formData.append("cname", courseData.cname);
		formData.append("title", courseData.title);
		formData.append("description", courseData.description);
		formData.append("price", courseData.price);
		formData.append("image", courseData.image);

		formData.append("pdf", pdfFile);
		formData.append("video", videoFile);

		const token = localStorage.getItem("jwtToken");

		const headers = {
			Authorization: token,
		};

		try {
			axios
				.post("http://localhost:3001/upload", formData, { headers })
				.then((response) => {
					console.log("course created");
					showMessage("Course Created");

					 // Clear the form inputs on successful course creation
					 setCourseData({
						cname: "",
						title: "",
						description: "",
						price: "",
						image: null,
					  });
			  
					  // Reset PDF and video previews
					  setPdfFile(null);
					  setVideoFile(null);
			  
					  // Clear image, PDF, and video previews
					  setImagePreview(null);
					  setPdfPreview(null);
					  setVideoPreview(null);
				});
		} catch (error) {
			console.error("Error uploading Image:", error);
		}
	};

	const [pdfFile, setPdfFile] = useState(null);
	const [videoFile, setVideoFile] = useState(null);

	const handlePdfChange = (e) => {
	  const file = e.target.files[0];
		setPdfFile(file);
 // Display a preview of the selected PDF
 const reader = new FileReader();
 reader.onload = (event) => {
   setPdfPreview(event.target.result);
 };
 reader.readAsDataURL(file);
		
	};

	const handleVideoChange = (e) => {
	  const file = e.target.files[0];
		setVideoFile(file);
		 // Display a preview of the selected video
		 const reader = new FileReader();
		 reader.onload = (event) => {
		   setVideoPreview(event.target.result);
		 };
		 reader.readAsDataURL(file);
	};

	return (
		<div>
			<div>
				<h2 className='createcoursehead ml-5'>Create Course</h2>
				<form onSubmit={handleSubmit} className='ml-5'>
					<div className='mb-3 mobilecourseinput' >
						<label htmlFor='title' className='createcourselabel'>
							Instructor Name
						</label>
						<input
							type='text'
							className='form-control'
							id='cname'
							name='cname'
							value={courseData.cname}
							onChange={handleChange}
							required
							
						/>
					</div>
					<div className='mb-3 mobilecourseinput'>
						<label htmlFor='title' className='createcourselabel'>
							Title
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={courseData.title}
							onChange={handleChange}
							required
							
						/>
					</div>
					<div className='mb-3 mobilecourseinput'>
						<label htmlFor='description' className='createcourselabel'>
							Description
						</label>
						<textarea
							className='form-control'
							id='description'
							name='description'
							value={courseData.description}
							onChange={handleChange}
							required
							></textarea>
					</div>
					<div className='mb-3 mobilecourseinput'>
						<label htmlFor='price' className='createcourselabel'>
							Price
						</label>
						<input
							type='number'
							className='form-control'
							id='price'
							name='price'
							value={courseData.price}
							onChange={handleChange}
							required
							
						/>
					</div>
					<div className='mb-3 mobilecourseinput'>
						<label htmlFor='image' className='createcourselabel'>
							Course Image
						</label>
						{/* Display the image preview */}
						{imagePreview && (
							<div className='mb-3'>
								<label></label>
								<img src={imagePreview} alt='Preview' width='100' />
							</div>
						)}
						<input
							type='file'
							className='form-control'
							id='image'
							name='image'
							onChange={handleImageChange}
							accept='image/*'
							required
							
						/>
					</div>

					<div className='mb-3 mobilecourseinput'>
						<label htmlFor='pdf' className='createcourselabel'>
							Upload PDF
						</label>
						{pdfPreview && (
    <div className='mb-3'>
      <embed src={pdfPreview} type="application/pdf" width="300"  />
    </div>
  )}
						<input
							type='file'
							className='form-control'
							id='pdf'
							name='pdf'
							onChange={handlePdfChange}
							accept='.pdf'
							required
							
						/>
					</div>
					<div className='mb-3 mobilecourseinput'>
						<label htmlFor='video' className='createcourselabel'>
							Upload Video
						</label>

						{videoPreview && (
    <div className='mb-3'>
      <video width="200"  controls>
        <source src={videoPreview} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )}
						<input
							type='file'
							className='form-control'
							id='video'
							name='video'
							onChange={handleVideoChange}
							accept='video/*'
							required
							
						/>
					</div>

					<button type='submit' className='coursebtn '>
						Create Course
					</button>
				</form>

				<ToastContainer />
			</div>
		</div>
	);
}

export default CreateCourse;
