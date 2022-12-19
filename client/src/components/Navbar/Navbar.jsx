import { Link } from "react-router-dom";
import Modal from "../../modal/Modal";
import { useState, useContext } from "react";
import { FaCar, FaWhatsapp } from "react-icons/fa";
import UserLogin from "../../pages/renter/UserLogin";
import HostLogin from "../../pages/host/HostLogin";

const Navbar = ({ setLogin }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

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
          <UserLogin
            setIsUserModalOpen={setIsUserModalOpen}
            setLogin={setLogin}
          />
        </Modal>

        <Modal
          isOpen={isHostModalOpen}
          onClose={() => setIsHostModalOpen(false)}
        >
          <HostLogin
            setIsHostModalOpen={setIsHostModalOpen}
            setLogin={setLogin}
          />
        </Modal>
      </div>
    </nav>
  );
};

export default Navbar;
