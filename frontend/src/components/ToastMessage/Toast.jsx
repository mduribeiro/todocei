import React, { useState, useEffect } from "react"; // Importa React y hooks
import { MdDeleteOutline } from "react-icons/md"; // Importa ícono de eliminar
import { LuCheck } from "react-icons/lu"; // Importa ícono de verificar

const Toast = ({ isShown, message, type, onClose }) => {
  // Hook de efecto para manejar el cierre automático del toast
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose(); // Llama a la función para cerrar el toast después de 3 segundos
    }, 3000);

    return () => {
      clearTimeout(timeoutId); // Limpia el timeout cuando el componente se desmonte
    };
  }, [onClose]); // Dependencia en onClose

  return (
    <>
      <div
        className={`absolute top-20 right-6 transition-all duration-400 ${
          isShown ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
            type === "delete" ? "after:bg-red-500" : "after:bg-green-500"
          } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
        >
          <div className="flex items-center gap-3 py-2 px-4">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                type === "delete" ? "bg-red-50" : "bg-green-50"
              }`}
            >
              {type === "delete" ? (
                <MdDeleteOutline className="text-xl text-red-500" /> // Ícono para tipo 'delete'
              ) : (
                <LuCheck className="text-xl text-green-500" /> // Ícono para otro tipo
              )}
            </div>

            <p className="text-sm text-slate-800">{message}</p> {/* Mensaje del toast */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast; // Exporta el componente Toast

