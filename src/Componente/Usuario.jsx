import React from "react";

function Usuario(props) {

const { nombre, email, contraseña } = props;

    return (
        <div>
            <p>Nombre: {nombre}</p>
            <p>Email: {email}</p>
            <p>Contraseña: {contraseña}</p>
        </div>
    );
}

export default Usuario;
