import React from 'react'; // Importa React para crear componentes
import ReactDOM from 'react-dom/client'; // Importa ReactDOM para renderizar el contenido
import App from './App.jsx'; // Importa el componente principal App
import './index.css'; // Importa los estilos globales

// Aquí es donde se crea la raíz y se renderiza el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* StrictMode ayuda a identificar problemas en la aplicación durante el desarrollo */}
    <App /> {/* Renderiza el componente App dentro de React.StrictMode */}
  </React.StrictMode>,
);

