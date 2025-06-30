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

// ******** metodo GET *************

app.get('/usuarios', (req, res) => {
  try {
    const db = leerDB();

    if (!db || !Array.isArray(db.usuarios) || db.usuarios.length === 0) { // si no tiene nada la base de datos da un 404
      return res.status(404).json({ mensaje: 'Código 404: recurso no encontrado' });
    }

    res.json(db.usuarios);
  } catch (error) {
    console.error('Error al leer la base de datos:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error al leer la base de datos' });// error en leer la base de datos 
  }
});


//***********Metodo Post ************

app.post('/usuarios', (req, res) => {
  try {
    console.log('📥 Body recibido:', req.body);

    const { id, nombre, alias, telefono, direccion, email, contraseña } = req.body;

    // ─ Validación 400
    if (!id || !nombre || !alias || !telefono || !direccion || !email || !contraseña) {
      console.log('⚠️ Faltan campos obligatorios');
      return res.status(400).json({ mensaje: 'Código 400: cuerpo mal formulado' });
    }

    // ─ Validación 422
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{9,10}$/;

    if (!emailRegex.test(email)) {
      console.log('⚠️ Email inválido:', email);
      return res.status(422).json({ mensaje: 'Código 422: formato de email inválido' });
    }

    if (!telefonoRegex.test(telefono)) {
      console.log('⚠️ Teléfono inválido:', telefono);
      return res.status(422).json({ mensaje: 'Código 422: formato de teléfono inválido' });
    }

    if (contraseña.length < 4) {
      console.log('⚠️ Contraseña demasiado corta');
      return res.status(422).json({ mensaje: 'Código 422: la contraseña debe tener al menos 4 caracteres' });
    }

    const db = leerDB();
    const usuarios = db.usuarios;

    // ─ Validación 409
    const emailExiste = usuarios.some(u => u.email === email);
    const idExiste = usuarios.some(u => u.id === id);

    if (emailExiste) {
      console.log('⚠️ Email duplicado:', email);
      return res.status(409).json({ mensaje: 'Código 409: el email ya existe' });
    }

    if (idExiste) {
      console.log('⚠️ ID duplicado:', id);
      return res.status(409).json({ mensaje: 'Código 409: el ID ya existe' });
    }

    const nuevo = {
      id: id.toString(),
      nombre,
      alias,
      telefono,
      direccion,
      email,
      contraseña
    };

    usuarios.push(nuevo);
    escribirDB(db);

    console.log('✅ Usuario guardado correctamente:', nuevo);
    res.status(201).json(nuevo);

  } catch (error) {
    console.error('❌ Error en POST /usuarios:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error con la base de datos' });
  }
});



//******metodo put*****

app.put('/usuarios/:id', (req, res) => {
  try {
    const { nombre, alias, telefono, direccion, email, contraseña } = req.body;
    const id = req.params.id;

    // ─ Validación 400: cuerpo mal formulado
    if (!nombre || !alias || !telefono || !direccion || !email || !contraseña) {
      return res.status(400).json({ mensaje: 'Código 400: cuerpo mal formulado, faltan campos' });
    }

    const db = leerDB();

    // ─ Búsqueda del usuario
    const index = db.usuarios.findIndex(u => u.id === id);
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Código 404: código de usuario no encontrado' });
    }

    // ─ Actualización
    db.usuarios[index] = { id, nombre, alias, telefono, direccion, email, contraseña };
    escribirDB(db);
    res.json(db.usuarios[index]);

  } catch (error) {
    console.error('Error al actualizar usuario:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error con la base de datos' });
  }
});



// ***************metodo delete ******************
app.delete('/usuarios/:id', (req, res) => {
  try {
    const id = req.params.id;
    const db = leerDB();
    const usuarios = db.usuarios;

    // ─ Buscar si el usuario existe
    const existe = usuarios.some(u => u.id === id);
    if (!existe) {
      console.log(`⚠️ Usuario con ID ${id} no encontrado`);
      return res.status(404).json({ mensaje: 'Código 404: no existe usuario con ese ID' });
    }

    // ─ Eliminar usuario
    db.usuarios = usuarios.filter(u => u.id !== id);
    escribirDB(db);

    console.log(`🗑️ Usuario con ID ${id} eliminado`);
    res.sendStatus(204); // No Content

  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error con la base de datos' });
  }
});


