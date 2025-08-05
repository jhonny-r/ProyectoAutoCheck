import React, { useState } from 'react';
import '../Estilos/EditarPerfil.css';
import editarPerfil from '../Imagenes/editarPerfil.png';
import lapiz from '../Imagenes/lapiz.png';
import logo from '../Imagenes/LogoBlanco.svg';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = ({ onClose }) => {
  const navigate = useNavigate();
  const [imagenPerfil, setImagenPerfil] = useState(editarPerfil);

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenPerfil(e.target.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content perfil-modal" onClick={(e) => e.stopPropagation()}>
        <form className="perfil-form-modal">
          <div className="modal-header">
            <h2>👤 Editar Perfil</h2>
            <button type="button" className="cerrar-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Sección Avatar */}
          <div className="avatar-section-modal">
            <div className="avatar-container">
              <img src={imagenPerfil} alt="Avatar" className="avatar-modal" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={manejarCambioImagen}
                className="file-input"
                id="archivo-imagen"
              />
              <label htmlFor="archivo-imagen" className="upload-btn-modal">
                📷
              </label>
            </div>
          </div>

          {/* Campos Compactos */}
          <div className="form-grid-compact">
            <div className="form-field">
              <label>Nombre Completo</label>
              <input type="text" placeholder="Nombre completo" />
            </div>
            <div className="form-field">
              <label>Alias</label>
              <input type="text" placeholder="Alias" />
            </div>
            <div className="form-field">
              <label>Teléfono</label>
              <input type="tel" placeholder="0999999999" />
            </div>
            <div className="form-field">
              <label>Correo electrónico</label>
              <input type="email" placeholder="correo@ejemplo.com" />
            </div>
            <div className="form-field">
              <label>Dirección</label>
              <input type="text" placeholder="Dirección completa" />
            </div>
            <div className="form-field">
              <label>Contraseña</label>
              <input type="password" placeholder="••••••••" />
            </div>
          </div>

          {/* Botones */}
          <div className="modal-buttons">
            <button type="submit" className="btn-guardar">GUARDAR</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>CANCELAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;