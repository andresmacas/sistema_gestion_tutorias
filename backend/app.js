const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión a la base de datos establecida');
});

// Ruta de registro, rol 0 = estudainte; 1 = docente
app.post('/register', (req, res) => {
  const { email, id_rol, password, name, lastname } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (id_rol == null){
    id_rol = 0;
  }
  const user = {
    email,
    id_rol,
    name,
    lastname,
    password: hashedPassword,
  };

  connection.query('INSERT INTO users SET ?', user, (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
  });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta: ', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }

    const user = results[0];

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  });
});

// Ruta protegida (requiere autenticación)
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida accedida exitosamente' });
});

// Middleware para verificar el token de autenticación
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(403).json({ error: 'Token de autenticación no proporcionado' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    req.userId = decoded.userId;
    next();
  });
}

// Puerto de escucha
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
