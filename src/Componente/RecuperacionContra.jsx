import React from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={Recuperar}>
                <label>
                    Correo:
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <labe>{mensaje}</labe>
                <button type="submit">Recuperar</button>
            </form>
             <button className="boton" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
    );
}

export default RecuperacionContra;
