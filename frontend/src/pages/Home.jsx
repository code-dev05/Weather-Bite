import { useEffect, useState } from "react";
import "../styles/home.css";
import { useDebounce } from "../hooks/debounce.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const debouncedValue = useDebounce(location, 1000);
  const [placeId, setPlaceId] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"])

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url('images/home.png')";
    if (!cookies.token) {
      alert("Sign in First!")
      navigate("/auth")
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/user/location/${debouncedValue}`
      );
      setLocations(data.predictions);
    };
    fetchData();
  }, [debouncedValue]);

  const handleFocus = () => {
    const dropDown = document.querySelector(".drop-down");
    dropDown.style.visibility = "visible";
  };

  const handleClick = (loc) => {
    setLocation(loc.description);
    setPlaceId(loc.place_id);
    const dropDown = document.querySelector(".drop-down");
    dropDown.style.visibility = "hidden";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/user/weather/${placeId}`
      );
      console.log(data);
      localStorage.setItem("weather", handleWeather(data.code));
      navigate("/suggestions");
    };
    fetchData();
  };

  const handleWeather = (code) => {
    const chillArr = [1066, 1069, 1114, 1117, 1135, 1147, 1204, 1207];
    const cloudyArr = [1003, 1006, 1009, 1030];
    const rainyArr = [
      1063, 1072, 1087, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195,
      1198, 1201, 1240, 1243, 1246, 1249, 1252, 1273, 1276, 1282,
    ];
    if (code == 1000) return "Sunny";
    else if (chillArr.includes(code)) return "Chill"
    else if (cloudyArr.includes(code)) return "Cloudy"
    else if (rainyArr.includes(code)) return "Rainy"
    else return "Snowy"
   };

  return (
    <div className="home">
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            name="location"
            placeholder="Enter Location Here..."
            onChange={() => setLocation(event.target.value)}
            onFocus={handleFocus}
            value={location}
          />
          <DropDown locations={locations} handleClick={handleClick} />
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const DropDown = ({ locations, handleClick }) => {
  return (
    <div className="drop-down">
      {locations?.map((loc, idx) => (
        <p key={idx} onClick={() => handleClick(loc)}>
          {loc.description}
        </p>
      ))}
    </div>
  );
};

export default Home;
