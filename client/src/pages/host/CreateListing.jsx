const CreateListings = () => {
  return (
    <>
      <label for="select">Choose your option</label>
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
    </>
  );
};

export default CreateListings;
