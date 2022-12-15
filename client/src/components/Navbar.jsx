import { Link } from "react-router-dom";
import Modal from "../modal/Modal";
import { useState } from "react";
import { FaCar, FaWhatsapp } from "react-icons/fa";
import UserLogin from "../pages/renter/UserLogin";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FaCar />
      </Link>
      <div className="nav-items">
        <Link to="/createlistings" className="nav-item">
          Create Listing
        </Link>
        <Link to="/explore" className="nav-item">
          Explore
        </Link>
        <a href="https://wa.me/6588868257" className="nav-item">
          <FaWhatsapp />
          Contact Us
        </a>
        <h1 className="nav-item" onClick={() => setIsModalOpen(true)}>
          Rent a Car
        </h1>
        <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UserLogin />
        </Modal>
        <h1 className="nav-item" onClick={() => setIsModalOpen(true)}>
          Be a Host
        </h1>
        <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UserLogin />
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
