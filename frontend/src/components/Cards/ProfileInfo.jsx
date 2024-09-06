import React from "react"; // Importa React para usar JSX
import { getInitials } from "../../utils/helper"; // Importa la función getInitials para obtener iniciales del nombre

// Componente funcional ProfileInfo que muestra la información del perfil
const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && ( // Verifica si userInfo existe
      <div className="flex items-center gap-3"> {/* Contenedor con espacio entre los elementos */}
        {/* Contenedor para las iniciales del usuario */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {/* Muestra las iniciales del nombre completo del usuario */}
          {getInitials(userInfo ? userInfo.fullName : "")}
        </div>

        <div>
          {/* Muestra el nombre completo del usuario */}
          <p className="text-sm font-medium">{userInfo.fullName || ""}</p>
          {/* Botón para cerrar sesión */}
          <button className="text-sm text-slate-700 underline" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo; // Exporta el componente ProfileInfo para usarlo en otras partes de la aplicación

