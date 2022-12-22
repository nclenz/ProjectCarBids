import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const max = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listing/latest/${max}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setListings(result);
      } catch (error) {
        console.log({ msg: "error" });
      }
    };
    fetchData();
  }, []);
  console.log(listings);

  return (
    <>
      <Navbar />
      <h2>Newly Listed Cars</h2>
      <div className="image-grid">
        {listings.map((listing) => (
          <div className="newCard" key={listing._id}>
            <img className="image" src={listing.image} alt={listing.model} />

            <div className="cardHeader">
              <h3 className="card-title"> {listing.brand}</h3>
              <h3 className="card-title">${listing.price}/day</h3>
            </div>
            <div className="card-bottom">
              <h3 className="card-subtitle">Model: {listing.model}</h3>
              <h3>Transmission: {listing.transmission}</h3>
              <h3>Pick Up Location: {listing.location}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
