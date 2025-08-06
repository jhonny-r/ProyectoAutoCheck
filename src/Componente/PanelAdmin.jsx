import React from "react";
import '../Estilos/PanelAdmin.css';
import { useNavigate } from "react-router-dom";
import avatarAdmin from '../Imagenes/user1.png';

function PanelAdmin() {
  const navigate = useNavigate();

  return (
    <div className="panel-container">
      <div className="panel-box">
        <div className="admin-profile-section">
          <div className="admin-avatar-container">
            <img src={avatarAdmin} alt="Admin Avatar" className="admin-avatar" />
          </div>
          <h2 className="admin-welcome">Panel de Administración</h2>
          <p className="admin-subtitle">Gestión completa del sistema AutoCheck</p>
        </div>
        
        <div className="panel-actions">
          <button className="panel-button users-btn" onClick={() => navigate("/ListaUsuarios")}>
            <span className="btn-icon">👥</span>
            <span className="btn-text">Gestionar Usuarios</span>
          </button>
          
          <button className="panel-button zones-btn" onClick={() => navigate("/GestionZonas")}>
            <span className="btn-icon">🏘️</span>
            <span className="btn-text">Gestionar Barrios</span>
          </button>
          
          <button className="panel-button vehicles-btn" onClick={()=> navigate("/ListaVehiculos")}>
            <span className="btn-icon">🚗</span>
            <span className="btn-text">Gestionar Vehículos</span>
          </button>
          
          <button className="panel-button home-btn" onClick={() => navigate("/Inicio")}>
            <span className="btn-icon">🏠</span>
            <span className="btn-text">Ir a Inicio</span>
          </button>
          
          <button className="panel-button logout-btn" onClick={() => navigate("/")}>
            <span className="btn-icon">🚪</span>
            <span className="btn-text">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PanelAdmin;
