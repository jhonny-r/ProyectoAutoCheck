import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/ListaVehiculos.css';

function ListaVehiculos({ vehiculos, eliminarVehiculo, editarVehiculo }) {
  const navigate = useNavigate();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vehiculoEditado, setVehiculoEditado] = useState(null);

  const abrirModal = (vehiculo) => {
    setVehiculoEditado(vehiculo);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setVehiculoEditado(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculoEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarCambios = () => {
    editarVehiculo(vehiculoEditado.id, vehiculoEditado);
    cerrarModal();
  };

  const reporVehiculo = () => {
    navigate("/ReporteVehiculo");
  };

  const regresarPanel = () => {
    navigate("/PanelAdmin");
  };

  return (
    <div className="lista-vehiculos-container">
      <h2>Lista de Vehículos</h2>

      {vehiculos.length === 0 ? (
        <p>No hay vehículos registrados.</p>
      ) : (
        <table className="vehiculos-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Barrio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td>{vehiculo.fecha}</td>
                <td>{vehiculo.tipo}</td>
                <td>{vehiculo.placa}</td>
                <td>{vehiculo.marca}</td>
                <td>{vehiculo.modelo}</td>
                <td>{vehiculo.color}</td>
                <td>{vehiculo.barrio}</td>
                <td className="acciones">
                  <button className="btnEditar" onClick={() => abrirModal(vehiculo)}>Editar</button>
                  <button className="btnEliminar" onClick={() => eliminarVehiculo(vehiculo.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {mostrarModal && vehiculoEditado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Vehículo</h3>
            <input name="fecha" value={vehiculoEditado.fecha} onChange={handleChange} />
            <input name="tipo" value={vehiculoEditado.tipo} onChange={handleChange} />
            <input name="placa" value={vehiculoEditado.placa} onChange={handleChange} />
            <input name="marca" value={vehiculoEditado.marca} onChange={handleChange} />
            <input name="modelo" value={vehiculoEditado.modelo} onChange={handleChange} />
            <input name="color" value={vehiculoEditado.color} onChange={handleChange} />
            <input name="barrio" value={vehiculoEditado.barrio} onChange={handleChange} />
            <div className="modal-buttons">
              <button className="btnGuardar" onClick={guardarCambios}>Guardar</button>
              <button className="btnCancelar" onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="botones-acciones">
        <button className="btnAgregar" onClick={reporVehiculo}>Agregar Vehiculo</button>
        <button className="btnAgregar" onClick={regresarPanel}>Regresar</button>
      </div>

    </div>
  );
}

export default ListaVehiculos;
