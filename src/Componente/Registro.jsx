import React from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/Registro.css';

function Registro({ agregarUsuario, usuarios }) {
  const navigate = useNavigate();

  // ID como string para compatibilidad con json-server
  const id = (
    usuarios.length > 0
      ? Math.max(...usuarios.map(u => Number(u.id))) + 1
      : 1
  ).toString();

  const [nombre, setNombre] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [confirmarContraseña, setConfirmarContraseña] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const aliasFinal = alias.trim() === "" ? nombre : alias;

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Armar nuevo usuario y enviarlo
    const nuevoUsuario = {
      id,
      nombre,
      alias: aliasFinal,
      telefono,
      direccion,
      email,
      contraseña,
    };

    agregarUsuario(nuevoUsuario);
    navigate("/");
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <div className="registro-header">REGISTRO DE USUARIO</div>

        <input
          type="text"
          placeholder="NOMBRE"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ALIAS (OPCIONAL)"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <input
          type="text"
          placeholder="TELÉFONO"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="DIRECCIÓN"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="CORREO ELECTRÓNICO"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="CONTRASEÑA"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="CONFIRMAR CONTRASEÑA"
          value={confirmarContraseña}
          onChange={(e) => setConfirmarContraseña(e.target.value)}
          required
        />

        <button type="submit" className="btn-registrarse">
          REGISTRARSE
        </button>
        <button type="button" className="btn-cancelar" onClick={() => navigate("/")}>
          CANCELAR
        </button>
      </form>
    </div>
  );
}

export default Registro;
