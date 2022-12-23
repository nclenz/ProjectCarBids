import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const [listing, setListing] = useState("");
  const [msg, setMsg] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [availability, setAvailability] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/listing/retrieve/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setBrand(result.brand);
        setModel(result.model);
        setType(result.type);
        setPrice(result.price);
        setTransmission(result.transmission);
        setFuel(result.fuel);
        setAvailability(result.availability);
        setImage(result.image);
        setLocation(result.location);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/listing/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brand,
        model,
        type,
        price,
        transmission,
        fuel,
        availability,
        image,
        location,
      }),
    });

    if (response.ok) {
      navigate("/hostdashboard");
    } else {
      setMsg("Login Fail");
    }
  };

  return (
    <>
      <form>
        <label>Brand:</label>
        <input
          type="text"
          disabled
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <br />

        <label>Model:</label>
        <input
          type="text"
          disabled
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <br />

        <label>Type:</label>
        <input
          type="text"
          disabled
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <br />

        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />

        <label>Transmission:</label>
        <input
          type="text"
          disabled
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
        />
        <br />

        <label>Fuel:</label>
        <input
          type="text"
          disabled
          value={fuel}
          onChange={(e) => setFuel(e.target.value)}
        />
        <br />

        <label>Availability:</label>
        <select
          id="availability"
          name="availability"
          onChange={(event) => setAvailability(event.target.value)}
          required
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <br />

        <label>Image:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br />

        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <button onClick={handleEdit}>Submit</button>
      </form>
    </>
  );
};

export default EditPage;
