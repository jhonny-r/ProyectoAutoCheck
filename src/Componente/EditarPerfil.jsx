import React, { useState } from 'react';
import '../Estilos/EditarPerfil.css';
import editarPerfil from '../Imagenes/editarPerfil.png';
import lapiz from '../Imagenes/lapiz.png';
import logo from '../Imagenes/LogoBlanco.svg';

const EditarPerfil = ({ onClose }) => {
  const [imagenPerfil, setImagenPerfil] = useState(editarPerfil);
  const [mostrarCambiarPassword, setMostrarCambiarPassword] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

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

  const manejarGuardarPerfil = (e) => {
    e.preventDefault();
    setMensajeExito('✅ Perfil actualizado correctamente');
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeExito('');
    }, 3000);
  };

  const manejarGuardarPassword = () => {
    setMensajeExito('✅ Contraseña actualizada correctamente');
    setMostrarCambiarPassword(false);
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
      setMensajeExito('');
    }, 3000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="perfil-modal" onClick={(e) => e.stopPropagation()}>
        <form className="perfil-form-modal" onSubmit={manejarGuardarPerfil}>
          <div className="modal-header">
            <h2>👤 Editar Perfil</h2>
            <button type="button" className="cerrar-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          {/* Mensaje de éxito */}
          {mensajeExito && (
            <div className="mensaje-exito">
              {mensajeExito}
            </div>
          )}

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

          {/* Grid compacto para información */}
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
              <label>Fecha de Nacimiento</label>
              <input type="date" />
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
              <label>Ciudad</label>
              <select>
                <option value="">Selecciona una ciudad</option>
                <option value="quito">Quito</option>
                <option value="guayaquil">Guayaquil</option>
                <option value="cuenca">Cuenca</option>
              </select>
            </div>
            <div className="form-field">
              <label>Sector</label>
              <select>
                <option value="">Selecciona un sector</option>
                <option value="norte">Norte</option>
                <option value="centro">Centro</option>
                <option value="sur">Sur</option>
              </select>
            </div>
            <div className="form-field">
              <label>
                Contraseña 
                <span className="cambiar-link" onClick={() => setMostrarCambiarPassword(!mostrarCambiarPassword)}>
                  Cambiar
                </span>
              </label>
              <input type="password" placeholder="••••••••" readOnly />
            </div>
          </div>

          {/* Sección cambiar contraseña */}
          {mostrarCambiarPassword && (
            <div className="password-change-section">
              <div className="form-field">
                <label>Nueva Contraseña</label>
                <input type="password" placeholder="Nueva contraseña" />
              </div>
              <div className="form-field">
                <label>Confirmar Contraseña</label>
                <input type="password" placeholder="Confirmar contraseña" />
              </div>
              <div className="password-change-actions">
                <button type="button" className="btn-guardar-password" onClick={manejarGuardarPassword}>
                  Guardar
                </button>
                <button type="button" className="btn-cancelar-password" onClick={() => setMostrarCambiarPassword(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Botones del modal */}
          <div className="modal-buttons">
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;