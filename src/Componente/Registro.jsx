import React from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/Registro.css';

function Registro({agregarUsuario}) {
  const navigate = useNavigate(); 

const [nombre, setNombre] = React.useState("");
const [alias, setAlias] = React.useState("");
const [telefono, setTelefono] = React.useState("");
const [direccion, setDireccion] = React.useState("");
const [email, setEmail] = React.useState("");
const [contraseña, setContraseña] = React.useState("");
const [confirmarContraseña, setConfirmarContraseña] = React.useState("");

const handleSubmit = (e) => {
  e.preventDefault();

if(alias === "") {
  alias = nombre; 
}

  if (contraseña === confirmarContraseña) {
    agregarUsuario({ nombre, alias, telefono, direccion, email, contraseña });
    navigate("/");
  } else {
    alert("Las contraseñas no coinciden");
  }
};

  return (
    <div className="registro-container">
      <form className="registro-form"  onSubmit={handleSubmit}>
        <div className="registro-header">REGISTRO DE USUARIO</div>

        <input type="text" placeholder="NOMBRE"  value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="ALIAS (OPCIONAL)"  value={alias} onChange={(e) => setAlias(e.target.value)} />
        <input type="text" placeholder="TELÉFONO"  value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <input type="text" placeholder="DIRECCIÓN"  value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        <input type="email" placeholder="CORREO ELECTRÓNICO"  value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="CONTRASEÑA"  value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
        <input type="password" placeholder="CONFIRMAR CONTRASEÑA"  value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />

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
