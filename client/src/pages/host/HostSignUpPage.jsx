import { Link } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HostSignUpPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  const handleCreateListing = () => {};

  return (
    <>
      <Link to="/">Back to Home</Link>
      <h1>Register as Host </h1>
      <label htmlFor="username">USERNAME: </label>
      <input type="text" id="username" />
      <br />
      <label htmlFor="password">PASSWORD: </label>
      <input type="text" id="password" />
      <br />
      <label htmlFor="email">EMAIL ADDRESS: </label>
      <input type="text" id="email" />
      <br />
      Date of Birth:
      <DatePicker
        closeOnScroll={true}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <button onClick={handleCreateListing}>Continue</button>
    </>
  );
};

export default HostSignUpPage;
