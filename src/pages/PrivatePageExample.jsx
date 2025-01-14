import { useEffect, useState } from 'react'
import service from '../services/config.services'

function PrivatePageExample() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // call a private route here...

      // const authToken = localStorage.getItem("authToken")
      // const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/private-route-example`, {
      //   headers: { authorization: `Bearer ${authToken}` }
      // })

      const response = await service.get("/private-route-example")

      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here

  return (
    <div>
      
      <h3>Ejemplo de página privada</h3>
      <p>Solo usuarios que hayan validado credenciales deberian poder acceder y ver la siguiente información:</p>

    </div>
  )
}

export default PrivatePageExample