import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };
  console.log(username);
  console.log(password);

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
          value={username}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <span>
        <p>NOT A MEMBER? Register for a free account</p>
        <Link to="/signup">Sign Up</Link>
      </span>
    </>
  );
};

export default Login;
