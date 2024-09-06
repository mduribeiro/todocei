import React, { useState } from "react"; // Importa React y el hook useState
import Navbar from "../../components/Navbar/Navbar"; // Importa el componente Navbar
import PasswordInput from "../../components/Input/PasswordInput"; // Importa el componente PasswordInput
import axiosInstance from "../../utils/axiosInstance"; // Importa la instancia de Axios
import { validateEmail } from "../../utils/helper"; // Importa la función de validación de emails
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate para la navegación

// Componente para el inicio de sesión
const Login = () => {
  // Estados para manejar los datos del formulario y los errores
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para manejar errores

  // Hook para la navegación
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

    // Validación del email
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validación de la contraseña
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(''); // Limpia los errores

    try {
      // Llamada a la API para el inicio de sesión
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      
      // Manejo de la respuesta de inicio de sesión exitosa
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken); // Guarda el token en el almacenamiento local
        navigate('/dashboard'); // Redirige al dashboard
      }

    } catch (error) {
      // Manejo de errores en el inicio de sesión
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Muestra el mensaje de error
      } else {
        setError("An unexpected error occurred. Please try again."); // Mensaje de error general
      }
    }
  };

  return (
    <>
      {/* Componente de la barra de navegación */}
      <Navbar />

      {/* Contenedor del formulario de inicio de sesión */}
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

            {/* Campo de entrada para el email */}
            <input 
              type="text" 
              placeholder="Email" 
              className="input-box" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            {/* Campo de entrada para la contraseña */}
            <PasswordInput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Mensaje de error */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            {/* Botón de inicio de sesión */}
            <button type="submit" className="btn-primary">Login</button>

            {/* Enlace para crear una cuenta */}
            <p className="text-sm text-center mt-4">
              Not registered yet? <Link to='/signUp' className="font-medium text-primary underline">Create an Account</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login; // Exporta el componente Login

