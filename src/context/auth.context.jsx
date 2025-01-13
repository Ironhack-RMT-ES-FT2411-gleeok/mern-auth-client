import axios from "axios";
import { createContext, useEffect, useState } from "react";

// componente contexto (transmite el contexto por la app)
const AuthContext = createContext()

// componente envoltorio (almacena los contextos)
function AuthWrapper(props) {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ loggedUserId, setLoggedUserId ] = useState(null)
  // opcionalmente estados de roles

  const [ isAuthenticating, setIsAuthenticating] = useState(true)

  const authenticateUser = async() => {
    setIsAuthenticating(true) // forzar la carga del spinner al momento de validar el token
    
    // valida el token y actualiza los estado acorde

    try {

      const authToken = localStorage.getItem("authToken")

      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`, {
        headers: { authorization: `Bearer ${authToken}` }
      })

      console.log("token validado", response)
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)
      setIsAuthenticating(false)
      
    } catch (error) {
      console.log("token no validado")
      // console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsAuthenticating(false)
    }
  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser
  }

  useEffect(() => {
    // al inicio de que el usuario navega por la app, interemos validar su token
    authenticateUser()
  }, [])

  if (isAuthenticating) {
    return <div><h3>... Validando usuario</h3></div>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}