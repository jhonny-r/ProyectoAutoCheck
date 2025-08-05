import React, { useState } from 'react';
import '../Estilos/GestionZonas.css';
import { useNavigate } from 'react-router-dom';

function GestionZonas({ barrios, agregarBarrio, eliminarBarrio, editarBarrio }) {
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('');
  const [riesgo, setRiesgo] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoAgregar, setModoAgregar] = useState(false);

  const navigate = useNavigate();

  const abrirModalAgregar = () => {
    setNombre('');
    setSector('');
    setRiesgo('');
    setModoAgregar(true);
    setMostrarModal(true);
  };

  const abrirModalEditar = (barrio) => {
    setEditando(barrio);
    setNombre(barrio.nombre);
    setSector(barrio.sector);
    setRiesgo(barrio.riesgo.toString());
    setModoAgregar(false);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEditando(null);
    setNombre('');
    setSector('');
    setRiesgo('');
    setModoAgregar(false);
  };

  const agregarZona = () => {
    if (nombre.trim() === '') return alert('El nombre del barrio es obligatorio');
    if (sector.trim() === '') return alert('El sector es obligatorio');
    if (riesgo === '') return alert('El nivel de riesgo es obligatorio');
    
    const nuevaZona = { 
      nombre, 
      sector, 
      riesgo: parseInt(riesgo) 
    };
    
    agregarBarrio(nuevaZona);
    cerrarModal();
  };

  const eliminarZona = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta zona?')) {
      eliminarBarrio(id);
    }
  };

  const guardarCambios = () => {
    if (nombre.trim() === '') return alert('El nombre del barrio es obligatorio');
    if (sector.trim() === '') return alert('El sector es obligatorio');
    if (riesgo === '') return alert('El nivel de riesgo es obligatorio');

    if (modoAgregar) {
      const nuevaZona = { 
        nombre, 
        sector, 
        riesgo: parseInt(riesgo) 
      };
      agregarBarrio(nuevaZona);
    } else {
      const barrioActualizado = {
        nombre,
        sector,
        riesgo: parseInt(riesgo)
      };
      editarBarrio(editando._id, barrioActualizado);
    }

    cerrarModal();
  };

  return (
    <div className="zonas-container">
      <div className="titulo-zona">
        <h2>Gestión de Zonas</h2>
      </div>

      <div className="contenedor-boton-agregar">
        <button className="btn-agregar-centrado" onClick={abrirModalAgregar}>
          Agregar Zona
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Barrio</th>
            <th>Sector</th>
            <th>Nivel de Riesgo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {barrios.map((barrio) => (
            <tr key={barrio._id}>
              <td>{barrio._id}</td>
              <td>{barrio.nombre}</td>
              <td>{barrio.sector}</td>
              <td>{barrio.riesgo}</td>
              <td>
                <button className="btn-tabla" onClick={() => abrirModalEditar(barrio)}>Editar</button>
                <button className="btn-tabla" onClick={() => eliminarZona(barrio._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="contenedor-boton-volver">
        <button className="btn-volver" onClick={() => navigate('/PanelAdmin')}>Volver al Panel de Administración</button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>{modoAgregar ? "Agregar Zona" : "Editar Zona"}</h3>
            
            <div className="form-group">
              <label>Nombre del Barrio</label>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Sector</label>
              <select
                name="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                required
              >
                <option value="">Seleccionar Sector</option>
                <option value="Centro">Centro</option>
                <option value="Norte">Norte</option>
                <option value="Sur">Sur</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nivel de Riesgo</label>
              <select
                name="riesgo"
                value={riesgo}
                onChange={(e) => setRiesgo(e.target.value)}
                required
              >
                <option value="">Seleccionar Nivel de Riesgo</option>
                <option value="1">Bajo (1)</option>
                <option value="2">Medio (2)</option>
                <option value="3">Alto (3)</option>
              </select>
            </div>

            <div className="modal-botones">
              <button onClick={guardarCambios} className="btn-modal guardar">
                {modoAgregar ? "Guardar Zona" : "Guardar Cambios"}
              </button>
              <button onClick={cerrarModal} className="btn-modal cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionZonas;
