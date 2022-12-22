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

  console.log("listings", listings);

  {
    return (
      listings && (
        <div className="card-container">
          {listings.map((card) => (
            <div key={card._id} className="card">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${card.listing.image})`,
                }}
              />
              <div className="card-content">
                <h3 className="card-title">${card.listing.price}/day</h3>
                <h3 className="card-title">{card.listing.brand}</h3>
                <h4 className="card-subtitle">{card.listing.model}</h4>
                <div>Transmission: {card.listing.type}</div>
                <div>Fuel Type: {card.listing.fuel}</div>
                {card.listing.availability && (
                  <div>Availability: {card.listing.availability}</div>
                )}
                <div>location: {card.location}</div>
                <div>Start Date: {card.startdate}</div>
                <div>End Date: {card.enddate}</div>
              </div>
            </div>
          ))}
        </div>
      )
    );
  }
};

export default MyReservation;
