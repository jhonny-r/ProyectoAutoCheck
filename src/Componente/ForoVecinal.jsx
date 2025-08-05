import React, { useState } from 'react';
import '../Estilos/Foro.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Imagenes/logo-autocheck.png';
import user1 from '../Imagenes/user1.png';
import user2 from '../Imagenes/user2.png';
import user3 from '../Imagenes/user3.png';
import userAnonimo from '../Imagenes/userAnonimo.png';
import moto from '../Imagenes/moto.png';

function ForoVecinal() {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoNombre, setTipoNombre] = useState("nombre"); // "nombre" o "alias"
  const [tipoIncidente, setTipoIncidente] = useState(""); // Para el tipo de incidente seleccionado
  const [zonaSeleccionada, setZonaSeleccionada] = useState("La Floresta"); // Para la zona seleccionada
  
  // Simular datos del usuario (en una app real, esto vendría del contexto/estado global)
  const usuario = {
    nombre: "Juan Pérez",
    alias: "Anónimo"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos al servidor
    setMostrarModal(false);
  };

  return (
    <div className="foro-container">
      {/* CONTENEDOR CON TITULO Y CONTROLES */}
      <div className="foro-header-row">
        <div className="contenido-col">
          <h1 className="foro-titulo">FORO VECINAL</h1>
          <p className="foro-subtitulo">Comparte y Mantente al tanto de lo que sucede en tu zona</p>
          <div className="foro-controles">
            <select 
              className="zona-select"
              value={zonaSeleccionada}
              onChange={(e) => setZonaSeleccionada(e.target.value)}
            >
              <option value="La Floresta">La Floresta</option>
              <option value="El Batán">El Batán</option>
              <option value="El Recreo">El Recreo</option>
            </select>
            <select 
              className="tipo-select"
              value={tipoIncidente}
              onChange={(e) => setTipoIncidente(e.target.value)}
            >
              <option value="" disabled>Tipo de incidente</option>
              <option value="Robo">Robo</option>
              <option value="Riña">Riña</option>
              <option value="Vandalismo">Vandalismo</option>
              <option value="Vehículo sospechoso">Vehículo sospechoso</option>
              <option value="Moto sospechosa">Moto sospechosa</option>
              <option value="Otros">Otros</option>
            </select>
            <button className="publicar-btn" onClick={() => setMostrarModal(true)}>➕ Nueva Publicación</button>
          </div>
        </div>

        {/* BOTÓN MOVIDO ABAJO A LA DERECHA */}
        <div className="btn-volver-container">
          <button className="volver-btn" onClick={() => navigate('/Inicio')}>⬅ Volver al Inicio</button>
        </div>
      </div>

      {/* PUBLICACIONES */}
      <div className="publicaciones-container">
        {/* Publicación 1 */}
        <div className="pub-card">
          <div className="pub-header">
            <img src={userAnonimo} alt="Anónimo" className="pub-avatar" />
            <div className="pub-info">
              <h4 className="pub-autor">Anónimo</h4>
              <p className="pub-meta">27 de abr. 11:30 • El Recreo</p>
            </div>
          </div>
          <div className="pub-content">
            <p className="pub-texto">Encontré esta moto abandonada en la esquina. Está bien deteriorada. He notificado a las autoridades correspondientes para que se hagan cargo de la situación. Es importante mantenerse alerta ante este tipo de situaciones en nuestro barrio.</p>
          </div>
        </div>

        {/* Publicación 2 */}
        <div className="pub-card">
          <div className="pub-header">
            <img src={user2} alt="María" className="pub-avatar" />
            <div className="pub-info">
              <h4 className="pub-autor">María</h4>
              <p className="pub-meta">26 de abr. 17:30 • El Batán</p>
            </div>
          </div>
          <div className="pub-content">
            <p className="pub-texto">Les recomiendo a todos asegurar bien sus bicis si las dejan afuera. He visto varios intentos de robo en la zona últimamente. Es importante tomar precauciones adicionales, especialmente durante la noche.</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>

      {/* MODAL NUEVA PUBLICACIÓN */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="foro-form" onSubmit={handleSubmit}>
              <div className="foro-header">NUEVA PUBLICACIÓN</div>

              <div className="nombre-container">
                <input 
                  type="text" 
                  value={tipoNombre === "nombre" ? usuario.nombre : usuario.alias}
                  readOnly
                  className="nombre-input"
                />
                <select 
                  value={tipoNombre} 
                  onChange={(e) => setTipoNombre(e.target.value)}
                  className="tipo-nombre-select"
                >
                  <option value="nombre">Mostrar nombre</option>
                  <option value="alias">Mostrar como anónimo</option>
                </select>
              </div>

              <input 
                type="text" 
                placeholder="Barrio o sector" 
                className="barrio-input"
                value={zonaSeleccionada}
                onChange={(e) => setZonaSeleccionada(e.target.value)}
              />

              {tipoIncidente ? (
                <input 
                  type="text" 
                  value={tipoIncidente}
                  readOnly
                  className="tipo-incidente-input"
                  placeholder="Tipo de incidente"
                />
              ) : (
                <select 
                  className="tipo-incidente-select"
                  value={tipoIncidente}
                  onChange={(e) => setTipoIncidente(e.target.value)}
                >
                  <option value="" disabled>Tipo de incidente</option>
                  <option value="Robo">Robo</option>
                  <option value="Riña">Riña</option>
                  <option value="Vandalismo">Vandalismo</option>
                  <option value="Vehículo sospechoso">Vehículo sospechoso</option>
                  <option value="Moto sospechosa">Moto sospechosa</option>
                  <option value="Otros">Otros</option>
                </select>
              )}

              <textarea
                placeholder="Escribe aquí tu mensaje o alerta para los vecinos..."
                rows="6"
                className="mensaje-textarea"
              ></textarea>

              <div className="modal-buttons">
                <button type="submit" className="btn-publicar">PUBLICAR</button>
                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>CANCELAR</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForoVecinal;
