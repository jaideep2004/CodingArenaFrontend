import  { useState ,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import CourseListCard from "./CourseListCard";
import CourseContent from "../coursecontent/CourseContent"

const CourseList = () => {
  
 const navigate = useNavigate();
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

  
  const [selectedCourse, setSelectedCourse] = useState(null);


  const handleCardClick = (id,cname,title,description,image,rating,price,date) => {
    setSelectedCourse({ id,cname,title,description,image,rating,price,date});
    navigate('/coursecontent', { state: { course: {id,cname,title,description,image,rating,price ,date} } });
  }

   return (
    <>
    
    <div className=" courses  mx-auto w-10/12" id="course"  >


      <center>
        <h1  style={{color:'#a11afe',fontWeight:'800',marginTop:'35px',fontSize:'32px'}}>
          Explore Our Top Courses </h1>
          </center>

      <div className="cards flex justify-center my-4 flex-wrap  md:flex-row flex-col items-center ">



      {courses.map((course) => (
          <CourseListCard
          key={course._id}
          id={course.id}
         cname={course.cname}
          title={course.title}
          description={course.description}
          image={course.image}
          rating={course.rating}
          price={course.price}
          date={course.date}
            onClick={() => handleCardClick(course.id,course.cname,course.title,course.description,course.image,course.rating,course.price,course.date)}
            
          />
        ))}

         {selectedCourse && (  
        <CourseContent
        key={selectedCourse._id}
        id={selectedCourse.id}
        cname={selectedCourse.cname}
          title={selectedCourse.title}
          description={selectedCourse.description}
          image={selectedCourse.image}
          rating={selectedCourse.rating}
          
          price={selectedCourse.price}
          date={selectedCourse.date}
         
        />
        
      )}
         
        
      

      </div>
     
    </div>
    </>
  );
};

export default CourseList;

