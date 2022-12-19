import { Link } from "react-router-dom";
import Modal from "../../modal/Modal";
import { useState, useContext } from "react";
import { FaCar, FaWhatsapp } from "react-icons/fa";
import UserLogin from "../../pages/renter/UserLogin";
import HostLogin from "../../pages/host/HostLogin";
import { LoginContext } from "../../App";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);
  // const [loggedIn, setLoggedIn] = useContext(LoginContext);

  // console.log("User", isUserModalOpen);
  // console.log("HOST", isHostModalOpen);
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FaCar />
      </Link>
      <div className="nav-items">
        <Link to="/manage" className="nav-item">
          Manage Listing
        </Link>
        <Link to="/explore" className="nav-item">
          Explore
        </Link>
        <a href="https://wa.me/6588868257" className="nav-item">
          <FaWhatsapp />
          Contact Us
        </a>

        <h1 className="nav-item" onClick={() => setIsUserModalOpen(true)}>
          Renter
        </h1>

        <h1 className="nav-item" onClick={() => setIsHostModalOpen(true)}>
          Host
        </h1>

        <Modal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
        >
          <UserLogin />
        </Modal>

        <Modal
          isOpen={isHostModalOpen}
          onClose={() => setIsHostModalOpen(false)}
        >
          <HostLogin />
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;