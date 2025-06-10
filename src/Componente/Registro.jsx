import React from "react";
import { useNavigate } from "react-router-dom";

function Registro() {

    const navigate = useNavigate();
  return (
    <div>
      <h2>REGISTRO DE USUARIO</h2>
      <form>
        <div>
          <input type="text" placeholder="NOMBRE" />
        </div>
        <div>
          <input type="text" placeholder="ALIAS (OPCIONAL)" />
        </div>
        <div>
          <input type="text" placeholder="TELÉFONO" />
        </div>
        <div>
          <input type="text" placeholder="DIRECCIÓN" />
        </div>
        <div>
          <input type="email" placeholder="CORREO ELECTRÓNICO" />
        </div>
        <div>
          <input type="password" placeholder="CONTRASEÑA" />
        </div>
        <div>
          <input type="password" placeholder="CONFIRMAR CONTRASEÑA" />
        </div>
        <br />
        <button type="submit" onClick={() => navigate('/')}>REGISTRARSE</button>
        <br /><br />
        <button type="button" onClick={() => navigate('/')}>CANCELAR</button>
      </form>
    </div>
  );
}

export default Registro;
