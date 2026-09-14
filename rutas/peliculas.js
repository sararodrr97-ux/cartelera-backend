const express = require("express");
const router = express.Router();

const peliculas = require("../peliculas");
let contadorId = peliculas.length + 1;

// Obtener todas las películas
router.get("/", (req, res) => {
  res.json(peliculas);
});

// Crear una película
router.post("/", (req, res) => {
  const { titulo, genero, año, imagen, sinopsis } = req.body;

  // Validar campos obligatorios
  if (!titulo || !genero || !año) {
    return res.status(400).json({ error: "Faltan campos obligatorios: titulo, genero y año" });
  }

  const nuevaPelicula = { id: contadorId++, titulo, genero, año, imagen, sinopsis };
  peliculas.push(nuevaPelicula);

  res.status(201).json(nuevaPelicula);
});

// Editar una película
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pelicula = peliculas.find((p) => p.id === id);

  if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  const { titulo, genero, año, imagen, sinopsis } = req.body;

  // Actualizar solo los campos que vengan en el body
  if (titulo) pelicula.titulo = titulo;
  if (genero) pelicula.genero = genero;
  if (año) pelicula.año = año;
  if (imagen) pelicula.imagen = imagen;
  if (sinopsis) pelicula.sinopsis = sinopsis;

  res.json(pelicula);
});

// Borrar una película
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = peliculas.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  peliculas.splice(indice, 1);

  res.json({ mensaje: "Película eliminada correctamente" });
});

module.exports = router;
