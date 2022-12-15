import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegisterAcc = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <h1>Register </h1>
      <label htmlFor="username">USERNAME: </label>
      <input type="text" id="username" />
      <label htmlFor="email">EMAIL ADDRESS: </label>
      <input type="text" id="email" />
      <label htmlFor="password">PASSWORD: </label>
      <input type="text" id="password" />
      Date of Birth:
      <DatePicker
        closeOnScroll={true}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <button>Continue</button>
    </>
  );
};

export default RegisterAcc;
