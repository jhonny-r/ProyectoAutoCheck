import React from "react";
import LogoAzul from '../Imagenes/LogoAzul.svg';
import { Link } from "react-router-dom";


function Inicio({usuario}) {


    return (
        <div>
            <img src={LogoAzul} alt="Logo AutoCheck" style={{ width: '200px' }} />
            <h1>Bienvenido al inicio</h1>
            <Link to="/MiAutoCheck" className="btnInicio">Ir a Mi Auto Check</Link>
        </div>
    );
}

export default Inicio;