import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

const ReservationPage = () => {
  const [listing, setListing] = useState("");
  const [startdate, setStartDate] = useState([]);
  const [enddate, setEndDate] = useState([]);
  const [msg, setMsg] = useState("");
  const { username, setUsername } = useContext(UserContext);
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

  const handleReserve = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/reservation/reserve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, startdate, enddate }),
    });

    if (response.ok) {
      try {
        const result = await response.json();
        setUsername(result);
        // navigate("/hostdashboard");
      } catch (error) {
        console.log({ msg: "catches error" });
      }
    } else {
      setMsg("Login Fail");
    }
  };

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
              <input
                type="date"
                id="startDate"
                name="startDate"
                onChange={() => setStartDate}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                onChange={() => setEndDate}
                required
              />
            </div>
            <div>
              <button onClick={handleReserve} type="submit">
                Reserve
              </button>
            </div>
          </form>
          <p>msg {msg}</p>
          <p>username {username}</p>
        </>
      )}
    </>
  );
};

export default ReservationPage;
