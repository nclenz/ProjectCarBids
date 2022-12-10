import HomePage from "../pages/HomePage";
import Modal from "../modal";
import { useState } from "react";
import Login from "./Login";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Login</button>
      <Modal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Login />
      </Modal>
    </>
  );
};

export default Navbar;
