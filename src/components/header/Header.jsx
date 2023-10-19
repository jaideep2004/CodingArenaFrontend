import React, { useState } from "react";


import "./header.css";

import { Link } from "react-router-dom";


function Header() {


  return (
    <header className="shadow-sm ">
      <Link to="/">
      <div className="logo">
        <img src="./images/logo3.png" alt="" />
        <div className="logoname">CODING ARENA</div>
      </div></Link>
      
      <nav>
        <ul className="menu">
          <li className="menu-item">
            <Link to="/">HOME</Link>
            </li>
          <li className="menu-item dropdown">
           <Link to="/courselist">COURSES</Link>
          </li>
          <li className="menu-item">
           <Link to="admin" >INSTRUCTOR</Link>
          </li>
          <li className="menu-item">
            <Link to="/cart">CART
            </Link>
          </li>

          
         
        </ul>
      </nav>
      <div className="buttons">
       <Link to="signup">  <button className="button">SignUp</button></Link>
       <Link to="login">  <button className="button">Login</button></Link>
       
      
      </div>
      <div >
      
      <Link to="/profile"><img className="headerprofile" src="./images/profile.webp" alt="" />
            </Link>
      </div>

    
      
    </header>
  );
}

export default Header;
