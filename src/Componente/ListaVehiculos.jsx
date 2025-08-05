import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/ListaVehiculos.css';

function ListaVehiculos({ vehiculos, eliminarVehiculo, editarVehiculo, agregarVehiculo }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vehiculoEditado, setVehiculoEditado] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);
  const navigate = useNavigate();

  const campos = ["fecha", "tipo", "placa", "marca", "modelo", "color", "barrio"];

  const abrirModalEditar = (vehiculo) => {
    const vehiculoConFechaFormateada = {
      ...vehiculo,
      fecha: vehiculo.fecha ? vehiculo.fecha.split('T')[0] : ""
    };
    setVehiculoEditado(vehiculoConFechaFormateada);
    setModoAgregar(false);
    setMostrarModal(true);
  };

  const abrirModalAgregar = () => {
    setVehiculoEditado({
      fecha: "",
      tipo: "",
      placa: "",
      marca: "",
      modelo: "",
      color: "",
      barrio: ""
    });
    setModoAgregar(true);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setVehiculoEditado(null);
    setModoAgregar(false);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setVehiculoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    if (modoAgregar) {
      agregarVehiculo(vehiculoEditado);
    } else {
      editarVehiculo(vehiculoEditado._id, vehiculoEditado);
    }
    cerrarModal();
  };

  const irAPanelAdmin = () => {
    navigate("/PanelAdmin");
  };

  return (
    <div className="vehiculos-contenedor">
      <div className="titulo-zona">
        <h2>Gestión de Vehículos</h2>
      </div>

      <div className="contenedor-boton-agregar">
        <button className="btn-agregar-centrado" onClick={abrirModalAgregar}>
          Agregar Vehículo
        </button>
      </div>

      <table className="tabla-vehiculos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Barrio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo._id}>
              <td>{vehiculo._id}</td>
              <td>{vehiculo.fecha ? new Date(vehiculo.fecha).toLocaleDateString() : ""}</td>
              <td>{vehiculo.tipo}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.color}</td>
              <td>{vehiculo.barrio}</td>
              <td>
                <button onClick={() => abrirModalEditar(vehiculo)} className="btn-tabla editar">Editar</button>
                <button onClick={() => eliminarVehiculo(vehiculo._id)} className="btn-tabla eliminar">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="contenedor-boton-volver">
        <button className="btn-volver" onClick={irAPanelAdmin}>
          Volver al Panel de Administración
        </button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <h3>{modoAgregar ? "Agregar Vehículo" : "Editar Vehículo"}</h3>
            {campos.map((campo) => (
              <div key={campo} className="form-group">
                <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
                {campo === "tipo" ? (
                  <select
                    name={campo}
                    value={vehiculoEditado[campo]}
                    onChange={manejarCambio}
                    required
                  >
                    <option value="">Seleccionar Tipo</option>
                    <option value="Auto">Auto</option>
                    <option value="Moto">Moto</option>
                    <option value="Camioneta">Camioneta</option>
                    <option value="Bus">Bus</option>
                    <option value="Camión">Camión</option>
                  </select>
                ) : (
                  <input
                    type={campo === "fecha" ? "date" : "text"}
                    name={campo}
                    value={vehiculoEditado[campo]}
                    onChange={manejarCambio}
                    required
                  />
                )}
              </div>
            ))}

            <div className="modal-botones">
              <button onClick={guardarCambios} className="btn-modal guardar">
                {modoAgregar ? "Guardar Vehículo" : "Guardar Cambios"}
              </button>
              <button onClick={cerrarModal} className="btn-modal cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaVehiculos;
