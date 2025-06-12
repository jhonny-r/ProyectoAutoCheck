import React from "react";
import "../Estilos/NuevaEntradaForo.css";

function NuevaEntradaForo() {
  return (
    <div className="foro-container">
      <form className="foro-form">
        <div className="foro-header">NUEVA PUBLICACIÓN</div>

        <input type="text" placeholder="Nombre o Anónimo" />
        <input type="text" placeholder="Barrio o sector" />

        <textarea
          placeholder="Escribe aquí tu mensaje o alerta para los vecinos..."
          rows="6"
        ></textarea>

        <button type="submit" className="btn-publicar">PUBLICAR</button>
        <button type="button" className="btn-cancelar">CANCELAR</button>
      </form>
    </div>
  );
}

export default NuevaEntradaForo;
