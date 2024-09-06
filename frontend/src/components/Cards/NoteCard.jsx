import moment from "moment"; // Importa la biblioteca moment para manejar fechas
import React from "react"; // Importa React para crear componentes
import { MdOutlinePushPin } from "react-icons/md"; // Importa el ícono de pin
import { MdCreate, MdDelete } from "react-icons/md"; // Importa íconos de crear y eliminar

// Componente funcional NoteCard que recibe props para mostrar una nota
const NoteCard = ({
  title,       // Título de la nota
  date,        // Fecha de creación o modificación de la nota
  content,     // Contenido de la nota
  tags,        // Etiquetas asociadas a la nota
  isPinned,    // Estado de si la nota está fijada o no
  onEdit,      // Función para editar la nota
  onDelete,    // Función para eliminar la nota
  onPinNote    // Función para fijar o des-fijar la nota
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      {/* Contenedor de la nota con sombra al pasar el ratón */}
      <div className="flex items-center justify-between">
        {/* Contenedor del título y la fecha */}
        <div>
          <h6 className="text-sm font-medium">{title}</h6> {/* Muestra el título */}
          <span className="text-xs text-slate-500">
            {/* Muestra la fecha formateada usando moment */}
            {date ? moment(date).format('Do MMM YYYY') : '-'}
          </span>
        </div>

        {/* Icono de pin para fijar o des-fijar la nota */}
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? 'text-primary' : 'text-slate-300'}`}
          onClick={onPinNote} // Llama a la función onPinNote al hacer clic
        />
      </div>

      {/* Muestra una vista previa del contenido */}
      <p className="text-xs text-slate-600 mt-2">
        {content?.slice(0, 60)} {/* Muestra los primeros 60 caracteres del contenido */}
      </p>

      <div className="flex items-center justify-between mt-2">
        {/* Muestra las etiquetas */}
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)} {/* Mapea las etiquetas y las muestra */}
        </div>

        {/* Contenedor de los botones de editar y eliminar */}
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit} // Llama a la función onEdit al hacer clic
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete} // Llama a la función onDelete al hacer clic
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard; // Exporta el componente NoteCard

