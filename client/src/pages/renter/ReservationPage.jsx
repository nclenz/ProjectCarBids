import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

import "react-datepicker/dist/react-datepicker.css";

const ReservationPage = () => {
  const [listings, setListings] = useState("");
  const [startdate, setStartDate] = useState([]);
  const [enddate, setEndDate] = useState([]);
  const [msg, setMsg] = useState("");
  const { username, setUsername } = useContext(UserContext);
  let { id } = useParams();

  useEffect(() => {
    console.log("username", username);
    const fetchData = async () => {
      const response = await fetch("/api/listing/all");
      const data = await response.json();
      const selectedListing = data.find(function (element) {
        return element._id === id;
      });
      setListings(selectedListing);
    };
    fetchData();
  }, [id]);
  console.log(listings);
  const listing = listings._id;

  const handleReserve = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/reservation/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, startdate, enddate, listing }),
    });

    try {
      if (!response.ok) {
        const promise = response.json();
        promise.then(function (result) {
          // setMsg(result.msg);
        });
      } else {
        const result = await response.json();
        console.log(result);
      }
    } catch (error) {
      setMsg(error);
    }
  };

  return (
    <>
      {listings && (
        <>
          <h1>Reservation</h1>
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
              </div>
            </div>
          </div>
          <form>
            <div>
              <label htmlFor="startdate">Start Date:</label>
              <input
                type="date"
                id="startdate"
                name="startdate"
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="enddate">End Date:</label>
              <input
                type="date"
                id="enddate"
                name="enddate"
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>

            <div>
              <button onClick={handleReserve} type="submit">
                Reserve
              </button>
            </div>
          </form>
          <p> {msg}</p>
        </>
      )}
    </>
  );
};

export default ReservationPage;
