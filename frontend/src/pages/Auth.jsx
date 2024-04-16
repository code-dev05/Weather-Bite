import React, { useEffect, useState } from "react";
import "../styles/auth.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Auth() {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = "url('images/auth.png')";
  });
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth">
      <div className="template">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
}

const Login = ({ setIsLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["token"]);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { username, password }
      );
      setCookies("token", data.token);
      window.localStorage.setItem("userId", data.user._id);
      navigate("/");
    } catch {
      setIsInvalid(true)
      setUsername("")
      setPassword("")
      return;
    }
  };

  return (
    <div className="login">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Sign In</button>
      </form>

      <p>
        Not a User?{" "}
        <span onClick={() => setIsLogin((prev) => !prev)}>Sign Up</span>
      </p>
      {isInvalid && <p>Invalid Username or Password</p> }
    </div>
  );
};

const Register = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["token"]);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirm) {
      setIsInvalid(true);
      setName("");
      setUsername("");
      setPassword("");
      setConfirm("");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        { name, username, password }
      );
      setCookies("token", data.token);
      window.localStorage.setItem("userId", data.user._id);
      navigate("/");
    } catch {
      setIsInvalid(true)
      setUsername("")
      setPassword("")
      return;
    }
  };

  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Account Already Created?{" "}
        <span onClick={() => setIsLogin((prev) => !prev)}>Sign In</span>
      </p>
      {isInvalid && <p>Invalid Credentials</p> }

    </div>
  );
};

export default Auth;
