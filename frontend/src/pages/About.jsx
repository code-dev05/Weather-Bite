import React, { useEffect } from "react";
import "../styles/about.css";

function About() {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url('images/about.png')";
  }, []);

  return (
    <div className="about">
      <h1>ABOUT</h1>
      <div>
        <p>
          Welcome to our website, created by a group of B Tech Computer Science
          students from Vellore Institute of Technology, with guidance from
          Professor Senthilnathan!
        </p>
        <p>
          Are you ever stuck wondering what to eat, especially when the weather
          outside is changing? Well, we've got your back! Our website is
          designed to provide food suggestions tailored to your location's
          weather, so you never have to stress about meal choices again.
        </p>
        <p>
          Simply input your location, and we'll present you with a variety of
          delicious recipes perfectly suited to the current weather conditions.
          From comforting soups on rainy days to refreshing salads on sunny
          ones, we've got you covered.
        </p>
        <p>
          But that's not all! Each recipe comes with both video and written
          instructions, making it easy for you to follow along whether you're a
          seasoned chef or a kitchen newbie. We also include nutritional
          information, because we believe that eating well is important.
        </p>
        <p>
          Now, let's talk about our Spotlight section, where we showcase the
          most beloved recipes based on user ratings. It's a great way to
          discover crowd favourite dishes and find new favourites of your own.
        </p>
        <p>
          So, whether you're looking for meal inspiration or just want to try
          something new, we invite you to explore our website and embark on a
          culinary journey with us!
        </p>
      </div>
    </div>
  );
}

export default About;
