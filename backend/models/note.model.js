// Importa mongoose para manejar la base de datos MongoDB
const mongoose = require("mongoose");

// Define el esquema (schema) que usaremos para la colección "notes"
const Schema = mongoose.Schema;

// Crea un nuevo esquema para las notas
const noteSchema = new Schema({
  // Campo para el título de la nota, de tipo String y obligatorio
  title: { type: String, required: true },
  // Campo para el contenido de la nota, de tipo String y obligatorio
  content: { type: String, required: true },
  // Campo para las etiquetas de la nota, de tipo Array de Strings y con valor por defecto como un array vacío
  tags: { type: [String], default: [] },
  // Campo para indicar si la nota está fijada, de tipo Booleano y con valor por defecto como false
  isPinned: { type: Boolean, default: false },
  // Campo para el ID del usuario al que pertenece la nota, de tipo String y obligatorio
  userId: { type: String, required: true },
  // Campo para la fecha de creación de la nota, de tipo Date y con valor por defecto como la fecha y hora actual
  createdOn: { type: Date, default: new Date().getTime() },
});

// Exporta el modelo "Note" basado en el esquema definido
module.exports = mongoose.model("Note", noteSchema);

