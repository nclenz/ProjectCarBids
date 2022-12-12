import { Link } from "react-router-dom";
import Modal from "../modal";
import { useState } from "react";
import Login from "./Login";
import { FaCar, FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FaCar />
      </Link>
      <div className="nav-items">
        <Link to="/explore" className="nav-item">
          Explore
        </Link>
        <a href="https://wa.me/6588868257" className="nav-item">
          <FaWhatsapp />
          Contact Us
        </a>
        <h1 className="nav-item" onClick={() => setIsModalOpen(true)}>
          Login
        </h1>
        <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Login />
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
