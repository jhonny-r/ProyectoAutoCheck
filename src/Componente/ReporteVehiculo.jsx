import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import '../Estilos/ReporteVehiculo.css';

function ReporteVehiculo({agregarVehiculo}){
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
        agregarVehiculo(nuevoVehiculo);
        navigate("/Inicio");
    };

    return (
        <form className="reporte-vehiculo" onSubmit={handleSubmit}>
            <h4>REPORTE VEHICULO ROBADO</h4>
            
            <div>
                
                <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)}/> 
            </div>
            <select value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                <option value="">Tipo de vehiculo</option>
                <option value="Auto">Auto</option>
                <option value="Moto">Moto</option>
                <option value="Camioneta">Camioneta</option>
            </select>
            <input type="text" placeholder="Placa" value={placa} onChange={(e)=>setPlaca(e.target.value)}/>
            <br/>
            <select value={marca} onChange={(e)=>setMarca(e.target.value)}>
                <option value="">Marca</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Kia">Kia</option>
                <option value="Hyundai">Hyundai</option>
            </select>

            <div className="fila">
                <input type="text" placeholder="Modelo" value={modelo} onChange={(e)=>setModelo(e.target.value)}/>
                <input type="text" placeholder="Color" value={color} onChange={(e)=>setColor(e.target.value)}/>
            </div>

            <select value={barrio} onChange={(e)=>setBarrio(e.target.value)}>
                <option value="">Barrio</option>
                <option value="La Floresta">La Floresta</option>
                <option value="Carcelén">Carcelén</option>
                <option value="Solanda">Solanda</option>
            </select>

            <label className="label-file">
          
          <input type="file" accept="image/*"  />
        </label>

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