import  { useState } from 'react';
import jwtDecode from "jwt-decode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


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
    
        const token = localStorage.getItem("jwtToken");
    
        const headers = {
          Authorization: token,
        };
    
        try {
          axios.post("http://localhost:3001/upload", formData, { headers }).then((response) => {
            console.log("course created");
            showMessage("Course Created")
          });
        } catch (error) {
          console.error("Error uploading Image:", error);
        }
      };
    

  return (
    <div>
        <div>
             <h2 className="createcoursehead ml-4">Create Course</h2>
               <form onSubmit={handleSubmit} className='ml-4'>
                   <div className="mb-3">
                <label htmlFor="title" className="createcourselabel">
                 Instructor Name
               </label>
                <input
                  type="text"
                  className="form-control"
                  id="cname"
                  name="cname"
                  value={courseData.cname}
                  onChange={handleChange}
                  required
                  style={{width:'800px'}}

                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="createcourselabel">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={courseData.title}
                  onChange={handleChange}
                  required
                  style={{width:'800px'}}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="createcourselabel">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  required
                  style={{width:'800px'}}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="createcourselabel">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={courseData.price}
                  onChange={handleChange}
                  required
                  style={{width:'800px'}}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="createcourselabel">
                  Course Image
                </label>
                {/* Display the image preview */}
                {imagePreview && (
                  <div className="mb-3">
                    <label></label>
                    <img src={imagePreview} alt="Preview" width="100" />
                  </div>
                )}
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                  style={{width:'800px'}}
                />
              </div>
              <button type="submit" className="coursebtn ">
                Create Course
              </button>
                </form>

              <ToastContainer/>
            </div>
    </div>
  )
}


export default CreateCourse;
