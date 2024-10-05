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
      const respuesta = await peticion.json()
      if (respuesta.rol === "ADMINISTRADOR") {
        setLogueado(true)
        return

      } else {
        ver()
      }
    } else {
      alert("usuario o contraseña incorrectos")
    }
  }

  async function registrarUsuario(evento) {
    evento.preventDefault()
    const form = new FormData(evento.target)
    const usuario = form.get("usuario")
    const contraseña = form.get("contraseña")
    console.log(usuario, contraseña)
    const peticion = await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ usuario, contraseña })
    })
    if (peticion.ok) {
      alert("usuario registrado")
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
          <>
            <h2>Ingresar</h2>
            <form method="post" onSubmit={iniciarSesion}>
              <input placeholder="Usuario" type="text" name="usuario" id="usuario" />
              <input placeholder="Contraseña" type="text" name="contraseña" id="contraseña" />
              <button type="submit">Enviar</button>
            </form>
            <h2>Registrarse</h2>
            {/* formulario para registrar usuario */}
            <form method="post" onSubmit={registrarUsuario}>
              <input placeholder="Usuario" type="text" name="usuario" id="usuario" />
              <input placeholder="Contraseña" type="text" name="contraseña" id="contraseña" />
              <button type="submit">Enviar</button>
            </form>
          </>
        )}

        <Footer />



      </main>
    )
  }

  return (
    <>

      <main>
        <h1> Administración</h1>
        <div className='grid'>
          <div>
            <h2>Registrar Producto</h2>
            <form method="post" onSubmit={registrarProducto}>
              <input placeholder="Nombre" type="text" name="nombre" id="nombre" />
              <input placeholder="Descripcion" type="text" name="descripcion" id="descripcion" />
              <input placeholder="Precio" type="number" name="precio" id="precio" />
              <input placeholder="Url" type="text" name="imagen" id="imagen" />
              <button type="submit">Enviar</button>
            </form>
          </div>

          {/* {JSON.stringify(productos)} */}
          <div> <h2>Lista de productos</h2>
            <div style={{ display: "flex" }}>

              <table>
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                  </tr>

                </thead>
                <tbody>


                  {productos.map(producto => (
                    <>
                      <tr>
                        <td>
                          <img src={producto.imagen} alt="" width={100} />
                        </td>

                        <td>{producto.nombre}</td>
                        <td>{producto.precio}</td>

                        <td>{producto.descripcion}</td>
                        <td>
                          <button onClick={() => eliminarProducto(producto.id)}>X</button>
                        </td>


                      </tr>

                    </>

                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <script>

      </script>

    </>
  )
}

export default App
