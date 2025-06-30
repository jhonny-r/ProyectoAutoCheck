const express = require('express'); // Framework para crear el servidor
const fs = require('fs'); // Módulo para manipular archivos
const cors = require('cors'); // Módulo para permitir peticiones desde otros orígenes
// Creamos una instancia de la app de Express y definimos el puerto
const app = express(); 
const PORT = 3001;

app.use(cors()); // Permite peticiones desde React
app.use(express.json()); // Permite recibir datos en formato JSON en el cuerpo de la petición

const DB_PATH = './db.json';

// Función para leer el contenido del archivo db.json y convertirlo en un objeto
function leerDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
// Función para escribir el objeto actualizado en db.json
function escribirDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ─────────── VEHICULOS ───────────
// Obtener todos los vehículos
app.get('/vehiculos', (req, res) => {
  try{
    const db = leerDB();
    res.json(db.vehiculos);
  } catch (err){
    res.status(500).json({error:"Error al leer la base de datos"});

  }
});

app.post('/vehiculos', (req, res) => {
  try{
    const { fecha, tipo, placa, marca, modelo, color, barrio } = req.body;
    if (!fecha || !tipo || !placa || !marca || !modelo || !color || !barrio) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const db = leerDB();
    const nuevo = {id: Date.now().toString(), ...req.body};
    db.vehiculos.push(nuevo);
    escribirDB(db);
    res.status(201).json(nuevo);

  }catch (err){
    res.status(500).json({error:"No se pudo crear el vehículo"});

  }
});

app.put('/vehiculos/:id', (req, res) => {
  try {
    const db = leerDB();
    const id = req.params.id;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Los campos de la solicitud estan vacíos" });
    }

    const index = db.vehiculos.findIndex(v => v.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    db.vehiculos[index] = { id, ...req.body };
    escribirDB(db);
    res.json(db.vehiculos[index]);
  } catch (err) {
    res.status(500).json({ error: "No se pudo actualizar el vehículo" });
  }
});

app.delete('/vehiculos/:id', (req, res) => {
   try {
    const db = leerDB();
    const antes = db.vehiculos.length;
    db.vehiculos = db.vehiculos.filter(v => v.id !== req.params.id);
    if (db.vehiculos.length === antes) return res.status(404).json({ error: "Vehículo no encontrado" });

    escribirDB(db);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "No se pudo eliminar el vehículo" });
  }
});

// ─────────── usuarios ───────────
app.get('/usuarios', (req, res) => {
  const db = leerDB();
  res.json(db.usuarios);
});

app.post('/usuarios', (req, res) => {
  const db = leerDB();
  const nuevo = { id: Date.now().toString(), ...req.body };
  db.usuarios.push(nuevo);
  escribirDB(db);
  res.status(201).json(nuevo);
});

app.put('/usuarios/:id', (req, res) => {
  const db = leerDB();
  const id = req.params.id;
  const index = db.usuarios.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).send("usuario no encontrado");

  db.usuarios[index] = { id, ...req.body };
  escribirDB(db);
  res.json(db.usuarios[index]);
});

app.delete('/usuarios/:id', (req, res) => {
  const db = leerDB();
  db.usuarios = db.usuarios.filter(v => v.id !== req.params.id);
  escribirDB(db);
  res.sendStatus(204);
});


// ─────────── zonas ───────────

app.get('/zonas', (req, res) => {
  const db = leerDB();
  res.json(db.zonas);
});

app.post('/zonas', (req, res) => {
  const db = leerDB();
  const nuevo = { id: Date.now().toString(), ...req.body };
  db.zonas.push(nuevo);
  escribirDB(db);
  res.status(201).json(nuevo);
});

app.put('/zonas/:id', (req, res) => {
  const db = leerDB();
  const id = req.params.id;
  const index = db.zonas.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).send("zona no encontrada");

  db.zonas[index] = { id, ...req.body };
  escribirDB(db);
  res.json(db.zonas[index]);
});

app.delete('/zonas/:id', (req, res) => {
  const db = leerDB();
  db.zonas = db.zonas.filter(v => v.id !== req.params.id);
  escribirDB(db);
  res.sendStatus(204);
});

// puerto

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});