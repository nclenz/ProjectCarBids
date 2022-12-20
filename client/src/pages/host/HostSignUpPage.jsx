import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HostSignUpPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let Response = await fetch("/api/host/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          password,
          email,
          // mobileNumber,
        }),
      });
      if (!Response.ok) {
        throw new Error("Network response was not OK");
      }
      setUsername("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setMobileNumber("");
      setDisplayMessage("User created successfully");
      navigate("/hostdashboard");
    } catch (error) {
      setDisplayMessage("something went wrong");
    }
  };
  return (
    <>
      <h1>REGISTER AS HOST</h1>
      <Link to="/">Back to Home</Link>
      <form onSubmit={handleSignUp}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <label>
          Mobile:
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
        <p>{displayMessage}</p>
      </form>
    </>
  );
};

export default HostSignUpPage;
