import React from "react";
import '../Estilos/ListaUsuarios.css';

function ListaUsuarios({ usuarios, eliminarUsuario }) {
  return (
    <div className="usuarios-container">
      <div className="usuarios-header">LISTA DE USUARIOS</div>
      <div className="usuarios-grid">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="usuario-card">
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Alias:</strong> {usuario.alias}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
            <p><strong>Dirección:</strong> {usuario.direccion}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>Contraseña:</strong> {usuario.contraseña}</p>
            <div className="usuario-botones">
              <button className="btn-editar">Editar Usuario</button>
              <button className="btn-eliminar" onClick={()=> eliminarUsuario(usuario.id)}>Eliminar Usuario</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaUsuarios;
