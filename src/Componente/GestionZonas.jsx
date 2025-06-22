import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Estilos/GestionZonas.css';
import { useNavigate } from 'react-router-dom';

function GestionZonas() {
  const [zonas, setZonas] = useState([]);
  const [nombreBarrio, setNombreBarrio] = useState('');
  const [editando, setEditando] = useState(null);

  const url = "http://localhost:3001/zonas";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url).then((res) => setZonas(res.data));
  }, []);

  const agregarZona = () => {
    if (nombreBarrio.trim() === '') return alert('El nombre del barrio es obligatorio');
    const nuevaZona = { nombreBarrio };
    axios.post(url, nuevaZona).then((res) => {
      setZonas([...zonas, res.data]);
      setNombreBarrio('');
    });
  };

  const eliminarZona = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta zona?')) {
      axios.delete(`${url}/${id}`).then(() => {
        setZonas(zonas.filter((z) => z.id !== id));
      });
    }
  };

  const iniciarEdicion = (zona) => {
    setEditando(zona);
    setNombreBarrio(zona.nombreBarrio);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNombreBarrio('');
  };

  const guardarEdicion = () => {
    if (nombreBarrio.trim() === '') return alert('El nombre del barrio es obligatorio');

    axios.put(`${url}/${editando.id}`, { ...editando, nombreBarrio }).then((res) => {
      setZonas(zonas.map((z) => (z.id === editando.id ? res.data : z)));
      setEditando(null);
      setNombreBarrio('');
    });
  };

  return (
    <div className="zonas-container">
      <h2>Gestión de Zonas</h2>

      {editando && (
        <p>Editando zona con ID: <strong>{editando.id}</strong></p>
      )}

      <input
        type="text"
        placeholder="Nombre del Barrio"
        value={nombreBarrio}
        onChange={(e) => setNombreBarrio(e.target.value)}
      />
      {editando ? (
        <>
          <button onClick={guardarEdicion}>Guardar Cambios</button>
          <button onClick={cancelarEdicion}>Cancelar</button>
        </>
      ) : (
        <button onClick={agregarZona}>Agregar Zona</button>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre del Barrio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {zonas.map((zona) => (
            <tr key={zona.id}>
              <td>{zona.id}</td>
              <td>{zona.nombreBarrio}</td>
              <td>
                <button onClick={() => iniciarEdicion(zona)}>Editar</button>
                <button onClick={() => eliminarZona(zona.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/PanelAdmin')}>Volver al Panel de Administración</button>

    </div>
  );
}

export default GestionZonas;
