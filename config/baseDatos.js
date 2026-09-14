const mongoose = require("mongoose");

// Conecta la aplicación con la base de datos de Mongo
// La cadena de conexión y el nombre de la base de datos se leen de variables de entorno
async function conectarBaseDatos() {
  const uri = process.env.MONGO_URI;
  const nombreBaseDatos = process.env.MONGO_DB_NAME;

  await mongoose.connect(uri, { dbName: nombreBaseDatos });

  console.log(`Conectado a la base de datos de MongoDB (${nombreBaseDatos})`);
}

module.exports = conectarBaseDatos;
