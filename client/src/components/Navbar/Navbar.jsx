import { Link, useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";
import { useState, useContext } from "react";
import { FaCar, FaWhatsapp } from "react-icons/fa";
import UserLogin from "../../pages/renter/UserLogin";
import HostLogin from "../../pages/host/HostLogin";
import MyReservation from "../../pages/renter/MyReservation";

const Navbar = ({ login, setLogin }) => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("logged out");
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      setLogin("");
      navigate("/logout");
    } catch (error) {
      console.log(error);
    }
  };

  if (login === "") {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <FaCar />
        </Link>
        <div className="nav-items">
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
              login={login}
              setLogin={setLogin}
              setIsUserModalOpen={setIsUserModalOpen}
            />
          </Modal>

          <Modal
            isOpen={isHostModalOpen}
            onClose={() => setIsHostModalOpen(false)}
          >
            <HostLogin
              login={login}
              setLogin={setLogin}
              setIsHostModalOpen={setIsHostModalOpen}
            />

            {/* {ownerID && <CreateListing ownerID={ownerID} />} */}
          </Modal>
        </div>
      </nav>
    );
  }

  if (login === "user") {
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

          <p className="nav-item" onClick={handleLogOut}>
            Log Out
          </p>

          <Link to="/myreservation" className="nav-item">
            My Reservation
          </Link>
        </div>
      </nav>
    );
  }

  if (login === "host") {
    return (
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <FaCar />
        </Link>

        <Link to="/hostdashboard" className="nav-item">
          Manage Listing
        </Link>

        <div className="nav-items">
          <a href="https://wa.me/6588868257" className="nav-item">
            <FaWhatsapp />
            Contact Us
          </a>
          <p onClick={handleLogOut}>Log Out</p>
        </div>
      </nav>
    );
  }
};

export default Navbar;
