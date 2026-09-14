const express = require("express");
const router = express.Router();

const Pelicula = require("../modelos/Pelicula");

// Obtener todas las películas
router.get("/", async (req, res) => {
  const peliculas = await Pelicula.find();
  res.json(peliculas);
});

// Crear una película
router.post("/", async (req, res) => {
  const { titulo, genero, año, imageUrl, sinopsis } = req.body;

  // Validar campos obligatorios
  if (!titulo || !genero || !año) {
    return res.status(400).json({ error: "Faltan campos obligatorios: titulo, genero y año" });
  }

  const nuevaPelicula = new Pelicula({ titulo, genero, año, imageUrl, sinopsis });
  await nuevaPelicula.save();

  res.status(201).json(nuevaPelicula);
});

// Editar una película
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, genero, año, imageUrl, sinopsis } = req.body;

  // Actualizar solo los campos que vengan en el body
  const pelicula = await Pelicula.findByIdAndUpdate(
    id,
    { titulo, genero, año, imageUrl, sinopsis },
    { new: true, omitUndefined: true }
  );

  if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  res.json(pelicula);
});

// Borrar una película
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const pelicula = await Pelicula.findByIdAndDelete(id);

  if (!pelicula) {
    return res.status(404).json({ error: "Película no encontrada" });
  }

  res.json({ mensaje: "Película eliminada correctamente" });
});

module.exports = router;
