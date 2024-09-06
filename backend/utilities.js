const jwt = require('jsonwebtoken')

// Función para autenticar el token
function authenticateToken(req, res, next) {
  // Obtiene el encabezado de autorización
  const authHeader = req.headers["authorization"];
  // Extrae el token del encabezado
  const token = authHeader && authHeader.split(" ")[1];

  // Si no hay token, devuelve un estado 401 (No autorizado)
  if (!token) return res.sendStatus(401);

  // Verifica el token usando la clave secreta
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // Si hay un error en la verificación, devuelve un estado 401
    if (err) return res.sendStatus(401);
    // Agrega el usuario al objeto de la solicitud
    req.user = user;
    // Llama al siguiente middleware
    next();
  });
}

// Exporta la función para su uso en otros módulos
module.exports = {
  authenticateToken,
};

