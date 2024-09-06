import React, { useState } from "react"; // Importa React y useState
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // Importa íconos para mostrar/ocultar la contraseña

// Componente PasswordInput para campo de entrada de contraseña
const PasswordInput = ({ value, onChange, placeholder }) => {
  // Estado para controlar la visibilidad de la contraseña
  const [isShowPassword, setIsShowPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword); // Cambia el estado para mostrar/ocultar la contraseña
  };

  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3"> {/* Contenedor del input con estilos */}
      
      <input
        value={value} // Valor del input, pasa desde el componente padre
        onChange={onChange} // Función para manejar cambios en el input
        type={isShowPassword ? "text" : "password"} // Tipo del input cambia entre texto y contraseña
        placeholder={placeholder || "Password"} // Texto del placeholder
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none" // Estilos del input
      />

      {/* Mostrar icono dependiendo de si la contraseña está visible o no */}
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer" // Icono para mostrar la contraseña
          onClick={() => toggleShowPassword()} // Alterna la visibilidad de la contraseña al hacer clic
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer" // Icono para ocultar la contraseña
          onClick={() => toggleShowPassword()} // Alterna la visibilidad de la contraseña al hacer clic
        />
      )}
    </div>
  );
};

export default PasswordInput; // Exporta el componente para que pueda ser utilizado en otros lugares

