import React, { useState, useEffect } from 'react';
import '../Estilos/EditarPerfil.css';
import editarPerfil from '../Imagenes/editarPerfil.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarPerfil = ({ usuario, onClose, setUsuarioActivo }) => {
  const navigate = useNavigate();
  const [imagenPerfil, setImagenPerfil] = useState(editarPerfil);

  const [formData, setFormData] = useState({
    nombre: '',
    alias: '',
    telefono: '',
    email: '',
    direccion: '',
    contrasena: '',
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || '',
        alias: usuario.alias || '',
        telefono: usuario.telefono || '',
        email: usuario.email || '',
        direccion: usuario.direccion || '',
        contrasena: '',
      });
    }
  }, [usuario]);

  const manejarCambioImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenPerfil(e.target.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const datos = { ...formData };
      if (!datos.contrasena) {
        delete datos.contrasena;
      }

      const res = await axios.put(`http://localhost:8000/api/usuarios/${usuario._id}`, datos);

      // ✅ ACTUALIZAR el estado del usuario y localStorage
      setUsuarioActivo(res.data);
      localStorage.setItem("usuarioActivo", JSON.stringify(res.data));

      alert('Perfil actualizado correctamente');
      onClose(); // cerrar el modal
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Ocurrió un error al actualizar el perfil');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content perfil-modal" onClick={(e) => e.stopPropagation()}>
        <form className="perfil-form-modal" onSubmit={manejarSubmit}>
          <div className="modal-header">
            <h2>👤 Editar Perfil</h2>
            <button type="button" className="cerrar-btn" onClick={onClose}>✕</button>
          </div>

          {/* Avatar */}
          <div className="avatar-section-modal">
            <div className="avatar-container">
              <img src={imagenPerfil} alt="Avatar" className="avatar-modal" />
              <input
                type="file"
                accept="image/*"
                onChange={manejarCambioImagen}
                className="file-input"
                id="archivo-imagen"
              />
              <label htmlFor="archivo-imagen" className="upload-btn-modal">📷</label>
            </div>
          </div>

          {/* Campos */}
          <div className="form-grid-compact">
            <div className="form-field">
              <label>Nombre Completo</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={manejarCambio}
              />
            </div>
            <div className="form-field">
              <label>Alias</label>
              <input
                type="text"
                name="alias"
                value={formData.alias}
                onChange={manejarCambio}
              />
            </div>
            <div className="form-field">
              <label>Teléfono</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={manejarCambio}
              />
            </div>
            <div className="form-field">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={manejarCambio}
              />
            </div>
            <div className="form-field">
              <label>Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={manejarCambio}
              />
            </div>
            <div className="form-field">
              <label>Contraseña</label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={manejarCambio}
              />
            </div>
          </div>

          {/* Sección cambiar contraseña */}
          {mostrarCambiarPassword && (
            <div className="password-change-section">
              <div className="form-field">
                <label>Nueva Contraseña</label>
                <input type="password" placeholder="Nueva contraseña" />
              </div>
              <div className="form-field">
                <label>Confirmar Contraseña</label>
                <input type="password" placeholder="Confirmar contraseña" />
              </div>
              <div className="password-change-actions">
                <button type="button" className="btn-guardar-password" onClick={manejarGuardarPassword}>
                  Guardar
                </button>
                <button type="button" className="btn-cancelar-password" onClick={() => setMostrarCambiarPassword(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Botones del modal */}
          <div className="modal-buttons">
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
