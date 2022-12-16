const CreateListing = () => {
  return (
    <>
      <h1>Create listing</h1>
      <label for="select">Brand & Model</label>
      <select id="select">
        <optgroup label="Honda">
          <option value="Honda_Civic">Civic</option>
          <option value="category-one__second-option">Accord</option>
        </optgroup>
        <optgroup label="Suzuki">
          <option value="category-two__first-option">Swift</option>
          <option value="category-two__second-option">Second option</option>
        </optgroup>
      </select>

      <select>
        <option value=""></option>
      </select>
    </>
  );
};

export default CreateListing;
