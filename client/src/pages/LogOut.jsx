import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Successfully Logged Out</h2>
      <button onClick={() => navigate("/")}>Back to Homepage</button>
    </>
  );
};

export default LogOut;
