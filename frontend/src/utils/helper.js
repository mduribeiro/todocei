// Función para validar si una cadena es una dirección de correo electrónico válida
export const validateEmail = (email) => {
  // Expresión regular que define el formato básico de un correo electrónico
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Devuelve verdadero si el correo cumple con el formato de la expresión regular, falso en caso contrario
  return regex.test(email);
};

// Función para obtener las iniciales de un nombre
export const getInitials = (name) => {
  // Si el nombre está vacío o no se proporciona, devuelve una cadena vacía
  if (!name) return "";
  
  // Divide el nombre en palabras usando el espacio como delimitador
  const words = name.split(" ");
  
  // Inicializa una variable para almacenar las iniciales
  let initials = "";

  // Recorre hasta las primeras dos palabras (si hay menos de dos palabras, recorre solo las que hay)
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    // Agrega la primera letra de cada palabra a la variable de iniciales
    initials += words[i][0];
  }

  // Devuelve las iniciales en mayúsculas
  return initials.toUpperCase();
};

