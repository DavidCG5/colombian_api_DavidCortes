import { useState } from "react";
import "../../styles/search.css";

// Función para normalizar el texto eliminando espacios y símbolos especiales
const normalizeText = (text) => {
  return text
    .replace(/[^\w\s]/g, "") // Elimina símbolos especiales
    .replace(/\s+/g, " ") // Reemplaza múltiples espacios con un solo espacio
    .trim() // Elimina espacios al principio y al final
    .toLowerCase(); // Convierte a minúsculas
};

function Search({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    const rawQuery = event.target.value;
    setQuery(rawQuery);

    // Normalizar el texto de búsqueda
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
