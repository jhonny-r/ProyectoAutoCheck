import React, {useState} from "react";
import '../Estilos/VerificarVehiculo.css';

function VerificarVehiculo({vehiculos}) {
    
    const [placa,setPlaca] = useState("");
    const [fecha,setFecha] = useState("");
    const [barrio,setBarrio] = useState("");
    const [descripcion,setDescripcion] = useState("");

    const consultar = (e) =>{
        e.preventDefault();
        const vehiculo = vehiculos.find((v) => v.placa.toUpperCase() === placa.toUpperCase());
        if (vehiculo) {
           setFecha(vehiculo.fecha);
           setBarrio(vehiculo.barrio);
           setDescripcion(`El vehículo con placa ${vehiculo.placa} de color ${vehiculo.color} fue reportado en el barrio ${vehiculo.barrio}.`);
        }else{
            setFecha("");
            setBarrio("");
            setDescripcion("Vehiculo no encontrado.");
        }
  
    };

    return (
        <form className="verificar-vehiculo" onSubmit={consultar}>
            <div className="header">CONSULTA DE VEHICULO</div>
            <div className="fila">
                <input type="text" placeholder="Placa" value={placa} onChange={(e)=>setPlaca(e.target.value)}/>
                <button type="submit" className="btnConsultar">CONSULTAR</button>
            </div>

            <input type="text" placeholder="Fecha del robo" value={fecha} readOnly/>
            <input type="text" placeholder="Barrio" value={barrio} readOnly/>
            <textarea placeholder="Descripcion" value={descripcion} readOnly/>

        </form>
    );
}

export default VerificarVehiculo;