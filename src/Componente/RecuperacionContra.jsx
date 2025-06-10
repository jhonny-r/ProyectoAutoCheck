import React from "react";
import { useNavigate } from "react-router-dom";
import '../Estilos/RecuperacionContra.css';

function RecuperacionContra({ usuarios }) {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [mensaje, setMensaje] = React.useState("");

    const Recuperar = (e) => {
        e.preventDefault();
        const usuario = usuarios.find(u => u.email === email);
        if (usuario) {
            setMensaje(`Tu contraseña es: ${usuario.contraseña}`);
        } else {
            setMensaje("Correo no encontrado");
        }
    };

    return (
  <div className="recuperacion-container">
    <form className="recuperacion-form" onSubmit={Recuperar}>
      <div className="recuperacion-header">RECUPERAR CONTRASEÑA</div>

      <input
        type="email"
        name="email"
        placeholder="CORREO ELECTRÓNICO"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="mensaje-recuperacion">{mensaje}</div>

      <button type="submit" className="btn-recuperar">
        RECUPERAR
      </button>
      <button type="button" className="btn-volver" onClick={() => navigate("/")}>
        VOLVER AL INICIO
      </button>
    </form>
  </div>
);

}

export default RecuperacionContra;
