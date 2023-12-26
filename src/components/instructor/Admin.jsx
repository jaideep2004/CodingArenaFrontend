import { useState } from "react";
import "../profile/profile.css";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";
import ManageCourse from "./ManageCourse";
import "../header/header.css";

function Admin() {
	const [content, setContent] = useState("createCourse"); // Default content is the dashboard

	// Function to switch content based on sidebar link click
	const switchContent = (newContent) => {
		setContent(newContent);
	};

	return (
		<div>
			<div id='' className='flex '>
				{/* Sidebar */}
				<nav id='sidebar2' className='col-md-3 col-lg-2 d-md-block '>
					<ul className='nav flex-column profilesidebar'>
						<li className='navsidebaropt2' style={{ cursor: "pointer" }}>
							<a
								className={`sidebaropt2 ${
									content === "createCourse" ? "active" : ""
								}`}
								onClick={() => switchContent("createCourse")}>
								<i class='fa-solid fa-plus fa-lg '></i>
								<span id="profileopt">Create Course </span>
							</a>
						</li>
						<li className='navsidebaropt2' style={{ cursor: "pointer" }}>
							<a
								className={`sidebaropt2 ${
									content === "updateCourse" ? "active" : ""
								}`}
								onClick={() => switchContent("updateCourse")}>
								<i class='fa-solid fa-pen-nib fa-lg'></i>
								<span id="profileopt">Update Course </span>
							</a>
						</li>
						<li className='navsidebaropt2' style={{ cursor: "pointer" }}>
							<a
								className={`sidebaropt2 ${
									content === "manageCourse" ? "active" : ""
								}`}
								onClick={() => switchContent("manageCourse")}>
								<i class='fa-solid fa-bars-progress fa-lg'></i>
								<span id="profileopt">Manage Courses </span>
							</a>
						</li>
					</ul>
				</nav>

				{/* Main content */}
				<div className='container'>
					{content === "createCourse" && <CreateCourse />}
					{content === "updateCourse" && <UpdateCourse />}
					{content === "manageCourse" && <ManageCourse />}
				</div>
			</div>
		</div>
	);
}

export default Admin;
