import React, { useState } from "react";
import '../Estilos/MiAutoCheck.css';
import { useNavigate } from "react-router-dom";
import avatar from '../Imagenes/avatar.avif';
import EditarPerfil from './EditarPerfil'; 

function MiAutoCheck({ usuario, consultas, eliminarConsulta, setUsuarioActivo, setConsultas }) {
    const navigate = useNavigate();
    const [mostrarEditarPerfil, setMostrarEditarPerfil] = useState(false);
    const horaAcceso = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const abrirEditarPerfil = () => {
        setMostrarEditarPerfil(true);
    };

    const cerrarEditarPerfil = () => {
        setMostrarEditarPerfil(false);
    };

    return (
        <div className="mi-auto">
            {/* ENCABEZADO */}
            <div className="encabezado">
                <img src={avatar} alt="avatar del usuario" />
                <div className="encabezado-texto">
                    <h2 className="titulo">Bienvenido de nuevo,"{usuario?.nombre}"</h2>
                    <p className="subtitulo">{usuario?.direccion}, Último acceso hoy a las {horaAcceso}</p>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="contenido">
                {/* BOTONES LATERALES */}
                <div className="botones">
                    <button onClick={() => navigate("/Inicio")}>Volver al Inicio</button>
                    <button onClick={abrirEditarPerfil}>Editar Perfil</button>
                    <button onClick={() => {
                        localStorage.removeItem("usuarioActivo");
                        localStorage.removeItem("consultas");
                        setUsuarioActivo(null);
                        setConsultas([]);
                        navigate("/");
                    }}>
                        Cerrar Sesión
                    </button>
                </div>

                {/* PANEL DERECHO */}
                <div className="panel-derecho">
                    <div className="secciones">
                        <div className="columna">
                            <h3>🚗 Vehículos Consultados</h3>
                            {consultas.map((consulta, index) => (
                                <div key={index} className="fila-consulta">
                                    <span>{consulta.placa}</span>
                                    <button className="btnEliminar" onClick={() => eliminarConsulta(consulta.placa)}>Eliminar</button>
                                </div>
                            ))}
                        </div>

                        <div className="columna">
                            <h3>📅 Historial de verificaciones</h3>
                            {consultas.map((consulta, index) => (
                                <div key={index} className="fila-historial">
                                    <span>{consulta.fecha}</span>
                                    <span className={consulta.alerta ? 'alerta-roja' : 'alerta-verde'}>
                                        {consulta.alerta ? 'CON ALERTAS' : 'SIN ALERTAS'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SECCIÓN ALERTAS Y ZONA */}
                    <div className="alertas-zona">
                        <div className="columna">
                            <h3>🔔 Alertas Activas</h3>
                            <span>{consultas.some(c => c.alerta) ? 'Alerta registrada' : 'Ninguna Alerta'}</span>
                        </div>
                        <div className="columna">
                            <h3>🗺️ Mi Zona</h3>
                            <span>{usuario?.direccion}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* PIE DE PÁGINA */}
            <div className="footer">
                AutoCheck - Juntos hacemos las calles más seguras
            </div> 

            {/* MODAL EDITAR PERFIL */}
            {mostrarEditarPerfil && (
                <EditarPerfil onClose={cerrarEditarPerfil} usuario={usuario} setUsuarioActivo={setUsuarioActivo} />
            )}
        </div>
    );
}

export default MiAutoCheck;
