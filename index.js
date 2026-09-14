const express = require("express");
const rutasUsuarios = require("./rutas/usuarios");
const rutasPeliculas = require("./rutas/peliculas");

const app = express();
const PUERTO = 3000;

// Permitir peticiones CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//leer JSON en el body de las peticiones
app.use(express.json());

// Rutas de usuarios
app.use("/usuarios", rutasUsuarios);

// Rutas de películas
app.use("/peliculas", rutasPeliculas);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
