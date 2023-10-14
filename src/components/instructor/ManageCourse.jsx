import  { useState ,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import CourseListCard from "../courselist/CourseListCard";

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

  return (

    <>
     <h2 className="createcoursehead" style={{marginLeft:'30px'}}>Uploaded Courses</h2>
    <div className="cards flex  mt-2 flex-wrap  md:flex-row flex-col items-center " >

      
{courses.map((course) => (
          <CourseListCard
          key={course._id}
          id={course.id}
          cname={course.cname}
    title={course.title}
    image={course.image}
    
          rating={course.rating}
            price={course.price}
            description={course.description}
           
          />
        ))
        }
    </div>
    </>
  )
}
