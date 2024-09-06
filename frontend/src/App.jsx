import "./App.css"; // Trae los estilos para el componente App
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Para manejar el enrutamiento en React
import Home from "./pages/Home/Home"; // Página principal (Home)
import Login from "./pages/Login/Login"; // Página de login
import SignUp from "./pages/SignUp/SignUp"; // Página de registro

function App() {
  return (
    <div>
      <Router> {/* Configuración del enrutamiento */}
        <Routes>
          <Route path="/" element={<Root />} /> {/* Ruta inicial */}
          <Route path="/dashboard" exact element={<Home />} /> {/* Ruta para Home */}
          <Route path="/login" exact element={<Login />} /> {/* Ruta para Login */}
          <Route path="/signUp" exact element={<SignUp />} /> {/* Ruta para SignUp */}
        </Routes>
      </Router>
    </div>
  );
}

// Componente Root para manejar redirección inicial
const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Chequea si hay token en localStorage

  return isAuthenticated ? (
    <Navigate to="/dashboard" /> // Redirige a dashboard si está autenticado
  ) : (
    <Navigate to="/login" /> // Redirige a login si no está autenticado
  );
};

export default App; // Exporta el componente App para que pueda ser usado en otros archivos

