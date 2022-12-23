import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserSignUpPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState([]);
  const [creditCard, setCreditCard] = useState("");
  const [cvc, setCvc] = useState("");
  const navigate = useNavigate();

  const handleCreateListing = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("/api/rent/signup", {
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
          mobile,
        }),
      });

      if (!response.ok) {
        const promise = response.json();
        promise.then(function (result) {
          console.log(result.errors);
          setMessage(result.errors);
        });
      }

      if (response.ok) {
        setUsername("");
        setName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setMobile("");
        setCreditCard("");
        setCvc("");
        setMessage("User created successfully");
        navigate("/explore");
      }
    } catch (error) {
      setMessage("Catches Error");
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
          <br />
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="email">
            Mobile:
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="crediCard">
            Credit Card Numbers:
            <input
              type="text"
              id="crediCard"
              value={creditCard}
              onChange={(e) => setCreditCard(e.target.value)}
            />
          </label>
          <br />

          <label htmlFor="cvc">
            CVC:
            <input
              type="text"
              id="cvc"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Sign Up</button>
        </form>

        {message.length > 0
          ? message.map((error) => (
              <p key={error.param}>
                {error.param}-{error.msg}
              </p>
            ))
          : null}
      </div>
    </>
  );
};

export default UserSignUpPage;
