import brands from "../../brands/brands.json";

const CreateListing = () => {
  return (
    <>
      <form className="car-form">
        <label htmlFor="brand" className="car-form__label">
          Brand:
        </label>
        <select id="brand" name="brand" required>
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
        <input type="text" id="model" name="model" required />
        <br />
        <label htmlFor="type" className="car-form__label">
          Type:
        </label>
        <br />
        <select id="type" name="type" required>
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
        <input type="number" id="price" name="price" required />
        <br />
        <label htmlFor="transmission" className="car-form__label">
          Transmission:
        </label>
        <br />
        <select id="transmission" name="transmission" required>
          <option value="Manual">Manual</option>
          <option value="Auto">Auto</option>
        </select>
        <br />
        <label htmlFor="fuel" className="car-form__label">
          Fuel:
        </label>
        <br />
        <select id="fuel" name="fuel" required>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
        <br />
        <label htmlFor="availability" className="car-form__label">
          Availability:
        </label>
        <br />
        <input
          type="checkbox"
          id="availability"
          name="availability"
          value="true"
          required
        />
        <br />
        <label htmlFor="image" className="car-form__label">
          Image:
        </label>
        <br />
        <input type="text" id="image" name="image" required />
        <br />
        <label htmlFor="location" className="car-form__label">
          Location:
        </label>
        <br />
        <input type="text" id="location" name="location" required />
        <br />
        <input type="submit" value="Create" />
      </form>
    </>
  );
};

export default CreateListing;
