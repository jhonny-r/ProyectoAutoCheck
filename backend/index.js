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