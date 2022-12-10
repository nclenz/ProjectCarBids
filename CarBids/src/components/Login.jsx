import { useState } from "react";

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

        <label>Password: </label>
        <input
          type="password"
          value={username}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    </>
  );
};

export default Login;
