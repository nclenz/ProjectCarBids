import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = ({ setIsUserModalOpen, setLogin, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/renterlogin", {
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
      setLogin("user");
      navigate("/explore");
      setIsUserModalOpen(false);
    } else {
      setMsg("Login Fail");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <span>
        <p>NOT A MEMBER? Register for a free account</p>
        <Link to="/usersignup">Sign Up</Link>
      </span>
      <p>{msg}</p>
    </>
  );
};

export default UserLogin;
