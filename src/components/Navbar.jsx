import React, { useContext } from "react";
import { Context } from "../main"; // Adjust the path to your Context file
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

<<<<<<< HEAD
  const handleLogout = async () => {
    await axios
      .get(
        "http://localhost:4000/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
=======
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Clear persistent login state
>>>>>>> 3f5acbd422c0d8d5b3aade25d262943fdcd79305
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
