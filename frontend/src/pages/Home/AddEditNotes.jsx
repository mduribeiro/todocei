import React, { useState } from "react"; // Importa React y el hook useState
import TagInput from "../../components/Input/TagInput"; // Importa el componente TagInput
import { MdClose } from "react-icons/md"; // Importa el ícono de cerrar
import axiosInstance from "../../utils/axiosInstance"; // Importa la instancia de Axios

// Componente para agregar o editar notas
const AddEditNotes = ({
  noteData, // Datos de la nota para editar, si los hay
  type, // Tipo de operación: 'add' para agregar, 'edit' para editar
  onClose, // Función para cerrar el formulario
  showToastMessage, // Función para mostrar mensajes de tostada
  getAllNotes, // Función para obtener todas las notas
}) => {
  // Estados para manejar los datos del formulario
  const [title, setTitle] = useState(noteData?.title || ""); // Título de la nota
  const [content, setContent] = useState(noteData?.content || ""); // Contenido de la nota
  const [tags, setTags] = useState(noteData?.tags || []); // Etiquetas de la nota

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Función para agregar una nueva nota
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully"); // Muestra mensaje de éxito
        getAllNotes(); // Actualiza la lista de notas
        onClose(); // Cierra el formulario
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Muestra mensaje de error del servidor
      } else {
        setError("An unexpected error occurred. Please try again."); // Mensaje de error genérico
      }
    }
  };

  // Función para editar una nota existente
  const editNote = async () => {
    const noteId = noteData._id; // Obtiene el ID de la nota

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully", 'update'); // Muestra mensaje de éxito
        getAllNotes(); // Actualiza la lista de notas
        onClose(); // Cierra el formulario
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Muestra mensaje de error del servidor
      } else {
        setError("An unexpected error occurred. Please try again."); // Mensaje de error genérico
      }
    }
  };

  // Función para manejar la adición o edición de una nota
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title"); // Verifica que el título no esté vacío
      return;
    }

    if (!content) {
      setError("Please enter the content"); // Verifica que el contenido no esté vacío
      return;
    }

    setError(""); // Limpia cualquier mensaje de error

    if (type === 'edit') {
      editNote(); // Llama a la función para editar la nota
    } else {
      addNewNote(); // Llama a la función para agregar una nueva nota
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" /> {/* Ícono para cerrar el formulario */}
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5" // Texto de ejemplo en el campo
          value={title}
          onChange={({ target }) => setTitle(target.value)} // Actualiza el estado del título
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content" // Texto de ejemplo en el campo
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)} // Actualiza el estado del contenido
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} /> {/* Componente para manejar etiquetas */}
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>} {/* Muestra mensaje de error si existe */}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote} // Llama a la función para agregar o editar la nota
      >
        {type === 'add' ? "ADD" : "Update"} {/* Texto del botón según el tipo */}
      </button>
    </div>
  );
};

export default AddEditNotes; // Exporta el componente AddEditNotes

