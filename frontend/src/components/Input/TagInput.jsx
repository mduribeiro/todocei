import React, { useState } from "react"; // Importa React y useState
import { MdAdd, MdClose } from "react-icons/md"; // Importa íconos para añadir y cerrar

// Componente TagInput para gestionar etiquetas
const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState(""); // Estado para el valor del input

  // Maneja el cambio en el campo de entrada
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Actualiza el estado con el valor del input
  };

  // Añade una nueva etiqueta
  const addNewTag = () => {
    if (inputValue.trim() !== "") { // Verifica que el input no esté vacío
      setTags([...tags, inputValue.trim()]); // Agrega la nueva etiqueta a la lista
      setInputValue(""); // Limpia el campo de entrada
    }
  };

  // Maneja el evento de presionar una tecla
  const handleKeyDown = (e) => {
    if (e.key === "Enter") { // Si se presiona Enter, añade la etiqueta
      addNewTag();
    }
  };

  // Elimina una etiqueta
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove)); // Filtra la etiqueta a eliminar
  };

  return (
    <div>
      {/* Muestra las etiquetas si hay alguna */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              {/* Botón para eliminar la etiqueta */}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Campo de entrada y botón para añadir etiquetas */}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue} // Valor del campo de entrada
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          onChange={handleInputChange} // Maneja cambios en el campo de entrada
          onKeyDown={handleKeyDown} // Maneja eventos de tecla
          placeholder="Add tags" // Texto del placeholder
        />

        {/* Botón para añadir una nueva etiqueta */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={addNewTag} // Añade una etiqueta al hacer clic
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput; // Exporta el componente para usarlo en otros lugares

