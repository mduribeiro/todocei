import axios from "axios"; // Importa la biblioteca axios para manejar solicitudes HTTP
import { BASE_URL } from "./constants"; // Importa la URL base desde un archivo de constantes

// Crea una instancia de axios con configuración predeterminada
const axiosInstance = axios.create({
  baseURL: BASE_URL, // Configura la URL base para todas las solicitudes
  timeout: 10000, // Define un tiempo de espera de 10 segundos para las solicitudes
  headers: {
    "Content-Type": "application/json", // Establece el tipo de contenido para las solicitudes
  },
});

// Añade un interceptor para las solicitudes
axiosInstance.interceptors.request.use(
  (config) => {
    // Obtiene el token de acceso del almacenamiento local
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      // Si hay un token, lo agrega al encabezado Authorization
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config; // Devuelve la configuración de la solicitud
  },
  (error) => {
    // Maneja los errores en la solicitud
    return Promise.reject(error);
  }
);

export default axiosInstance; // Exporta la instancia de axios para usarla en otras partes de la aplicación

