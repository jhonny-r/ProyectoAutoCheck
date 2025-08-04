import React, { useState } from 'react';
import '../Estilos/EditarPerfil.css';
import editarPerfil from '../Imagenes/editarPerfil.png';
import lapiz from '../Imagenes/lapiz.png';
import logo from '../Imagenes/LogoBlanco.svg';

const EditarPerfil = ({ onClose }) => {
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

  const manejarClickOverlay = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={manejarClickOverlay}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-logo">
            <img src={logo} alt="AutoCheck Logo" />
            <span>AutoCheck</span>
          </div>
        </div>

        <div className="perfil-card">
          <h1 className="perfil-title">👤 Editar Perfil</h1>
          
          <div className="perfil-content">
            <div className="avatar-section">
              <div className="avatar-container">
                <img src={imagenPerfil} alt="Avatar" className="avatar" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={manejarCambioImagen}
                  className="file-input"
                  id="archivo-imagen"
                />
                <label htmlFor="archivo-imagen" className="upload-btn">
                  📷
                </label>
              </div>
              <label><b>Nombre Completo</b></label>
              <div className="input-with-iconNombre">
                <input type="text" placeholder="Nombre completo" />
              </div>
            </div>

            <div className="perfil-form">
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Correo electrónico <span className="cambiar">Cambiar</span>
                  </label>
                  <div className="input-with-icon">
                    <input type="email" placeholder="correo@ejemplo.com" />
                    <img src={lapiz} alt="editar" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Alias</label>
                  <div className="input-with-icon">
                    <input type="text" placeholder="Alias" />
                    <img src={lapiz} alt="editar" />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono</label>
                  <div className="input-with-icon">
                    <input type="tel" placeholder="0999999999" />
                    <img src={lapiz} alt="editar" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Sector</label>
                  <select>
                    <option value="">Selecciona un sector</option>
                    <option value="norte">Norte</option>
                    <option value="centro">Centro</option>
                    <option value="sur">Sur</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Dirección</label>
                  <div className="input-with-icon">
                    <input type="text" placeholder="Dirección completa" />
                    <img src={lapiz} alt="editar" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Ciudad</label>
                  <select>
                    <option value="">Selecciona una ciudad</option>
                    <option value="quito">Quito</option>
                    <option value="guayaquil">Guayaquil</option>
                    <option value="cuenca">Cuenca</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha de Nacimiento</label>
                  <div className="input-with-icon">
                    <input type="date" />
                    <img src={lapiz} alt="editar" />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Contraseña <span className="cambiar">Cambiar</span>
                  </label>
                  <div className="input-with-icon">
                    <input type="password" placeholder="••••••••" />
                    <img src={lapiz} alt="editar" />
                  </div>
                </div>
              </div>

              <div className="form-buttons">
                <button className="guardar">Guardar Cambios</button>
                <button className="cancelar" onClick={onClose}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;