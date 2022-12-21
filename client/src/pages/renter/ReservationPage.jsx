import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ReservationPage = () => {
  const [listing, setListing] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/listing/all");
      const data = await response.json();
      const selectedListing = data.find(function (element) {
        return element._id === id;
      });
      console.log(selectedListing);
      setListing(selectedListing);
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

                <div>Availability: {listing.availability}</div>

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
