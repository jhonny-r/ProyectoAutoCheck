import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Estilos/ListaUsuarios.css";

function ListaUsuarios({ usuarios, eliminarUsuario, editarUsuario, agregarUsuario }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [modoAgregar, setModoAgregar] = useState(false);
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const navigate = useNavigate();

  const campos = ["nombre", "alias", "telefono", "email", "direccion", "contraseña"];

  const abrirModalEditar = (usuario) => {
    setUsuarioEditado({ ...usuario });
    setModoAgregar(false);
    setConfirmarContraseña(usuario.contraseña); // para editar visible
    setMostrarModal(true);
  };

  const abrirModalAgregar = () => {
    const nuevoId = (
      usuarios.length > 0
        ? Math.max(...usuarios.map(u => Number(u.id))) + 1
        : 1
    ).toString();

    setUsuarioEditado({
      id: nuevoId,
      nombre: "",
      alias: "",
      telefono: "",
      email: "",
      direccion: "",
      contraseña: ""
    });
    setConfirmarContraseña("");
    setModoAgregar(true);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setUsuarioEditado(null);
    setConfirmarContraseña("");
    setModoAgregar(false);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    const aliasFinal = usuarioEditado.alias.trim() === "" ? usuarioEditado.nombre : usuarioEditado.alias;

    if (modoAgregar && usuarioEditado.contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const usuarioFinal = {
      ...usuarioEditado,
      alias: aliasFinal,
    };

    if (modoAgregar) {
      agregarUsuario(usuarioFinal);
    } else {
      editarUsuario(usuarioEditado.id, usuarioFinal);
    }

    cerrarModal();
  };

  const irAPanelAdmin = () => {
    navigate("/PanelAdmin");
  };

  return (
    <div className="usuarios-contenedor">
      <div className="titulo-zona">
        <h2>Gestión de Usuarios</h2>
      </div>

      <div className="contenedor-boton-agregar">
        <button className="btn-agregar-centrado" onClick={abrirModalAgregar}>
          Agregar Usuario
        </button>
      </div>

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Alias</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.alias}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.email}</td>
              <td>{usuario.direccion}</td>
              <td>
                <button onClick={() => abrirModalEditar(usuario)} className="btn-tabla editar">Editar</button>
                <button onClick={() => eliminarUsuario(usuario.id)} className="btn-tabla eliminar">Eliminar</button>
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
            <h3>{modoAgregar ? "Agregar Usuario" : "Editar Usuario"}</h3>
            {campos.map((campo) => (
              <div key={campo} className="form-group">
                <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
                <input
                  type="text" // ← contraseña ahora visible como texto
                  name={campo}
                  value={usuarioEditado[campo]}
                  onChange={manejarCambio}
                  required={campo !== "alias"}
                />
              </div>
            ))}

            {modoAgregar && (
              <div className="form-group">
                <label>Confirmar Contraseña</label>
                <input
                  type="text" // ← también visible
                  name="confirmarContraseña"
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="modal-botones">
              <button onClick={guardarCambios} className="btn-modal guardar">
                {modoAgregar ? "Guardar Usuario" : "Guardar Cambios"}
              </button>
              <button onClick={cerrarModal} className="btn-modal cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaUsuarios;
