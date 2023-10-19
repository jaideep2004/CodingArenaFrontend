import  { useState ,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import CourseListCard from "../courselist/CourseListCard";
import { ToastContainer, toast } from "react-toastify";
import AdminCourseCard from "./AdminCourseCard";

export default function ManageCourse() {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch available courses from the server
    axios.get('http://localhost:3001/allcourses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  

  const removeFromList = async (title) => {
		try {
			// Make an API request to remove the course from the backend
			await axios.delete(`http://localhost:3001/allcourses/remove/${title}`);
      toast.success("Course removed ")
      
      setCourses((prevList) => {
				// Filter out the removed item
				const updatedList = prevList.filter((course) => course.title !== title);

				return updatedList;
			});
				
		} catch (error) {
      console.error("Error removing course ", error);
      toast.error("Error removing course ")
		}
	};


  return (

    <>
     <h2 className="createcoursehead ml-4" >Uploaded Courses</h2>
    <div className="cards flex ml-5 mt-2 flex-wrap  md:flex-row flex-col items-center " >

      
{courses.map((course) => (
          <AdminCourseCard
          key={course._id}
          id={course.id}
          cname={course.cname}
    title={course.title}
    image={course.image}
    
          rating={course.rating}
    price={course.price}
    removeFromList={removeFromList}
           
           
          />
        ))
        }
        <ToastContainer/>
    </div>
    </>
  )
}
