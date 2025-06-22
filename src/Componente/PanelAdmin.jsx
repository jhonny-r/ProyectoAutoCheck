import React from "react";
import '../Estilos/PanelAdmin.css';
import { useNavigate } from "react-router-dom";

function PanelAdmin() {
  const navigate = useNavigate();

  return (
    <div className="panel-container">
      <div className="panel-box">
        <div className="panel-header">PANEL DE ADMINISTRACIÓN</div>
        <button className="panel-button" onClick={() => navigate("/ListaUsuarios")}>Gestionar Usuarios</button>
        <button className="panel-button" onClick={() => navigate("/reportes")}>Ver Reportes</button>
        <button className="panel-button" onClick={() => navigate("/")}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default PanelAdmin;
