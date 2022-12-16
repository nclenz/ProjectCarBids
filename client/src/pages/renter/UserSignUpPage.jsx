import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserSignUpPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [cvc, setCvc] = useState("");
  const navigate = useNavigate();

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      let Response = await fetch("/api/rent/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          name,
          password,
          email,
          creditCard,
          cvc,
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
      setCreditCard("");
      setCvc("");
      setMessage("User created successfully");
      navigate("/explore");
    } catch (error) {
      setMessage("something went wrong");
    }
  };
  return (
    <>
      <h1>REGISTER AS RENTER</h1>
      <Link to="/">Back to Home</Link>
      <div className="user-form-body">
        <form onSubmit={handleCreateListing}>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              type="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <label htmlFor="crediCard">
            Credit Card Numbers:
            <input
              type="creditcard"
              id="crediCard"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
            />
          </label>

          <label htmlFor="cvc">
            CVC:
            <input
              type="cvc"
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p>Date of Birth: </p>
        <DatePicker
          closeOnScroll={true}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </div>
    </>
  );
};

export default UserSignUpPage;
