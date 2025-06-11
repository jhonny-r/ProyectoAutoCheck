import React from "react";
import '../Estilos/MapaReportes.css';

function MapaReportes() {


    return (

        <div className="mapa-reportes-container">
            <h1> Mapa de Reportes</h1>
    <iframe
  class="mapa-redondeado"
  src="https://www.openstreetmap.org/export/embed.html?bbox=-78.48%2C0.17%2C-78.45%2C0.19&layer=mapnik&marker=0.1807,-78.4678">
</iframe>

<div className="mapa-reportes-listas">
  <h2>Barrios más peligrosos</h2>
  
</div>


        </div>
    );
}

export default MapaReportes;