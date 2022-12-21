import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  return (
    <>
      <p>Successfully Logged Out</p>
      <button onClick={() => navigate("/")}>Back to Homepage</button>
    </>
  );
};

export default LogOut;
