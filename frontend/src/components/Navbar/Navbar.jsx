import React, { useState } from "react"; // Importa React y useState
import SearchBar from "../SearchBar/SearchBar"; // Importa el componente SearchBar
import ProfileInfo from "../Cards/ProfileInfo"; // Importa el componente ProfileInfo
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const isToken = localStorage.getItem("token"); // Obtiene el token del almacenamiento local

  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const navigate = useNavigate(); // Inicializa useNavigate para navegar entre rutas

  // Función para manejar el logout
  const onLogout = () => {
    localStorage.clear(); // Limpia el almacenamiento local
    navigate("/login"); // Redirige al login
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    if (searchQuery) { // Verifica si hay una consulta de búsqueda
      onSearchNote(searchQuery); // Llama a la función onSearchNote con la consulta de búsqueda
    }
  };

  // Función para limpiar la búsqueda
  const onClearSearch = () => {
    handleClearSearch(); // Llama a la función handleClearSearch
    setSearchQuery(""); // Limpia el campo de búsqueda
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2> {/* Título de la barra de navegación */}

      {isToken && (
        <>
          {/* Muestra la barra de búsqueda y la información del perfil si hay un token */}
          <SearchBar
            value={searchQuery} // Valor del campo de búsqueda
            onChange={({ target }) => {
              setSearchQuery(target.value); // Actualiza el estado con el nuevo valor del campo de búsqueda
            }}
            handleSearch={handleSearch} // Maneja la búsqueda
            onClearSearch={onClearSearch} // Maneja la limpieza de la búsqueda
          />

          <ProfileInfo userInfo={userInfo} onLogout={onLogout} /> {/* Muestra la información del perfil y el botón de logout */}
        </>
      )}
    </div>
  );
};

export default Navbar; // Exporta el componente Navbar

