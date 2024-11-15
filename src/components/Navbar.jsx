import React, { useContext } from "react";
import { Context } from "../main"; // Adjust the path to your Context file
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Clear persistent login state
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <button onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
