import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const MyReservation = () => {
  const [listings, setListings] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/reservation/retrieve/${id}`);
      const data = await response.json();
      console.log(data);
      setListings(data);
    };
    fetchData();
  }, []);

  console.log(listings);
  return (
    <>
      {listings}
      <div className="card-container">
        <div className="card">
          <div
            className="card-image"
            style={{
              backgroundImage: `url(${listings.image})`,
            }}
          />
          <div className="card-content">
            <h3 className="card-title">{listings.price}</h3>
            <h3 className="card-title">{listings.brand}</h3>
            <h4 className="card-subtitle">{listings.model}</h4>
            <div>Transmission: {listings.type}</div>
            <div>Fuel Type: {listings.fuel}</div>

            <div>Availability: {listings.availability}</div>

            <div>location: {listings.location}</div>
            {/* <div>Start Date: {listings.startdate}</div>
                 <div>End Date: {listings.enddate}</div> */}
          </div>
        </div>
      </div>
      /
    </>
  );
};

export default MyReservation;
