const mongoose = require("mongoose");

// Esquema de la película: título, año, género, sinopsis e imagen de portada
const esquemaPelicula = new mongoose.Schema({
  titulo: { type: String, required: true },
  año: { type: Number, required: true },
  genero: { type: String, required: true },
  sinopsis: { type: String },
  imageUrl: { type: String },
});

const Pelicula = mongoose.model("Pelicula", esquemaPelicula, "peliculas");

module.exports = Pelicula;
