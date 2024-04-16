import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/recipe.css";
import { useCookies } from "react-cookie";

function Recipe() {
  const { foodId } = useParams();
  const [food, setFood] = useState({});
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url(images/recipes.png)";
    if (!cookies.token) {
      alert("Sign in First!");
      navigate("/auth");
    }
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/food/${foodId}`
      );
      data.video = `https://www.youtube.com/embed/${data.video.split("=")[1]}`;
      data.nutrition = data.nutrition.split(", ");
      console.log(data);
      setFood(data);
    };
    fetchData();
  }, []);
  return (
    <div className="recipe">
      <h1>{food.foodName}</h1>
      <iframe
        width="1022"
        height="575"
        src={food.video}
        title="Mango Lassi Recipe (Mango Yogurt Smoothie) Recipe by Manjula"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
      <div className="bottom">
        <div className="left">
          <h1>Text Recipe</h1>
          {food.recipe?.map((step, index) => (
            <p key={index}>{step}</p>
          ))}
        </div>
        <div className="right">
          <h1>Nutrition Information</h1>
          {food.nutrition?.map((info, index) => (
            <p key={index}>{info}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recipe;
