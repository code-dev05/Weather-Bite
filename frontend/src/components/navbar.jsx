import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const location = useLocation().pathname;
  useEffect(() => {
    const navbar = document.querySelector(".navbar .left").childNodes;
    navbar.forEach((elem, index) => {
      if (index != 3) elem.style.color = "white";
      else elem.style.color = "#1F2937";
    });
    if (location == "/") navbar[0].style.color = "yellow";
    if (location == "/about") navbar[1].style.color = "yellow";
    if (location == "/team") navbar[2].style.color = "yellow";
  }, [useLocation().pathname]);
  
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" id="navbar-home">
          Home
        </Link>
        <Link to="/about" id="navbar-about">
          About
        </Link>
        <Link to="/team" id="navbar-team">
          Team
        </Link>
        <Link to="/" id="navbar-spotlight">
          Spotlight
        </Link>
      </div>
      <div className="right">
        <Link to="/auth">Sign In</Link>
      </div>
    </div>
  );
}

export default Navbar;
