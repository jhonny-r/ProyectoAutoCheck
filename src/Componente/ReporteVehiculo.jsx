import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../Estilos/ReporteVehiculo.css';

function ReporteVehiculo({agregarVehiculo, onClose, tipoVehiculo, barrios, marcas}){
    const navigate = useNavigate();

    console.log("Tipos de vehículo recibidos en ReporteVehiculo:", tipoVehiculo);
    console.log("Barrios recibidos en ReporteVehiculo:", barrios);
    console.log("Marcas recibidas en ReporteVehiculo:", marcas);

    const [fecha, setFecha] = useState("");
    const [tipo, setTipo] = useState("");
    const [placa, setPlaca] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [color, setColor] = useState("");
    const [barrio, setBarrio] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        const nuevoVehiculo ={
            fecha,
            tipo,
            placa,
            marca,
            modelo,
            color,
            barrio
        };
        agregarVehiculo(nuevoVehiculo);
        if (onClose) {
            onClose();
        } else {
            navigate("/ListaVehiculos");
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate("/");
        }
    };

    return (
        <div className="reporte-container">
            <form className="reporte-vehiculo" onSubmit={handleSubmit}>
                <h4>🚗 REPORTE VEHICULO ROBADO</h4>
                
                <div>
                    <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)} required/> 
                </div>
                <select value={tipo} onChange={(e)=>setTipo(e.target.value)} required>
                    <option value="">Tipo de vehiculo</option>
                    {tipoVehiculo && tipoVehiculo.length > 0 && (
                        tipoVehiculo.map((tipoObj) => (
                            <option key={tipoObj._id} value={tipoObj.nombre}>
                                {tipoObj.nombre}
                            </option>
                        ))
                    )}
                </select>
                <input type="text" placeholder="Placa" value={placa} onChange={(e)=>setPlaca(e.target.value)} required/>
                
                <select value={marca} onChange={(e)=>setMarca(e.target.value)} required>
                    <option value="">Marca</option>
                    {marcas && marcas.length > 0 && (
                        marcas.map((marcaObj) => (
                            <option key={marcaObj._id} value={marcaObj.nombre}>
                                {marcaObj.nombre}
                            </option>
                        ))
                    )}
                </select>

                <div className="fila">
                    <input type="text" placeholder="Modelo" value={modelo} onChange={(e)=>setModelo(e.target.value)} required/>
                    <input type="text" placeholder="Color" value={color} onChange={(e)=>setColor(e.target.value)} required/>
                </div>

                <select value={barrio} onChange={(e)=>setBarrio(e.target.value)} required>
                    <option value="">Barrio</option>
                    {barrios && barrios.length > 0 && (
                        barrios.map((barrioObj) => (
                            <option key={barrioObj._id} value={barrioObj.nombre}>
                                {barrioObj.nombre}
                            </option>
                        ))
                    )}
                </select>

                <div className="botones-finales">
                    <button type="submit" className="btnIngresar">INGRESAR</button>
                    <button type="button" className="btnCancelar" onClick={handleClose}>CANCELAR</button> 
                </div>
            </form>
        </div>
    );
}

export default ReporteVehiculo;