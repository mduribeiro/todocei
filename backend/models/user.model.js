// Importa mongoose para manejar la base de datos MongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define el esquema para los usuarios
const userSchema = new Schema({
  fullName: { type: String }, // Nombre completo del usuario
  email: { type: String },    // Correo electrónico del usuario
  password: { type: String }, // Contraseña del usuario
  createdOn: { type: Date, default: new Date().getTime() }, // Fecha de creación del usuario
});

// Exporta el modelo "User" basado en el esquema definido
module.exports = mongoose.model("User", userSchema);

