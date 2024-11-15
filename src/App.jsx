import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Footer from "./components/Footer";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
// import Ai from "./pages/Ai"
// import Aii from "./components/Aii";
import Chatbot from "./pages/chat";
=======
import Navbar from "./components/Navbar"; // Proper Navbar import
>>>>>>> 3f5acbd422c0d8d5b3aade25d262943fdcd79305
import Askwithai from "./pages/Askwithai";
import chat from "./pages/chat"
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
          "http://localhost:4000/api/v1/user/patient/me",
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

  return (
    <>
      <Router>
        <Navbar /> {/* Navbar used here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Askwithai" element={<Askwithai />} />
        </Routes>
        {/* <chat /> */}
        <Footer />
        <div className="chats">
        <Chatbot/>
        
        </div>
        
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
