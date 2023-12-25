import "./main.css";
import { Link } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import CourseSlider from "./CourseSlider";
import Footer from "../footer/Footer";
import "../header/header.css"


function Main() {

  const navigate = useNavigate();

	const navigatecourses = () => {
		navigate("/courselist");
	};

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-heading">Online Learning Platform </h1>

          <p className="hero-description">
            Explore Our Wide Range of Courses. Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </p>
          <div className="herobutton">
            <Link to="signup">
              
              <button className="hbutton">SignUp for free</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="./images/hero.jpg" alt="Hero Image" />
        </div>
      </section>

      <div className="hero-section">
        <div className="services">
          <div className="service">
            <i class="fa-solid fa-globe fa-beat fa-xl"></i>
            <h3 className="cardheading">Ease of Learning</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
              maiores debitis voluptatum
            </p>
          </div>
          <div className="service">
            <i class="fa-solid fa-chalkboard fa-beat fa-xl"></i>
            <h3 className="cardheading">Top Instructors</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
              maiores debitis voluptatum
            </p>
          </div>
          <div className="service">
            <i class="fa-solid fa-book fa-beat fa-xl"></i>
            
            <h3 className="cardheading">Test Preparation</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
              maiores debitis voluptatum
            </p>
          </div>
        </div>
      </div>
      
      <div className="featured" onClick={navigatecourses}>
        <center>
          <h1 className="featuredheading">Our Featured Courses</h1>
          </center>
        <CourseSlider/>
      </div>
      <Footer/>
    </>
  );
}

export default Main;
