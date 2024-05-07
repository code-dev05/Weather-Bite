import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useCookies } from "react-cookie";

function Navbar() {
  const location = useLocation().pathname;
  useEffect(() => {
    const navbar = document.querySelector(".navbar .left").childNodes;
    navbar.forEach((elem, index) => {
      if (index != 3) elem.style.color = "white";
      else elem.style.color = "#1F2937";
    });
    if (location == "/") navbar[0].style.color = "yellow";
    if (location == "/team") navbar[2].style.color = "yellow";
  }, [useLocation().pathname]);

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  const logout = () => {
    setCookies("token", "");
    window.localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" id="navbar-home">
          Home
        </Link>
        <Link to="/team" id="navbar-team">
          Team
        </Link>
        <Link to="/" id="navbar-spotlight">
          Spotlight
        </Link>
      </div>
      <div className="right">
        {!cookies.token ? (
          <Link to="/auth">Sign In</Link>
        ) : (
          <Link to="/auth" onClick={logout}>Sign Out</Link> 
        )}
      </div>
    </div>
  );
}

export default Navbar;
