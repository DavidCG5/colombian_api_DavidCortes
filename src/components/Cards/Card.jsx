import "../../styles/card.css"; // Asegúrate de tener un archivo CSS para estilos opcionales

// Componente Card que recibe props
function Card({ title, total, icon, totalText }) {
  return (
    <div className="card">
      <div>
        <h3 className="card-title">{title}</h3>
        <p className="card-total">
          {totalText} {total}
        </p>
      </div>
      {icon && (
        <div className="card-icon">
          {typeof icon === "string" ? <img src={icon} alt={title} /> : icon}
        </div>
      )}
    </div>
  );
}

export default Card;
