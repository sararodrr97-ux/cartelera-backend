const mongoose = require("mongoose");

// Esquema del usuario: nombre, correo electrónico (único) y contraseña
const esquemaUsuario = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
});

const Usuario = mongoose.model("Usuario", esquemaUsuario, "usuarios");

module.exports = Usuario;
