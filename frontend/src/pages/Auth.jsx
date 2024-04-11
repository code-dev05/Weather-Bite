import React, { useEffect, useState } from "react";
import "../styles/auth.css";

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
  return (
    <div className="login">
      <h1>Sign In</h1>
      <form>
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Forgot Password? <span>Click Here</span>
      </p>
      <p>
        Not a User?{" "}
        <span onClick={() => setIsLogin((prev) => !prev)}>Sign Up</span>
      </p>
    </div>
  );
};

const Register = ({ setIsLogin }) => {
  return (
    <div className="register">
      <h1>Sign Up</h1>
      <form>
        <input type="text" name="name" placeholder="Enter Name" />
        <input type="text" name="username" placeholder="Enter Username" />
        <input type="password" name="password" placeholder="Enter Password" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Account Already Created? <span onClick={() => setIsLogin(prev => !prev)}>Sign In</span>
      </p>
    </div>
  );
};

export default Auth;
