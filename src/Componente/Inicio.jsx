import React from "react";
import LogoAzul from '../Imagenes/LogoAzul.svg';


function Inicio() {


    return (
        <div>
            <img src={LogoAzul} alt="Logo AutoCheck" style={{ width: '200px' }} />
            <h1>Bienvenido al inicio</h1>
        </div>
    );
}

export default Inicio;