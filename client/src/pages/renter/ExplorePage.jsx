import { useState, useEffect, useRef, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ListingIDContext = createContext();

const ExplorePage = () => {
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const [listingID, setListingID] = useState("");

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
        console.log({ msg: "error" });
      }
    };
    fetchData();
  }, []);

  return (
    <ListingIDContext.Provider value={{ listingID, setListingID }}>
      <>
        <h1>Explore</h1>
        {listings && (
          <div className="card-container">
            {listings.map((listing) => {
              const handleClick = () => {
                const listingID = listing._id;
                console.log(listingID);
                setListingID(listingID);
                navigate(`/api/reservation/reserve/${listingID}`);
              };

              return (
                <div key={listing._id} className="card">
                  <div
                    className="card-image"
                    style={{
                      backgroundImage: `url(${listing.image})`,
                    }}
                  />
                  <div className="card-content">
                    <div className="cardHeader">
                      <h3 className="card-title" ref={priceRef}>
                        {listing.brand}
                      </h3>
                      <h3 className="card-title" ref={titleRef}>
                        ${listing.price}/day
                      </h3>
                    </div>
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
    </ListingIDContext.Provider>
  );
};

export default ExplorePage;
