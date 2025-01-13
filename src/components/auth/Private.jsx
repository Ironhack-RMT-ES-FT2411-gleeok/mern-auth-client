import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

function Private(props) {

  // este componente va a verificar si el usuario puede o no ver la PAGINA que está envolviendo

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    return props.children // estas logeando, adelante con la página
  } else {
    return <Navigate to={"/login"}/>
  }

}

export default Private