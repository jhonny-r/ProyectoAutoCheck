// Importaciones necesarias para el componente
import React from "react";
import '../Estilos/login.css'; // Estilos específicos para la pantalla de login
import { useNavigate } from "react-router-dom"; // Hook para navegación programática
import { Link } from "react-router-dom"; // Componente para enlaces de navegación
import LogoBlanco from '../Imagenes/LogoBlanco.svg'; // Logo de la aplicación
import axios from "axios"; // Librería para peticiones HTTP

/**
 * Componente Login - Pantalla de inicio de sesión
 * @param {Array} usuarios - Lista de usuarios (props desde App.js)
 * @param {Function} setUsuarioActivo - Función para establecer el usuario logueado
 */
function Login({ usuarios, setUsuarioActivo }) {

    // Debug: Mostrar en consola los usuarios disponibles para verificación
    console.log("Usuarios en Login:", usuarios);
    
    // Hook para navegación entre páginas
    const navigate = useNavigate();
    
    // Estados para manejar los campos del formulario
    const [email, setEmail] = React.useState(""); // Email ingresado por el usuario
    const [password, setPassword] = React.useState(""); // Contraseña ingresada por el usuario

    /**
     * Función para manejar el proceso de inicio de sesión
     * @param {Event} e - Evento del formulario
     */
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        console.log("Intentando iniciar sesión con:", email, password);
        try {
            // Hacer petición POST a la API para autenticar al usuario
            const response = await axios.post("http://172.29.49.83:8000/api/usuarios/login", {
                email,
                contrasena: password
            });
            
            const data = response.data;
            
            // Verificar si el login fue exitoso
            if (data.msg === "Ingreso exitoso") {
                // Guardar datos del usuario en localStorage para persistencia
                localStorage.setItem("usuarioActivo", JSON.stringify(data));
                // Actualizar el estado global del usuario activo
                setUsuarioActivo(data);
                // Navegar a la pantalla principal
                navigate("/inicio");
            } else {
                // Mostrar mensaje de error si las credenciales son incorrectas
                alert("Usuario o contraseña no válidos");
            }
        } catch (error) {
            // Manejar errores de conexión o del servidor
            alert("Usuario o contraseña no válidos");
        }
    };

    /**
     * Función para acceso directo al panel de administración
     * Permite saltarse el login para usuarios administradores
     */
    const entrarComoAdmin = () => {
        navigate("/PanelAdmin");
    };

    // ========== RENDERIZADO DEL COMPONENTE ==========
    
    return (
        // Contenedor principal de la pantalla de login
        <div className="login-container">
            {/* Caja centrada que contiene el formulario de login */}
            <div className="login-box">
                {/* Logo de la aplicación */}
                <img src={LogoBlanco} alt="Logo AutoCheck" className="logoBlanco" />
                
                {/* Título de la página */}
                <h2>Iniciar sesión</h2>

                {/* Campo de entrada para el email */}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Actualizar estado cuando cambie el valor
                />
                
                {/* Campo de entrada para la contraseña */}
                <input
                    type="password"
                    placeholder="Contraseña"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualizar estado cuando cambie el valor
                />

                {/* Botón principal para iniciar sesión */}
                <button className="login-button" onClick={handleLogin}>Iniciar sesión</button>
                
                {/* Botón secundario para acceso de administrador */}
                <button className="admin-button" onClick={entrarComoAdmin}>Entrar como Administrador</button>

                {/* Enlaces adicionales */}
                <div className="login-links">
                    {/* Enlace para crear nueva cuenta */}
                    <Link to="/registro">Crear Cuenta</Link>
                </div>
            </div>
        </div>
    );
}

// Exportar el componente para poder usarlo en otras partes de la aplicación
export default Login;
