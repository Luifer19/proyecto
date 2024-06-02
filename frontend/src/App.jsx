import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [productos, setProductos] = useState([])

  function json(resultado) {
    return resultado.json()
  }
  function procesar(productos) {
    setProductos(productos)
    // console.log(productos);
    // productos.forEach(producto => {
    //   const img = document.createElement("img")
    //   img.src = producto.imagen
    //   img.width = "100"

    //   const div = document.createElement("div")
    //   div.innerText = producto.nombre
    //   div.appendChild(img)
    //   document.body.append(div)
    // });
  }
  useEffect(() => {
    fetch("http://localhost:3000/productos").then(json).then(procesar)

  }, [])

  return (
    <>

      <main>
        <form action="http://localhost:3000/productos" method="post">
          <input placeholder="Nombre" type="text" name="nombre" id="nombre" />
          <input placeholder="Descripcion" type="text" name="descripcion" id="descripcion" />
          <input placeholder="Precio" type="number" name="precio" id="precio" />
          <input placeholder="Url" type="text" name="imagen" id="imagen" />
          <button type="submit">Enviar</button>
        </form>
        {/* {JSON.stringify(productos)} */}
        <div style={{display:"flex"}}>
          {productos.map(producto => (
            <>
              <div>
                <img src={producto.imagen} alt="" width={100} />
                <p>{producto.nombre}</p>
                <p>{producto.precio}</p>


                {producto.descripcion}
              </div>

            </>

          ))}
        </div>
      </main>
      <script>

      </script>

    </>
  )
}

export default App
