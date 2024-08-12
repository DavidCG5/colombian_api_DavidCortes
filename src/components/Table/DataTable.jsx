import { useState } from "react";
import "../../styles/datatable.css"; // Asegúrate de importar el CSS

function DataTable({ headers, data, rowsPerPage = 6 }) {
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Calcular el índice inicial y final para la página actual
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Función para manejar el cambio de página
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <button
          className="arrow-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          &laquo;
        </button>
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => handlePageChange(pageIndex)}
            className={currentPage === pageIndex ? "active-page" : ""}
          >
            {pageIndex + 1}
          </button>
        ))}
        <button
          className="arrow-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}

export default DataTable;
