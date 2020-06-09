import React from 'react';

const SearchForm = ({ handleSubmit, term, handleChange }) => {

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Search:
      <input type="text" placeholder='Please enter a search team' value={term} onChange={handleChange} />
    </label>
    <input type="submit" value="Submit" />
  </form>
  );

};

export default SearchForm;
