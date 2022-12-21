import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const HostDashboard = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/listing/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        // console.log(result);
        setListings(result);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/listing/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setListings(listings.filter((listing) => listing._id !== id));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <h1>HostDashboard</h1>
      <button onClick={() => navigate("/create")}>Add New Listing</button>
      {listings && (
        <div className="card-container">
          {listings.map((listing) => (
            <div key={listing._id} className="card">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${listing.image})`,
                }}
              />
              <div className="card-content">
                <h3 className="card-title">${listing.price}/day</h3>
                <h3 className="card-title">{listing.brand}</h3>
                <h4 className="card-subtitle">{listing.model}</h4>
                <div>Transmission: {listing.type}</div>
                <div>Fuel Type: {listing.fuel}</div>
                {listing.availability && (
                  <div>Availability: {listing.availability}</div>
                )}
                <div>location: {listing.location}</div>
              </div>
              <div className="card-buttons">
                <button
                  className="delete-button"
                  onClick={() => handleDelete(listing._id)}
                >
                  Delete
                </button>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/api/listing/edit/${listing._id}`)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/">Back</Link>
    </>
  );
};

export default HostDashboard;
