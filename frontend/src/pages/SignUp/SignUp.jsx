import React, { useState } from "react"; // Importa React y el hook useState
import Navbar from "../../components/Navbar/Navbar"; // Importa el componente Navbar
import PasswordInput from "../../components/Input/PasswordInput"; // Importa el componente PasswordInput
import { Link, useNavigate } from "react-router-dom"; // Importa Link y useNavigate para la navegación
import { validateEmail } from "../../utils/helper"; // Importa la función para validar emails
import axiosInstance from "../../utils/axiosInstance"; // Importa la instancia de Axios

// Componente para el registro de usuario
const SignUp = () => {
  // Estados para manejar los datos del formulario y los errores
  const [name, setName] = useState(""); // Estado para el nombre
  const [email, setEmail] = useState(""); // Estado para el email
  const [password, setPassword] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para manejar errores

  // Hook para la navegación
  const navigate = useNavigate();

  // Función para manejar el registro de usuario
  const handleSignUp = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

    // Validaciones de los campos del formulario
    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError(''); // Limpia los errores

    try {
      // Llamada a la API para registrar un nuevo usuario
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      
      // Manejo de la respuesta exitosa del registro
      if (response.data && response.data.error) {
        setError(response.data.message); // Muestra el mensaje de error si lo hay
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken); // Guarda el token en el almacenamiento local
        navigate('/dashboard'); // Redirige al dashboard
      }

    } catch (error) {
      // Manejo de errores en el registro
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

      {/* Contenedor del formulario de registro */}
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>

            {/* Campo de entrada para el nombre */}
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Campo de entrada para el email */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Campo de entrada para la contraseña */}
            <PasswordInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Mensaje de error */}
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            {/* Botón para crear la cuenta */}
            <button type="submit" className="btn-primary">Create Account</button>

            {/* Enlace para iniciar sesión si ya se tiene una cuenta */}
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp; // Exporta el componente SignUp

