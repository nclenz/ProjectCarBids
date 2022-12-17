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
        setListings(result);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchData();
  }, []);

  // async function fetchListings() {
  //   const response = await fetch("/all");
  //   const data = await response.json();
  //   console.log(data);
  //   setListings(data);
  // }
  // fetchListings().then(console.log(listings));

  return (
    <>
      <h1>HostDashboard</h1>
      <button onClick={() => navigate("/create")}>Add New Listing</button>
      <div>
        {listings &&
          listings.map((listing) => (
            <div key={listing._id}>
              Brand: {listing.brand}
              Model: {listing.model}
              Transmission: {listing.type}
              Fuel Type: {listing.fuel}
              {listing.availability && (
                <div>Availability: {listing.availability}</div>
              )}
              {listing.image && <div>image: {listing.image}</div>}
              location: {listing.location}
            </div>
          ))}
      </div>
      <Link to="/">Back</Link>
    </>
  );
};

export default HostDashboard;
