import React from "react";

function Usuario(props) {

const { nombre, email, contraseña } = props;

    return (
        <div>
            <p>id: {id}</p>
            <p>Nombre: {nombre}</p>
            <p>Alias: {alias}</p>
            <p>Telefono: {telefono}</p>
            <p>Direccion: {direccion}</p>
            <p>Email: {email}</p>
            <p>Contraseña: {contraseña}</p>
        </div>
    );
}

export default Usuario;
