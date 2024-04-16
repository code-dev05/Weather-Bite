import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/suggestions.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Suggestions() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url(images/suggestions.png)";
    if (!cookies.token) {
      alert("Sign in First!");
      navigate("/auth");
    }
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/food/weather/${localStorage.getItem(
          "weather"
        )}`
      );
      setItems(data);
    };

    fetchData();
  }, []);

  const handleClick = async (index) => {
    navigate(`/${items[index]._id}`);
  };

  return (
    <div className="suggestions">
      <div className="weather">
        <h1>Weather Recorded: {localStorage.getItem("weather")}</h1>
        {/* <img src="images/sunny.png" alt="Weather" /> */}
      </div>
      <h1>SUGGESTIONS:</h1>
      <div className="foods">
        {items?.map((item, index) => (
          <div className="item" key={index} onClick={() => handleClick(index)}>
            <div className="circular-image">
              <img src={item.image} alt={item.foodName} />
            </div>
            <h1>{item.foodName}</h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suggestions;
