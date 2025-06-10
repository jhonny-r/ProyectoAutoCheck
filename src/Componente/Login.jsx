import React from "react";
import '../Estilos/login.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoBlanco from '../Imagenes/LogoBlanco.svg';

function Login({ usuarios }) {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const usuarioValido = usuarios.find(u => u.email === email && u.contraseña === password);
        console.log(usuarioValido);
        if (usuarioValido) {
            navigate("/inicio");
        } else {
            alert("Usuario o contraseña no válidos");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={LogoBlanco} alt="Logo AutoCheck" className="logoBlanco" />
                <h2>Iniciar sesión</h2>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="login-button" onClick={handleLogin}>Iniciar sesión</button>
                <div className="login-links">
                    <Link to="/recuperacioncontra">Recuperar contraseña</Link><br />
                   <br />
                    <Link to="/registro">Crear Cuenta</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
