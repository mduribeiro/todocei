import React from "react"; // Importa React
import { FaMagnifyingGlass } from "react-icons/fa6"; // Importa el ícono de búsqueda
import { IoMdClose } from "react-icons/io"; // Importa el ícono de cerrar

// Componente SearchBar
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md"> {/* Contenedor de la barra de búsqueda */}
      <input
        type="text" // Tipo de entrada de texto
        placeholder="Search Notes" // Texto de marcador de posición
        className="w-full text-xs bg-transparent py-[11px] outline-none" // Estilo del campo de entrada
        value={value} // Valor del campo de entrada
        onChange={onChange} // Función para manejar el cambio en el campo de entrada
      />

      {/* Muestra el ícono de cerrar si hay valor en el campo de entrada */}
      {value && <IoMdClose className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3" onClick={onClearSearch} />}

      {/* Ícono de búsqueda */}
      <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar; // Exporta el componente SearchBar