// ─────────── zonas ───────────


//******** METODOD GET  */

app.get('/zonas', (req, res) => {
  try {
    const db = leerDB();

    if (!db || !Array.isArray(db.zonas) || db.zonas.length === 0) {
      console.log('⚠️ No hay zonas registradas');
      return res.status(404).json({ mensaje: 'Código 404: no existen zonas registradas' });
    }

    console.log(`📤 Se enviaron ${db.zonas.length} zonas`);
    res.json(db.zonas);

  } catch (error) {
    console.error('❌ Error al leer las zonas:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error con la base de datos' });
  }
});


//******** METODOD POST  */
app.post('/zonas', (req, res) => {
  try {
    const { id, nombreBarrio } = req.body;

    // ─ Validación 400: falta de datos
    if (!id || !nombreBarrio) {
      console.log('⚠️ Falta id o nombreBarrio');
      return res.status(400).json({ mensaje: 'Código 400: cuerpo mal formulado' });
    }

    const db = leerDB();
    const zonas = db.zonas;

    // ─ Validación 409: nombre duplicado o ID duplicado
    const yaExiste = zonas.some(z => z.nombreBarrio === nombreBarrio);
    const idExiste = zonas.some(z => z.id === id);

    if (yaExiste) {
      console.log('⚠️ Zona duplicada:', nombreBarrio);
      return res.status(409).json({ mensaje: 'Código 409: la zona ya existe' });
    }

    if (idExiste) {
      console.log('⚠️ ID duplicado:', id);
      return res.status(409).json({ mensaje: 'Código 409: el ID ya existe' });
    }

    const nuevaZona = { id: id.toString(), nombreBarrio };
    zonas.push(nuevaZona);
    escribirDB(db);

    console.log('✅ Zona registrada:', nuevaZona);
    res.status(201).json(nuevaZona);

  } catch (error) {
    console.error('❌ Error al registrar zona:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error con la base de datos' });
  }
});


//******** METODOD PUT  */
app.put('/zonas/:id', (req, res) => {
  try {
    const id = req.params.id;
    const { nombreBarrio } = req.body;

    // ─ Validación 400
    if (!nombreBarrio) {
      console.log('⚠️ Falta el campo nombreBarrio');
      return res.status(400).json({ mensaje: 'Código 400: cuerpo mal formulado' });
    }

    const db = leerDB();
    const zonas = db.zonas;

    // ─ Buscar zona por ID
    const index = zonas.findIndex(z => z.id === id);
    if (index === -1) {
      console.log(`⚠️ Zona con ID ${id} no encontrada`);
      return res.status(404).json({ mensaje: 'Código 404: zona no encontrada' });
    }

    // ─ Validar duplicado de nombre (evitar cambiar a un nombre ya usado por otra zona)
    const nombreYaUsado = zonas.some((z, i) => z.nombreBarrio === nombreBarrio && i !== index);
    if (nombreYaUsado) {
      console.log(`⚠️ nombreBarrio duplicado: ${nombreBarrio}`);
      return res.status(409).json({ mensaje: 'Código 409: el nombre de barrio ya existe' });
    }

    // ─ Actualizar
    zonas[index].nombreBarrio = nombreBarrio;
    escribirDB(db);

    console.log('✅ Zona actualizada:', zonas[index]);
    res.json(zonas[index]);

  } catch (error) {
    console.error('❌ Error al actualizar zona:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error con la base de datos' });
  }
});


//******** METODOD DELETE  */
app.delete('/zonas/:id', (req, res) => {
  try {
    const id = req.params.id;
    const db = leerDB();
    const zonas = db.zonas;

    // ─ Verificar si existe la zona
    const existe = zonas.some(z => z.id === id);
    if (!existe) {
      console.log(`⚠️ Zona con ID ${id} no encontrada`);
      return res.status(404).json({ mensaje: 'Código 404: zona no encontrada' });
    }

    // ─ Eliminar zona
    db.zonas = zonas.filter(z => z.id !== id);
    escribirDB(db);

    console.log(`🗑️ Zona con ID ${id} eliminada`);
    res.sendStatus(204); // No Content

  } catch (error) {
    console.error('❌ Error al eliminar zona:', error.message);
    res.status(500).json({ mensaje: 'Código 500: error con la base de datos' });
  }
});


// puerto

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});