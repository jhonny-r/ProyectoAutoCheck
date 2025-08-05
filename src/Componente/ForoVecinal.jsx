import React, { useState } from 'react';
import '../Estilos/Foro.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Imagenes/logo-autocheck.png';
import user1 from '../Imagenes/user1.png';
import user2 from '../Imagenes/user2.png';
import user3 from '../Imagenes/user3.png';
import userAnonimo from '../Imagenes/userAnonimo.png';
import moto from '../Imagenes/moto.png';

function ForoVecinal() {
  const navigate = useNavigate();
  
  // Estados para likes, respuestas y comentarios
  const [likes, setLikes] = useState({});
  const [showResponses, setShowResponses] = useState({});
  const [responses, setResponses] = useState({});
  const [newResponse, setNewResponse] = useState({});

  const handleLike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  const toggleResponses = (postId) => {
    setShowResponses(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddResponse = (postId) => {
    if (newResponse[postId]?.trim()) {
      setResponses(prev => ({
        ...prev,
        [postId]: [
          ...(prev[postId] || []),
          {
            id: Date.now(),
            text: newResponse[postId],
            author: 'Usuario',
            time: 'Ahora'
          }
        ]
      }));
      setNewResponse(prev => ({
        ...prev,
        [postId]: ''
      }));
    }
  };

  return (
    <div className="foro-container">
      {/* BARRA SUPERIOR GRIS */}
      <div className="foro-header">
        <div className="barra-header">
          <img src={logo} alt="Logo" className="logo-header" />
          <span className="texto-header">AutoCheck</span>
        </div>
      </div>

      {/* CONTENEDOR CON TITULO Y CONTROLES */}
      <div className="foro-header-row">
        <div className="contenido-col">
          <h1 className="foro-titulo">FORO VECINAL</h1>
          <p className="foro-subtitulo">Comparte y Mantente al tanto de lo que sucede en tu zona</p>
          <div className="foro-controles">
            <select className="zona-select">
              <option>La Floresta</option>
              <option>El Batán</option>
              <option>El Recreo</option>
            </select>
            <button className="publicar-btn" onClick={() => navigate("/NuevaEntradaForo")}>Nueva Publicación</button>
          </div>
        </div>

        {/* BOTÓN MOVIDO ABAJO A LA DERECHA */}
        <div className="btn-volver-container">
          <button className="volver-btn" onClick={() => navigate('/Inicio')}>⬅ Volver al Inicio</button>
        </div>
      </div>

      {/* PUBLICACIONES */}
      <div className="publicaciones-container">
        {/* Publicación 1 */}
        <div className="pub-card">
          <div className="pub-header">
            <img src={user1} alt="Antonio" className="pub-avatar" />
            <div className="pub-info">
              <h4 className="pub-autor">Antonio</h4>
              <p className="pub-meta">26 de abr. 15:30 • Sector Bosque</p>
            </div>
          </div>
          <div className="pub-content">
            <p className="pub-texto">Vi a alguien intentando abrir un auto blanco estacionado en la calle. ¿Alguien más lo notó?</p>
          </div>
          <div className="pub-stats">
            <span className="stat-item">👁️ 23 vistas</span>
            <span className="stat-item">💬 {(responses['post1'] || []).length} respuestas</span>
            <span className="stat-item">❤️ {likes['post1'] || 0} me gusta</span>
          </div>
          <div className="pub-actions">
            <button className="action-btn like-btn" onClick={() => handleLike('post1')}>
              ❤️ Me gusta
            </button>
            <button className="action-btn response-btn" onClick={() => toggleResponses('post1')}>
              💬 Responder
            </button>
            <button className="action-btn report-btn">
              🚩 Reportar
            </button>
          </div>
          
          {showResponses['post1'] && (
            <div className="responses-section">
              <div className="response-input">
                <input
                  type="text"
                  placeholder="Escribe tu respuesta..."
                  value={newResponse['post1'] || ''}
                  onChange={(e) => setNewResponse(prev => ({...prev, 'post1': e.target.value}))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddResponse('post1')}
                />
                <button onClick={() => handleAddResponse('post1')}>Enviar</button>
              </div>
              {(responses['post1'] || []).map(response => (
                <div key={response.id} className="response-item">
                  <strong>{response.author}:</strong> {response.text}
                  <span className="response-time">{response.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publicación 2 */}
        <div className="pub-card">
          <div className="pub-header">
            <img src={user2} alt="María" className="pub-avatar" />
            <div className="pub-info">
              <h4 className="pub-autor">María</h4>
              <p className="pub-meta">26 de abr. 17:30 • El Batán</p>
            </div>
          </div>
          <div className="pub-content">
            <p className="pub-texto">Les recomiendo a todos asegurar bien sus bicis si las dejan afuera.</p>
          </div>
          <div className="pub-stats">
            <span className="stat-item">👁️ 45 vistas</span>
            <span className="stat-item">💬 {(responses['post2'] || []).length} respuestas</span>
            <span className="stat-item">❤️ {likes['post2'] || 0} me gusta</span>
          </div>
          <div className="pub-actions">
            <button className="action-btn like-btn" onClick={() => handleLike('post2')}>
              ❤️ Me gusta
            </button>
            <button className="action-btn response-btn" onClick={() => toggleResponses('post2')}>
              💬 Responder
            </button>
            <button className="action-btn report-btn">
              🚩 Reportar
            </button>
          </div>
          
          {showResponses['post2'] && (
            <div className="responses-section">
              <div className="response-input">
                <input
                  type="text"
                  placeholder="Escribe tu respuesta..."
                  value={newResponse['post2'] || ''}
                  onChange={(e) => setNewResponse(prev => ({...prev, 'post2': e.target.value}))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddResponse('post2')}
                />
                <button onClick={() => handleAddResponse('post2')}>Enviar</button>
              </div>
              {(responses['post2'] || []).map(response => (
                <div key={response.id} className="response-item">
                  <strong>{response.author}:</strong> {response.text}
                  <span className="response-time">{response.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publicación 3 */}
        <div className="pub-card">
          <div className="pub-header">
            <img src={userAnonimo} alt="Anónimo" className="pub-avatar" />
            <div className="pub-info">
              <h4 className="pub-autor">Anónimo</h4>
              <p className="pub-meta">27 de abr. 11:30 • El Recreo</p>
            </div>
          </div>
          <div className="pub-content">
            <p className="pub-texto">Encontré esta moto abandonada en la esquina. Está bien deteriorada. ¿Alguien la reconoce?</p>
            <img src={moto} alt="Moto" className="pub-image" />
          </div>
          <div className="pub-stats">
            <span className="stat-item">👁️ 67 vistas</span>
            <span className="stat-item">💬 {(responses['post3'] || []).length} respuestas</span>
            <span className="stat-item">❤️ {likes['post3'] || 0} me gusta</span>
          </div>
          <div className="pub-actions">
            <button className="action-btn like-btn" onClick={() => handleLike('post3')}>
              ❤️ Me gusta
            </button>
            <button className="action-btn response-btn" onClick={() => toggleResponses('post3')}>
              💬 Responder
            </button>
            <button className="action-btn report-btn">
              🚩 Reportar
            </button>
          </div>
          
          {showResponses['post3'] && (
            <div className="responses-section">
              <div className="response-input">
                <input
                  type="text"
                  placeholder="Escribe tu respuesta..."
                  value={newResponse['post3'] || ''}
                  onChange={(e) => setNewResponse(prev => ({...prev, 'post3': e.target.value}))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddResponse('post3')}
                />
                <button onClick={() => handleAddResponse('post3')}>Enviar</button>
              </div>
              {(responses['post3'] || []).map(response => (
                <div key={response.id} className="response-item">
                  <strong>{response.author}:</strong> {response.text}
                  <span className="response-time">{response.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publicación 4 */}
        <div className="pub-card">
          <div className="pub-header">
            <img src={user3} alt="Antonio" className="pub-avatar" />
            <div className="pub-info">
              <h4 className="pub-autor">Antonio</h4>
              <p className="pub-meta">26 de abr. 15:30 • Sector Bosque</p>
            </div>
          </div>
          <div className="pub-content">
            <p className="pub-texto">Vi a alguien intentando abrir un auto blanco estacionado en la calle. ¿Alguien más lo notó?</p>
          </div>
          <div className="pub-stats">
            <span className="stat-item">👁️ 12 vistas</span>
            <span className="stat-item">💬 {(responses['post4'] || []).length} respuestas</span>
            <span className="stat-item">❤️ {likes['post4'] || 0} me gusta</span>
          </div>
          <div className="pub-actions">
            <button className="action-btn like-btn" onClick={() => handleLike('post4')}>
              ❤️ Me gusta
            </button>
            <button className="action-btn response-btn" onClick={() => toggleResponses('post4')}>
              💬 Responder
            </button>
            <button className="action-btn report-btn">
              🚩 Reportar
            </button>
          </div>
          
          {showResponses['post4'] && (
            <div className="responses-section">
              <div className="response-input">
                <input
                  type="text"
                  placeholder="Escribe tu respuesta..."
                  value={newResponse['post4'] || ''}
                  onChange={(e) => setNewResponse(prev => ({...prev, 'post4': e.target.value}))}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddResponse('post4')}
                />
                <button onClick={() => handleAddResponse('post4')}>Enviar</button>
              </div>
              {(responses['post4'] || []).map(response => (
                <div key={response.id} className="response-item">
                  <strong>{response.author}:</strong> {response.text}
                  <span className="response-time">{response.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <span>AutoCheck</span>
        <span>Juntos hacemos las calles más seguras</span>
      </footer>
    </div>
  );
}

export default ForoVecinal;
