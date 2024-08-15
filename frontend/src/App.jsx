import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import Header from './Header'
import Banner from './Banner'
import SectionInfo from './SectionInfo'
import Products from './Products'
import Footer from './Footer'

function App() {
  const [count, setCount] = useState(0)
  const [productos, setProductos] = useState([])
  const [logueado, setLogueado] = useState(false)
  const [verInicioSesion, setVerInicioSesion] = useState(false)

  function json(resultado) {
    return resultado.json()
  }
  function procesar(productos) {
    setProductos(productos)

  }
  useEffect(() => {
    fetch("http://localhost:3000/productos").then(json).then(procesar)

  }, [])
  async function registrarProducto(evento) {
    evento.preventDefault()
    const form = new FormData(evento.target)
    const producto = {
      nombre: form.get("nombre"),
      descripcion: form.get("descripcion"),
      precio: form.get("precio"),
      imagen: form.get("imagen")
    }
    await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(producto)
    })
    fetch("http://localhost:3000/productos").then(json).then(procesar)

    evento.target.reset()

  }
  async function eliminarProducto(id) {
    console.log(id)
    await fetch("http://localhost:3000/productos/" + id, {
      method: "DELETE"
    })
    fetch("http://localhost:3000/productos").then(json).then(procesar)

  }
  async function iniciarSesion(evento) {
    evento.preventDefault()
    const form = new FormData(evento.target)
    const usuario = form.get("usuario")
    const contraseña = form.get("contraseña")
    console.log(usuario, contraseña)
    const peticion = await fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, contraseña })
    })
    if (peticion.ok) {
      setLogueado(true)
    } else {
      alert("usuario o contraseña incorrectos")
    }
  }


  function ver() {
    setVerInicioSesion(!verInicioSesion)
  }
  if (!logueado) {
    return (
      <main>
        <Header ver={ver} />
        {!verInicioSesion && (
          <>
            <Banner />
            <SectionInfo></SectionInfo>
            <Products />
          </>
        )}
        {verInicioSesion && (
          <form method="post" onSubmit={iniciarSesion}>
            <input placeholder="Usuario" type="text" name="usuario" id="usuario" />
            <input placeholder="Contraseña" type="text" name="contraseña" id="contraseña" />
            <button type="submit">Enviar</button>
          </form>
        )}

        <Footer />

        

      </main>
    )
  }

  return (
    <>

      <main>
        <form method="post" onSubmit={registrarProducto}>
          <input placeholder="Nombre" type="text" name="nombre" id="nombre" />
          <input placeholder="Descripcion" type="text" name="descripcion" id="descripcion" />
          <input placeholder="Precio" type="number" name="precio" id="precio" />
          <input placeholder="Url" type="text" name="imagen" id="imagen" />
          <button type="submit">Enviar</button>
        </form>
        {/* {JSON.stringify(productos)} */}
        <div style={{ display: "flex" }}>
          {productos.map(producto => (
            <>
              <div>
                <img src={producto.imagen} alt="" width={100} />
                <p>{producto.nombre}</p>
                <p>{producto.precio}</p>

                <p>{producto.descripcion}</p>
                <button onClick={() => eliminarProducto(producto.id)}>X</button>

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
