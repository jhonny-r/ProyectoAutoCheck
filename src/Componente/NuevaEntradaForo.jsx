import React, { useState } from "react";
import "../Estilos/NuevaEntradaForo.css";
import { useNavigate } from "react-router-dom";

function NuevaEntradaForo() {
  const navigate = useNavigate();
  const [imagen, setImagen] = useState(null);

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos y la imagen a tu servidor o sistema
    console.log("Imagen seleccionada:", imagen);
    navigate("/ForoVecinal");
  };

  return (
    <div className="foro-container">
      <form className="foro-form" onSubmit={handleSubmit}>
        <div className="foro-header">NUEVA PUBLICACIÓN</div>

        <input type="text" placeholder="Nombre o Anónimo" />
        <input type="text" placeholder="Barrio o sector" />

  
        <textarea
          placeholder="Escribe aquí tu mensaje o alerta para los vecinos..."
          rows="6"
        ></textarea>

        <label className="label-file">
          
          <input type="file" accept="image/*" onChange={handleImagenChange} />
        </label>


        <button type="submit" className="btn-publicar">PUBLICAR</button>
        <button type="button" className="btn-cancelar" onClick={() => navigate('/ForoVecinal')}>CANCELAR</button>
      </form>
    </div>
  );
}

export default NuevaEntradaForo;
