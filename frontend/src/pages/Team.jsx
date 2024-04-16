import React, { useEffect } from "react";
import "../styles/team.css";

function Team() {
  const teammates = [
    ["Mandeep KC", "Third Year B.Tech Student", "images/aditya_katoch.png"],
    [
      "Aditya Raj Katoch",
      "Third Year B.Tech Student",
      "images/aditya_katoch.png",
    ],
    [
      "Devansh Agarwal",
      "Second Year B.Tech Student",
      "images/aditya_katoch.png",
    ],
    ["Aliz Acharya", "Third Year B.Tech Student", "images/aditya_katoch.png"],
    ["Sumit", "Third Year B.Tech Student", "images/aditya_katoch.png"],
    [
      "Surya Pratap Singh Chauhan",
      "Third Year B.Tech Student",
      "images/aditya_katoch.png",
    ],
  ];

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url('images/team.png')";
  });

  return (
    <div className="team">
      <h1>MENTOR</h1>
      <div className="card">
        <div className="circular-image">
          <img src="images/aditya_katoch.png" alt="Placeholder" />
        </div>
        <div className="card-right">
          <h2>Professor Senthilnathan</h2>
          <p>Associate Professor Grade 1</p>
          <p>School of Computer Science and Engineering</p>
          <p>Vellore Institute Of Technology</p>
        </div>
      </div>
      <h1>TEAM</h1>
      {teammates.map((memb) => (
        <div className="card">
          <div className="circular-image">
            <img src={memb[2]} alt="Placeholder" />
          </div>
          <div className="card-right">
            <h2>{memb[0]}</h2>
            <p>{memb[1]}</p>
            <p>Computer Science and Engineering</p>
            <p>Vellore Institute of Technology</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Team;
