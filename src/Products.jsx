import React, { useState, useEffect } from 'react';
import './Products.css';

export const Products = () => {
    const [productos, setProductos] = useState([])
    // estado para producto del carrito
    const [carrito, setCarrito] = useState([])
    function json(resultado) {
        return resultado.json()
    }
    function procesar(productos) {
        setProductos(productos)

    }
    function obtenerCarrito() {
        fetch(import.meta.env.VITE_HOST_BACKEND + "/carrito",
            {
                credentials: 'include'
            }
        ).then(json).then((resultado) => {
            if (resultado.error) {
                return
            }
            setCarrito(resultado)
        })

    }
    useEffect(() => {
        fetch(import.meta.env.VITE_HOST_BACKEND + "/productos").then(json).then(procesar)
        // obtener los productos del carrito
        obtenerCarrito()
    }, [])

    return (
        <div className="products"
            id='productos'
        >
            <h2>Productos</h2>
            <div className="product-list">
                {productos.map(producto => (
                    <>
                        <div className="product-item">
                            <img src={producto.imagen} alt="" width={100} />
                            <h3>{producto.nombre}</h3>
                            <p>{producto.descripcion}</p>
                            <p>$ {producto.precio}</p>
                            {/* Cantidad de para agregar ala carrito */}
                            <input key={producto.id} id={producto.id} defaultValue={1}
                                type="number" />
                            {/* Boton para invocar API carrito enviando producto_id y cantidad */}
                            <button onClick={() => {
                                const cantidad = document.getElementById(producto.id).value

                                fetch(import.meta.env.VITE_HOST_BACKEND + "/carrito", {
                                    credentials: 'include',
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        producto_id: producto.id,
                                        cantidad: cantidad
                                    })
                                }).then(json).then((resultado) => {
                                    console.log(resultado)
                                    obtenerCarrito()
                                })
                            }}>Agregar al carrito</button>

                            {/* Boton para invocar API eliminar producto enviando producto_id */}

                        </div>

                    </>

                ))}


            </div>
            {/* Mostrar elementos del carrito id, nombre, precio y cantidad */}
            <h2>Carrito</h2>
            <div className="product-list">
                {/* {carrito.map(producto => (
                    <div className="product-item">
                        <h3>{producto.nombre}</h3>
                        <p>{producto.precio}</p>
                        <p>{producto.cantidad}</p>
                    </div>
                ))} */}
                {/* Mostrar carrito en una tabla */}
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            {/* subtotal */}
                            <th>Subtotal</th>
                            {/* opciones */}
                            <th>Eliminar</th>

                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>$ {producto.precio}</td>
                                <td>{producto.cantidad}</td>
                                <td>$ {producto.precio * producto.cantidad}</td>
                                <td>
                                    <button onClick={() => {
                                        fetch(import.meta.env.VITE_HOST_BACKEND + "/carrito/" + producto.id, {
                                            method: 'DELETE',
                                            credentials: 'include'
                                        }).then(json).then((resultado) => {
                                            console.log(resultado)
                                            obtenerCarrito()
                                        })
                                    }}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Products;
