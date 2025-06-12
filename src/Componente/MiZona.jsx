import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Estilos/MiZona.css';
import mapa from '../Imagenes/mapa_zona.jpg';

function MiZona() {
  const navigate = useNavigate();
  const [mostrarCombo, setMostrarCombo] = useState(false);
  const [zonaSeleccionada, setZonaSeleccionada] = useState('La Floresta');
  const [mensajeZona, setMensajeZona] = useState('');

  const cambiarZona = () => {
    setMostrarCombo(!mostrarCombo);
    setMensajeZona('');
  };

  const establecerZona = () => {
    setMensajeZona(`✅ Zona "${zonaSeleccionada}" agregada con éxito.`);
  };

  return (
    <div className="zona-container">
      <button className="volver-btn" onClick={() => navigate('/Inicio')}>Volver al Inicio</button>
      <h1 className="zona-titulo">Mi Zona</h1>
      <p className="zona-subtitulo">Gestiona la zona que deseas monitorear y mantente informado de lo que ocurre a tu alrededor.</p>

      <div className="zona-centro">
        <div className="zona-mapa-contenedor">
          <img src={mapa} alt="Mapa" className="zona-mapa" />
          {mostrarCombo && (
            <select value={zonaSeleccionada} onChange={(e) => setZonaSeleccionada(e.target.value)} className="zona-select">
              <option>La Floresta</option>
              <option>El Batán</option>
              <option>El Recreo</option>
              <option>Carcelén</option>
              <option>La Mariscal</option>
            </select>
          )}
          {mensajeZona && <div className="mensaje-exito">{mensajeZona}</div>}
        </div>

        <div className="zona-botones">
          <button className="btn-verde" onClick={cambiarZona}>Cambiar Zona</button>
          <button className="btn-azul" onClick={establecerZona}>Establecer como Principal</button>
        </div>
      </div>

      <div className="zona-estadisticas">
        <div className="card-alerta">
          <p className="valor">5</p>
          <p>Alertas<br />Últimos 7 días</p>
        </div>
        <div className="card-reporte">
          <p className="valor">12</p>
          <p>Reportes<br />Recientes</p>
        </div>
        <div className="card-sospechoso">
          <p className="valor">2</p>
          <p>Vehículos<br />Sospechosos</p>
        </div>
      </div>

      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>
    </div>
  );
}

export default MiZona;
