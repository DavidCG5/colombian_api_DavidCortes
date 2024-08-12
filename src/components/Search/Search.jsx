import { useState } from "react";
import "../../styles/search.css";

const normalizeText = (text) => {
  return text
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

function Search({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const rawQuery = event.target.value;
    setQuery(rawQuery);

    const normalizedQuery = normalizeText(rawQuery);
    onSearch(normalizedQuery);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Search;
