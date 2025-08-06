import React from "react";
import '../Estilos/login.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoBlanco from '../Imagenes/LogoBlanco.svg';
import axios from "axios";

function Login({ usuarios, setUsuarioActivo }) {

    console.log("Usuarios en Login:", usuarios);
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Intentando iniciar sesión con:", email, password);
        try {
            const response = await axios.post("http://localhost:8000/api/usuarios/login", {
                email,
                contrasena: password
            });
            const data = response.data;
            if (data.msg === "Ingreso exitoso") {
                localStorage.setItem("usuarioActivo", JSON.stringify(data));
                setUsuarioActivo(data);
                navigate("/inicio");
            } else {
                alert("Usuario o contraseña no válidos");
            }
        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    const entrarComoAdmin = () => {
        navigate("/PanelAdmin");
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
                
                <button className="admin-button" onClick={entrarComoAdmin}>Entrar como Administrador</button>

                <div className="login-links">
                    <Link to="/registro">Crear Cuenta</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
