import { useEffect, useState } from "react";
import "../styles/home.css";
import { useDebounce } from "../hooks/debounce.js";

function Home() {
  const [location, setLocation] = useState("");
  const debouncedValue = useDebounce(location, 1000);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url('images/home.png')";
  }, []);

  return (
    <div className="home">
      {/* <div className="logo">
                <img src="images/logo.png" alt="logo" height={324} width={319}/>
            </div> */}
      <div className="search-bar">
        <form>
          <input
            name="location"
            placeholder="Enter Location Here..."
            onChange={() => setLocation(event.target.value)}
            value={location}
          />
          <div>
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
