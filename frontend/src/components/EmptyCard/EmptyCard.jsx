import React from "react"; // Importa React para usar JSX

// Componente funcional EmptyCard que muestra una tarjeta vacía
const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20"> {/* Contenedor con flexbox para centrar el contenido vertical y horizontalmente */}
      <img src={imgSrc} alt="No notes" className="w-60" /> {/* Imagen mostrada en la tarjeta, su tamaño es de 60 unidades de ancho */}

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5"> {/* Texto centrado con tamaño de fuente pequeño */}
        {message} {/* Mensaje a mostrar en la tarjeta vacía */}
      </p>
    </div>
  );
};

export default EmptyCard; // Exporta el componente EmptyCard para usarlo en otras partes de la aplicación

