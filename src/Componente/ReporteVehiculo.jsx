import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../Estilos/ReporteVehiculo.css';

const ReporteVehiculo =({setVehiculos}) =>{
    const navigate = useNavigate();

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
        setVehiculos(prevVehiculos => [...prevVehiculos, nuevoVehiculo]);
        navigate("/VerificarVehiculo");
    };

    return (
        <form className="reporte-vehiculo" onSubmit={handleSubmit}>
            <h4>REPORTE VEHICULO ROBADO</h4>
            
            <div>
                <label>Fecha</label>
                <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)}/> 
            </div>
            <select value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                <option value="">Tipo de vehiculo</option>
                <option value="Auto">Auto</option>
                <option value="Moto">Moto</option>
                <option value="Camioneta">Camioneta</option>
            </select>
            <label>Placa</label>
            <input type="text" value={placa} onChange={(e)=>setPlaca(e.target.value)}/>
            <br/>
            <select value={marca} onChange={(e)=>setMarca(e.target.value)}>
                <option value="">Marca</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Kia">Kia</option>
                <option value="Hyundai">Hyundai</option>
            </select>

            <div className="fila">
                <label>Modelo</label>
                <input type="text" value={modelo} onChange={(e)=>setModelo(e.target.value)}/>
                <label>Color</label>
                <input type="text" value={color} onChange={(e)=>setColor(e.target.value)}/>
            </div>

            <select value={barrio} onChange={(e)=>setBarrio(e.target.value)}>
                <option value="">Barrio</option>
                <option value="La Floresta">La Floresta</option>
                <option value="Carcelén">Carcelén</option>
                <option value="Solanda">Solanda</option>
            </select>
            <br/>
            <br/>
            <button type="submit" className="btnIngresar">INGRESAR</button>
            <br/>
            <br/>
            <button type="button" className="btnCancelar" onClick={()=>navigate("/Inicio")}>CANCELAR</button> 


        </form>
    );


}

export default ReporteVehiculo;