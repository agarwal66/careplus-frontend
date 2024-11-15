import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Askwithai from "./pages/Askwithai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./pages/Login";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://careplus-bakend-production.up.railway.app/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Clear persistent login state
  };

  return (
    <>
      <Router>
        {/* Inline Navbar Definition */}
        <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
          <Link to="/">Home</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Askwithai" element={<Askwithai />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
