import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { authenticateUser, isLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = (event) => {
    event.preventDefault()

    //1. borramos el token de localstorage
    localStorage.removeItem("authToken")

    //2. actualizamos los estados del contexto
    authenticateUser() // esto intentará validar el token, pero al no existir, cambiar los estados a false y null

    //3. redireccionamos al usuario a alguna página publica
    navigate("/login")

  }

  return (
    <nav>

      <Link to="/">Home</Link>

      {isLoggedIn ? 
        <>
          <Link to="/private-page-example">Ejemplo Privado</Link>
          <Link onClick={handleLogout}>Cerrar sesión</Link>
        </>
        :
        <>
          <Link to="/signup">Registro</Link>
          <Link to="/login">Acceso</Link>
        </>
      }
      

    </nav>
  );
}

export default Navbar;
