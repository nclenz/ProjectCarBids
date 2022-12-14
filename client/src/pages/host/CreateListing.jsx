import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import brands from "../../brands/brands.json";
import Navbar from "../../components/Navbar/Navbar";
import { OwnerContext } from "../../App";
// import { Formik, Form } from "formik";

const CreateListing = () => {
  const { owner, setOwner } = useContext(OwnerContext);

  const [msg, setMsg] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    // const info = {
    //   brand,
    //   model,
    //   type,
    //   price,
    //   transmission,
    //   fuel,
    //   availability,
    //   location,
    //   ownerID,
    // };

    try {
      const formData = new FormData(e.target);
      formData.append("owner", owner);
      console.log(formData.get("image"));
      console.log(formData.get("owner"));
      const response = await fetch("api/listing/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        console.log(response.json());
      }
      const data = await response.json();
      console.log(data);
      navigate("/hostdashboard");
    } catch (error) {
      console.log(error);
      setMsg("something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <form className="car-form" onSubmit={handleCreate} id="formElem">
        <label htmlFor="brand" className="car-form__label">
          Brand:
        </label>
        <select
          id="brand"
          name="brand"
          onChange={(event) => setBrand(event.target.value)}
          required
        >
          <option value="">Select type</option>
          {brands.map((brand) => {
            return (
              <option key={brand} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="model" className="car-form__label">
          Model:
        </label>
        <br />
        <input
          type="text"
          id="model"
          name="model"
          onChange={(event) => setModel(event.target.value)}
          required
        />
        <br />
        <label htmlFor="image" className="car-form__label">
          Upload an image:
        </label>
        <input type="file" className="form-control-file" name="image" />
        <br />
        <label htmlFor="type" className="car-form__label">
          Type:
        </label>
        <br />
        <select
          id="type"
          name="type"
          onChange={(event) => setType(event.target.value)}
          required
        >
          <option value="">Select type</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Sports">Sports</option>
          <option value="SUV">SUV</option>
          <option value="MPV">MPV</option>
        </select>
        <br />
        <label htmlFor="price" className="car-form__label">
          Price:
        </label>
        <br />
        <input
          type="number"
          id="price"
          name="price"
          onChange={(event) => setPrice(event.target.value)}
          required
        />
        <br />
        <label htmlFor="transmission" className="car-form__label">
          Transmission:
        </label>
        <br />
        <select
          id="transmission"
          name="transmission"
          onChange={(event) => setTransmission(event.target.value)}
          required
        >
          <option value="">Select type</option>
          <option value="Manual">Manual</option>
          <option value="Auto">Auto</option>
        </select>
        <br />
        <label htmlFor="fuel" className="car-form__label">
          Fuel:
        </label>
        <br />
        <select
          id="fuel"
          name="fuel"
          onChange={(event) => setFuel(event.target.value)}
          required
        >
          <option value="">Select type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
        <br />
        <label htmlFor="availability" className="car-form__label">
          Availability:
        </label>
        <br />
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
        <label htmlFor="location" className="car-form__label">
          Location:
        </label>
        <br />
        <input
          type="text"
          id="location"
          name="location"
          onChange={(event) => setLocation(event.target.value)}
          required
        />
        <br />
        <input type="submit" value="Create" />
      </form>

      <p>{msg}</p>
    </>
  );
};

export default CreateListing;
