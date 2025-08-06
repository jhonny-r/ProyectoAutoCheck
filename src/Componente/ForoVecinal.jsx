import React, { useState } from 'react';
import '../Estilos/Foro.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Imagenes/logo-autocheck.png';
import user1 from '../Imagenes/user1.png';
import user2 from '../Imagenes/user2.png';
import user3 from '../Imagenes/user3.png';
import userAnonimo from '../Imagenes/userAnonimo.png';
import moto from '../Imagenes/moto.png';

function ForoVecinal({ barrios, tipoIncidente, usuario, publicaciones, agregarPublicacion }) {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoNombre, setTipoNombre] = useState("nombre"); // "nombre" o "anonimo"
  const [tipoIncidenteSeleccionado, setTipoIncidenteSeleccionado] = useState(""); // Para el tipo de incidente seleccionado
  const [zonaSeleccionada, setZonaSeleccionada] = useState(""); // Para la zona seleccionada
  const [mensaje, setMensaje] = useState(""); // Para el textarea del mensaje
  const [enviandoPublicacion, setEnviandoPublicacion] = useState(false); // Para mostrar estado de carga
  
  console.log("Barrios recibidos en ForoVecinal:", barrios);
  console.log("Tipos de incidente recibidos en ForoVecinal:", tipoIncidente);
  console.log("Usuario activo recibido en ForoVecinal:", usuario);
  console.log("Publicaciones recibidas en ForoVecinal:", publicaciones);
  
  // Obtener nombre del usuario activo - solo nombre si apellido no existe
  const nombreUsuario = usuario 
    ? (usuario.apellido ? `${usuario.nombre} ${usuario.apellido}` : usuario.nombre)
    : "Usuario";

  // Determinar qué mostrar según la selección
  const nombreAMostrar = tipoNombre === "nombre" ? nombreUsuario : "Anónimo";

  // Filtrar publicaciones por barrio seleccionado
  const publicacionesFiltradas = publicaciones && publicaciones.length > 0 
    ? (zonaSeleccionada 
        ? publicaciones.filter(pub => pub.barrio === zonaSeleccionada)
        : publicaciones)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén llenos
    if (!nombreAMostrar || !zonaSeleccionada || !tipoIncidenteSeleccionado || !mensaje.trim()) {
      alert("Por favor completa todos los campos antes de publicar.");
      return;
    }

    const nuevaPublicacion = {
      nombre: nombreAMostrar,
      barrio: zonaSeleccionada,
      tipoIncidente: tipoIncidenteSeleccionado,
      descripcion: mensaje.trim()
    };

    setEnviandoPublicacion(true);
    
    try {
      await agregarPublicacion(nuevaPublicacion);
      
      // Limpiar el formulario
      setZonaSeleccionada("");
      setTipoIncidenteSeleccionado("");
      setMensaje("");
      setTipoNombre("nombre");
      
      // Cerrar el modal
      setMostrarModal(false);
      
      alert("¡Publicación creada exitosamente!");
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      alert("Error al crear la publicación. Inténtalo de nuevo.");
    } finally {
      setEnviandoPublicacion(false);
    }
  };

  return (
    <div className="foro-container">
      {/* CONTENEDOR CON TITULO Y CONTROLES */}
      <div className="foro-header-row">
        <div className="contenido-col">
          <h1 className="foro-titulo">FORO VECINAL</h1>
          <p className="foro-subtitulo">
            Comparte y Mantente al tanto de lo que sucede en tu zona
            {zonaSeleccionada && (
              <span className="contador-publicaciones">
                {` • ${publicacionesFiltradas.length} publicación${publicacionesFiltradas.length !== 1 ? 'es' : ''} en ${zonaSeleccionada}`}
              </span>
            )}
          </p>
          <div className="foro-controles">
            <select 
              className="zona-select"
              value={zonaSeleccionada}
              onChange={(e) => setZonaSeleccionada(e.target.value)}
            >
              <option value="">Seleccionar Zona</option>
              {barrios && barrios.length > 0 && (
                barrios.map((barrioObj) => (
                  <option key={barrioObj._id} value={barrioObj.nombre}>
                    {barrioObj.nombre}
                  </option>
                ))
              )}
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
        {publicacionesFiltradas && publicacionesFiltradas.length > 0 ? (
          publicacionesFiltradas.map((publicacion) => (
            <div key={publicacion._id} className="pub-card">
              <div className="pub-header">
                <img 
                  src={publicacion.nombre === "Anónimo" ? userAnonimo : user2} 
                  alt={publicacion.nombre} 
                  className="pub-avatar" 
                />
                <div className="pub-info">
                  <h4 className="pub-autor">{publicacion.nombre}</h4>
                  <p className="pub-meta">
                    {new Date(publicacion.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })} • {publicacion.barrio}
                  </p>
                </div>
              </div>
              <div className="pub-content">
                <div className="pub-tipo-incidente">
                  <span className="tipo-badge">{publicacion.tipoIncidente}</span>
                </div>
                <p className="pub-texto">{publicacion.descripcion}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-publicaciones">
            <p>
              {zonaSeleccionada 
                ? `No hay publicaciones disponibles para ${zonaSeleccionada}.`
                : "No hay publicaciones disponibles. Selecciona una zona para ver las publicaciones."
              }
            </p>
          </div>
        )}
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
                  value={nombreAMostrar}
                  readOnly
                  className="nombre-input"
                  placeholder="Nombre del usuario"
                />
                <select 
                  value={tipoNombre} 
                  onChange={(e) => setTipoNombre(e.target.value)}
                  className="tipo-nombre-select"
                >
                  <option value="nombre">Mi nombre</option>
                  <option value="anonimo">Anónimo</option>
                </select>
              </div>

              <input 
                type="text" 
                placeholder="Barrio o sector" 
                className="barrio-input"
                value={zonaSeleccionada}
                onChange={(e) => setZonaSeleccionada(e.target.value)}
              />

              <select 
                className="tipo-incidente-select"
                value={tipoIncidenteSeleccionado}
                onChange={(e) => setTipoIncidenteSeleccionado(e.target.value)}
              >
                <option value="" disabled>Tipo de incidente</option>
                {tipoIncidente && tipoIncidente.length > 0 && (
                  tipoIncidente.map((tipoObj) => (
                    <option key={tipoObj._id} value={tipoObj.nombre}>
                      {tipoObj.nombre}
                    </option>
                  ))
                )}
              </select>

              <textarea
                placeholder="Escribe aquí tu mensaje o alerta para los vecinos..."
                rows="6"
                className="mensaje-textarea"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>

              <div className="modal-buttons">
                <button 
                  type="submit" 
                  className="btn-publicar"
                  disabled={enviandoPublicacion}
                >
                  {enviandoPublicacion ? "PUBLICANDO..." : "PUBLICAR"}
                </button>
                <button 
                  type="button" 
                  className="btn-cancelar" 
                  onClick={() => setMostrarModal(false)}
                  disabled={enviandoPublicacion}
                >
                  CANCELAR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForoVecinal;
