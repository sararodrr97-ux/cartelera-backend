const express = require("express");
const router = express.Router();

// Base de datos temporal en memoria
const usuarios = [];

// Crear un nuevo usuario
router.post("/registro", (req, res) => {
  const { nombre, email, contraseña } = req.body;

  // Validar que vienen todos los campos
  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ error: "Faltan campos obligatorios: nombre, email y contraseña" });
  }

  // comprobar que el email no está ya registrado
  const usuarioExistente = usuarios.find((u) => u.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ error: "Ya existe un usuario con ese email" });
  }

  //Guardar el nuevo usuario
  const nuevoUsuario = { nombre, email,  contraseña };
  usuarios.push(nuevoUsuario);

  res.status(201).json({ mensaje: "Usuario registrado correctamente" });
});

// inicia sesión con email y contraseña
router.post("/login", (req, res) => {
  const { email, contraseña } = req.body;

  // Valida los campos
  if (!email || !contraseña) {
    return res.status(400).json({ error: "Faltan campos obligatorios: email y contraseña" });
  }

  // Buscar el usuario
  const usuario = usuarios.find((u) => u.email === email && u.contraseña === contraseña);
  if (!usuario) {
    return res.status(401).json({ error: "Email o contraseña incorrectos" });
  }

  res.sendStatus(200);
});

module.exports = router;
