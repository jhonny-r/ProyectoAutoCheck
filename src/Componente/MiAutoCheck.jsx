import React from "react";
import '../Estilos/MiAutoCheck.css';
import { useNavigate } from "react-router-dom";
import avatar from '../Imagenes/avatar.avif';

function MiAutoCheck({usuario,consultas,eliminarConsulta, setUsuarioActivo,setConsultas}) {
    const navigate = useNavigate();
    const horaAcceso = new Date().toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})

    return (
        <div className="mi-auto">
            <div className="encabezado">
                <img src={avatar} alt="avatar del usaurio"/>
                <div className="encabezado-texto">
                     <h2 className="titulo">Bienvenido de nuevo,"{usuario?.nombre}"</h2>
                     <p className="subtitulo">{usuario?.direccion}, Último acceso hoy a las {horaAcceso}</p>
                </div>
            </div>
           
            <div className="secciones">
                <div className="columna">
                    <h3>🚗 Vehículos Consultados</h3>
                    {consultas.map((consulta,index)=>(
                        <div key={index} className="fila-consulta">
                            <span>{consulta.placa}</span>
                            <button className="btnEliminar" onClick={() => eliminarConsulta(consulta.placa)}>Eliminar</button>
                        </div>
                    ))}
                </div>

                <div className="columna">
                    <h3>📅 Historial de verificaciones</h3>
                    {consultas.map((consulta,index)=>(
                        <div key={index} className="fila-historial">
                          <span>{consulta.fecha}</span>
                          <span className={consulta.alerta ? 'alerta-roja' : 'alerta-verde'}>
                            {consulta.alerta ? 'CON ALERTAS' : 'SIN ALERTAS'}
                          </span>
                         </div>
                    ))}
                </div>
            </div>

            <div className="zona-inferior">
                <p><strong>🔔 Alertas Activas:</strong> {consultas.some(c => c.alerta) ? 'Alerta registrada' : 'Ninguna Alerta'}</p>
                <p><strong>🗺️ Mi Zona:</strong> {usuario?.direccion}</p>
            </div>

            <div className="botones">
                <button className="btnInicio" onClick={() => navigate("/Inicio")}>Volver al Inicio</button>
                <button className="btnEditar" onClick={() => navigate("/EditarPerfil")}>Editar Perfil</button>
                <button className="btnSalir" onClick={()=>{localStorage.removeItem("usuarioActivo");localStorage.removeItem("consultas"); setUsuarioActivo(null);setConsultas([]); navigate("/")} }>Cerrar Sesión</button>

            </div>

            <div className="footer">
                AutoCheck - Juntos hacemos las calles más seguras
            </div>

        </div>
        
    );
}

export default MiAutoCheck;