import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const MyReservation = () => {
  const [listings, setListings] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/reservation/retrieve/${id}`);
      const data = await response.json();
      console.log("data", data);
      setListings(data);
    };
    fetchData();
  }, []);

  console.log("listing", listings);
  return (
    <>
      {/* {listings} */}

      {/* <div
            className="card-image"
            style={{
              backgroundImage: `url(${listings.image})`,
            }}
          /> */}

      <h3>{JSON.stringify(listings.startdate)}</h3>
      <h3>{listings.brand}</h3>
      <h4>{listings.model}</h4>
      <div>Transmission: {listings.startdate}</div>
      <div>Fuel Type: {listings.fuel}</div>

      <div>Availability: {listings.availability}</div>

      <div>location: {listings.location}</div>
      <div>Start Date: {listings.startdate}</div>
      <div>End Date: {listings.enddate}</div>
    </>
  );
};

export default MyReservation;
