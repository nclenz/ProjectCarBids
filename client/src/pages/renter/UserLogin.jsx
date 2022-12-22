import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

const UserLogin = ({ setIsUserModalOpen, setLogin, login }) => {
  const { username, setUsername } = useContext(UserContext);
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

    try {
      if (!response.ok) {
        const promise = response.json();
        promise.then(function (result) {
          setMsg(result.msg);
        });
      } else {
        const result = await response.json();
        console.log(result);
        setUsername(result);
        setLogin("user");
        navigate("/explore");
        setIsUserModalOpen(false);
      }
    } catch (error) {
      console.log("catch error");
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
        <Link to="/usersignup" onClick={() => setIsUserModalOpen(false)}>
          Sign Up
        </Link>
      </span>
      <p>msg {msg}</p>
    </>
  );
};

export default UserLogin;
