import React from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/Registro.css';

function Registro({ agregarUsuario, usuarios }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = React.useState("");
  const [alias, setAlias] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [direccion, setDireccion] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [contrasena, setContrasena] = React.useState("");
  // Nuevo estado para confirmar contraseña
  const [confirmarContrasena, setConfirmarContrasena] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aliasFinal = alias.trim() === "" ? nombre : alias;

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Armar nuevo usuario y enviarlo
    const nuevoUsuario = {
      nombre,
      alias: aliasFinal,
      telefono,
      direccion,
      email,
      contrasena,
      confirmarContrasena
    };

    console.log("Nuevo usuario a registrar:", nuevoUsuario);
    
    // Llamar a agregarUsuario y esperar el resultado
    try {
      await agregarUsuario(nuevoUsuario);
      alert("Usuario registrado exitosamente");
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar el usuario. Por favor intenta de nuevo.");
    }
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
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="CONFIRMAR CONTRASEÑA"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
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
