import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HostLogin = ({ setIsHostModalOpen, setLogin, login }) => {
  const [username, setUsername] = useState("");
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
      fetch("/accounts");
      // .then((request) => request.json())
      // .then((data) => setMsg(data));
      setLogin("host");
      navigate("/hostdashboard");
      setIsHostModalOpen(false);
    } else {
      setMsg("Login Fail");
    }
  };

  return (
    <>
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
        <Link to="/hostsignup">Sign Up</Link>
      </span>
      <p>{msg}</p>
    </>
  );
};

export default HostLogin;
