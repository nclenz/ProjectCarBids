import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const ExplorePage = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const priceRef = useRef(null);

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

  const handleClick = () => {
    navigate("/reservation/retrieve/");
  };

  return (
    <>
      <h1>Explore</h1>
      {listings && (
        <div className="card-container">
          {listings.map((listing) => {
            // const handleClick = () => {
            //   const id = listing._id;
            //   navigate(`/reservation${_id}`);
            // };

            return (
              <div key={listing._id} className="card">
                <div
                  className="card-image"
                  style={{
                    backgroundImage: `url(${listing.image})`,
                  }}
                />
                <div className="card-content">
                  <h3 className="card-title" ref={titleRef}>
                    {listing.price}
                  </h3>
                  <h3 className="card-title" ref={priceRef}>
                    {listing.brand}
                  </h3>
                  <h4 className="card-subtitle">{listing.model}</h4>
                  <div>Transmission: {listing.type}</div>
                  <div>Fuel Type: {listing.fuel}</div>
                  {listing.availability && (
                    <div>Availability: {listing.availability}</div>
                  )}
                  <div>location: {listing.location}</div>
                </div>
                <div className="card-buttons">
                  <button className="booking-button" onClick={handleClick}>
                    Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Link to="/">Back</Link>
    </>
  );
};

export default ExplorePage;
