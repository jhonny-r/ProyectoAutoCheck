import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/ListaUsuarios.css';

function ListaUsuarios({ usuarios, eliminarUsuario, actualizarUsuario, editarUsuario }) {
  const [modoEdicionId, setModoEdicionId] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});
  const navigate = useNavigate();

  const activarEdicion = (usuario) => {
    setModoEdicionId(usuario.id);
    setDatosEditados({ ...usuario });
  };

  const guardarCambios = () => {
    editarUsuario(datosEditados.id, datosEditados);
    setModoEdicionId(null);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosEditados((prev) => ({ ...prev, [name]: value }));
  };

  const irARegistro = () => {
    navigate("/registro");
  };

  return (
    <div className="usuarios-container">
      <div className="usuarios-header">
        LISTA DE USUARIOS
        <button className="btn-agregar" onClick={irARegistro}>Agregar Usuario</button>
      </div>

      <div className="usuarios-grid">
        {usuarios.map((usuario) => {
          const enEdicion = modoEdicionId === usuario.id;
          return (
            <div key={usuario.id} className="usuario-card">
              {["nombre", "alias", "telefono", "direccion", "email", "contraseña"].map((campo) => (
                <div key={campo}>
                  <strong>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>
                  {enEdicion ? (
                    <input
                      type="text"
                      name={campo}
                      value={datosEditados[campo]}
                      onChange={manejarCambio}
                      className="input-edicion"
                    />
                  ) : (
                    <p>{usuario[campo]}</p>
                  )}
                </div>
              ))}

              <div className="usuario-botones">
                {enEdicion ? (
                  <button className="btn-editar" onClick={guardarCambios}>
                    Guardar
                  </button>
                ) : (
                  <button className="btn-editar" onClick={() => activarEdicion(usuario)}>
                    Editar Usuario
                  </button>
                )}
                <button className="btn-eliminar" onClick={() => eliminarUsuario(usuario.id)}>
                  Eliminar Usuario
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListaUsuarios;
