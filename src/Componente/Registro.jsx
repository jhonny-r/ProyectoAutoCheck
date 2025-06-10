import React from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/Registro.css';

function Registro() {
  const navigate = useNavigate();

  return (
    <div className="registro-container">
      <form className="registro-form">
        <div className="registro-header">REGISTRO DE USUARIO</div>

        <input type="text" placeholder="NOMBRE" />
        <input type="text" placeholder="ALIAS (OPCIONAL)" />
        <input type="text" placeholder="TELÉFONO" />
        <input type="text" placeholder="DIRECCIÓN" />
        <input type="email" placeholder="CORREO ELECTRÓNICO" />
        <input type="password" placeholder="CONTRASEÑA" />
        <input type="password" placeholder="CONFIRMAR CONTRASEÑA" />

        <button type="submit" className="btn-registrarse" onClick={() => navigate("/")}>
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
