import { Link, useNavigate } from "react-router-dom";

const ManageListing = () => {
  // const navigate = useNavigate();
  const handleCreate = () => {
    console.log("Click");
  };

  return (
    <>
      <h1>Your Listings </h1>
      <button onClick={handleCreate}>Add New Listing</button>
    </>
  );
};

export default ManageListing;
