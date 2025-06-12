import React, {useState} from "react";
import '../Estilos/VerificarVehiculo.css';
import { useNavigate } from "react-router-dom";

function VerificarVehiculo({vehiculos,consultas,setConsultas}) {
    const navigate = useNavigate();
    
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
           setDescripcion(`El vehículo con placa ${vehiculo.placa} de color ${vehiculo.color} fue reportado como robado en el barrio ${vehiculo.barrio}.`);
           const nuevaConsulta = { //Se añadio esta nueva parte del codigo
            placa: vehiculo.placa,
            fecha: vehiculo.fecha,
            alerta: true
           };
           setConsultas((prev)=>{
            //Nueva parte de codigo para que no se sobre escriba la consulta cuando se renderice
            const actualiza= [...prev,nuevaConsulta];
            localStorage.setItem("consultas",JSON.stringify(actualiza));
            return actualiza;
        });
        }else{
            setFecha("");
            setBarrio("");
            setDescripcion("Vehiculo no encontrado.");
            const nuevaConsulta = { 
                placa: placa.toUpperCase(),
                fecha: new Date().toLocaleDateString(),
                alerta: false

            };
            setConsultas((prev)=>{
            //Nueva parte de codigo para que no se sobre escriba la consulta cuando se renderice
            const actualiza= [...prev,nuevaConsulta];
            localStorage.setItem("consultas",JSON.stringify(actualiza));
            return actualiza;
        });
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
            <button type="button" className="btnRegresar" onClick={()=>navigate("/Inicio")}>Volver al Inicio</button> 

        </form>
    );
}

export default VerificarVehiculo;