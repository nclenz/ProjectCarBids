import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OwnerContext } from "../../App";

const HostLogin = ({ setIsHostModalOpen, setLogin, login }) => {
  const { owner, setOwner } = useContext(OwnerContext);
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/hostlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      try {
        const result = await response.json();
        setOwner(result);
        setLogin("host");
        navigate("/hostdashboard");
        setIsHostModalOpen(false);
      } catch (error) {
        console.log({ msg: "catches error" });
      }
    } else {
      setMsg("Login Fail");
    }
  };

  return (
    <OwnerContext.Provider value={{ owner, setOwner }}>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <span>
        <p>NOT A MEMBER? Register for a free account</p>
        <Link to="/hostsignup" onClick={() => setIsHostModalOpen(false)}>
          Sign Up
        </Link>
      </span>
      <p>{msg}</p>
    </OwnerContext.Provider>
  );
};

export default HostLogin;
