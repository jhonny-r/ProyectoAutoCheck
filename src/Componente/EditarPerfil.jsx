import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/EditarPerfil.css';
import editarPerfil from '../Imagenes/editarPerfil.png';
import lapiz from '../Imagenes/lapiz.png';
const EditarPerfil = () => {
  const navigate = useNavigate();

  return (
    <div className="perfil-container">
      <button className="volver-btn" onClick={() => navigate('/')}>Volver al Inicio</button>

      <h1 className="perfil-title">Editar Perfil</h1>

      <div className="perfil-card">
        <div className="avatar-section">
          <img src={editarPerfil} alt="Avatar" className="avatar" />
          <p></p>
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

          <div className="form-buttons">
            <button className="guardar">Guardar Cambios</button>
            <button className="cancelar" onClick={() => navigate('/')}>Cancelar</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>AutoCheck</span>
        <span>&nbsp;|&nbsp;</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>

    </div>
  );
};

export default EditarPerfil;