import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ReservationPage = () => {
  const [listing, setListing] = useState(null);
  const location = useLocation();

  // Parse the id from the query parameter in the URL
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/reservation/retrieve/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setListing(result);
      } catch (error) {
        console.log({ msg: "error" });
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {listing && (
        <>
          <h1>Reservation</h1>
          <div className="card-container">
            <div className="card">
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${listing.image})`,
                }}
              />
              <div className="card-content">
                <h3 className="card-title">{listing.price}</h3>
                <h3 className="card-title">{listing.brand}</h3>
                <h4 className="card-subtitle">{listing.model}</h4>
                <div>Transmission: {listing.type}</div>
                <div>Fuel Type: {listing.fuel}</div>
                {listing.availability && (
                  <div>Availability: {listing.availability}</div>
                )}
                <div>location: {listing.location}</div>
              </div>
            </div>
          </div>
          <form>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <input type="date" id="startDate" name="startDate" required />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <input type="date" id="endDate" name="endDate" required />
            </div>
            <div>
              <button type="submit">Reserve</button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default ReservationPage;
