import { Link, useNavigate } from "react-router-dom";

const HostDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>HostDashboard</h1>
      <button onClick={() => navigate("/create")}>Add New Listing</button>

      <Link to="/">Back</Link>
    </>
  );
};

export default HostDashboard;
