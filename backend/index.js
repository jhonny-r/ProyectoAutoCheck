const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DB_PATH = './db.json';

function leerDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function escribirDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// ─────────── VEHICULOS ───────────
app.get('/vehiculos', (req, res) => {
  const db = leerDB();
  res.json(db.vehiculos);
});

app.post('/vehiculos', (req, res) => {
  const db = leerDB();
  const nuevo = { id: Date.now().toString(), ...req.body };
  db.vehiculos.push(nuevo);
  escribirDB(db);
  res.status(201).json(nuevo);
});

app.put('/vehiculos/:id', (req, res) => {
  const db = leerDB();
  const id = req.params.id;
  const index = db.vehiculos.findIndex(v => v.id === id);
  if (index === -1) return res.status(404).send("Vehículo no encontrado");

  db.vehiculos[index] = { id, ...req.body };
  escribirDB(db);
  res.json(db.vehiculos[index]);
});

app.delete('/vehiculos/:id', (req, res) => {
  const db = leerDB();
  db.vehiculos = db.vehiculos.filter(v => v.id !== req.params.id);
  escribirDB(db);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});