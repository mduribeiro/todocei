/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Ruta al archivo HTML principal para incluir en el análisis de Tailwind CSS
    "./src/**/*.{js,ts,jsx,tsx}", // Rutas a todos los archivos JavaScript, TypeScript, JSX y TSX en el directorio 'src'
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"], // Configura la fuente para los elementos de tipo 'display' usando Poppins y una fuente sans-serif como respaldo
    },
    extend: {
      // Colores utilizados en el proyecto
      colors: {
        primary: "#2B85FF", // Color primario con código hexadecimal
        secondary: "#EF863E", // Color secundario con código hexadecimal
      }
    },
  },
  plugins: [], // Lista de plugins adicionales para Tailwind CSS (vacío en este caso)
}


