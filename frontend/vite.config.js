import { defineConfig } from 'vite' // Importa la función defineConfig de Vite para definir la configuración
import react from '@vitejs/plugin-react' // Importa el plugin de React para Vite

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Configura el plugin de React para usar en el proyecto
})

