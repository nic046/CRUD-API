import "../styles/Confirm.css";

export default function Confirm( {user} ) {
  return (
    <div className="confirm-container">
      <h2 className="confirm-title">Confirmación</h2>
      <h3 className="confirm-subtitle">¿Está seguro que desea borrar el archivo?</h3>
      <div className="confirm-buttons">
        <button className="confirm-btn confirm-btn--delete">Borrar</button>
        <button className="confirm-btn confirm-btn--close">Cerrar</button>
      </div>
    </div>
  );
}
