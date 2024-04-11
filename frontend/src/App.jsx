import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar.jsx";
import About from "./pages/About.jsx";
import Auth from "./pages/Auth.jsx";
import Team from "./pages/Team.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
