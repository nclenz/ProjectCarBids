import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HostLogin = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      fetch("/api/host")
        .then((request) => request.json())
        .then((data) => setMsg(data));
      navigate("/hostdashboard");
      setLoggedIn(true);
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
    </>
  );
};

export default HostLogin;
