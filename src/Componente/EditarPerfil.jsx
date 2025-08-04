import React, { useState } from 'react';
import '../Estilos/EditarPerfil.css';
import editarPerfil from '../Imagenes/editarPerfil.png';
import lapiz from '../Imagenes/lapiz.png';
import logo from '../Imagenes/LogoBlanco.svg';
import { useNavigate } from 'react-router-dom';

const EditarPerfil = () => {
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
    <div className="perfil-page-container">
      <div className="perfil-page-header">
        <div className="perfil-logo">
          <img src={logo} alt="AutoCheck Logo" />
          <span>AutoCheck</span>
        </div>
        <button className="volver-btn" onClick={() => navigate('/inicio')}>
          ⬅ Volver al Inicio
        </button>
      </div>

      <div className="perfil-page-main">
        <h1 className="page-title">👤 Editar Perfil</h1>
        
        <div className="perfil-content-page">
          <form className="perfil-form-page">
            {/* Sección Avatar */}
            <div className="avatar-section-page">
              <div className="avatar-container">
                <img src={imagenPerfil} alt="Avatar" className="avatar-page" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={manejarCambioImagen}
                  className="file-input"
                  id="archivo-imagen"
                />
                <label htmlFor="archivo-imagen" className="upload-btn-page">
                  📷
                </label>
              </div>
              <span className="avatar-text">Cambiar foto de perfil</span>
            </div>

            {/* Información Personal */}
            <div className="form-section-page">
              <h3 className="section-title">Información Personal</h3>
              <div className="form-grid-page">
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
              </div>
            </div>

            {/* Información de Contacto */}
            <div className="form-section-page">
              <h3 className="section-title">Información de Contacto</h3>
              <div className="form-grid-page">
                <div className="form-field half-width">
                  <label>
                    Correo electrónico <span className="cambiar">Cambiar</span>
                  </label>
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
                <div className="form-field half-width">
                  <label>Dirección</label>
                  <input type="text" placeholder="Dirección completa" />
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
              </div>
            </div>

            {/* Seguridad */}
            <div className="form-section-page">
              <h3 className="section-title">Seguridad</h3>
              <div className="form-grid-page">
                <div className="form-field half-width">
                  <label>
                    Contraseña <span className="cambiar">Cambiar</span>
                  </label>
                  <input type="password" placeholder="••••••••" />
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="form-buttons-page">
              <button type="button" className="cancelar-page" onClick={() => navigate('/inicio')}>
                Cancelar
              </button>
              <button type="submit" className="guardar-page">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;