
import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Get the values from input.
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="main-search-form" onSubmit={handleFormSubmit}>
      <input
        className="searchInput"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search location..."
      />
      <button className="searchButton" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
