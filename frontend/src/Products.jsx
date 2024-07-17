import React, { useState, useEffect } from 'react';
import './Products.css';

export const Products = () => {
    const [productos, setProductos] = useState([])
    function json(resultado) {
        return resultado.json()
    }
    function procesar(productos) {
        setProductos(productos)

    }
    useEffect(() => {
        fetch("http://localhost:3000/productos").then(json).then(procesar)

    }, [])

    return (
        <div className="products">
            <h2>Productos</h2>
            <div className="product-list">
                    {productos.map(producto => (
                        <>
                            <div className="product-item">
                                <img src={producto.imagen} alt="" width={100} />
                                <h3>{producto.nombre}</h3>
                                <p>{producto.descripcion}</p>
                                <p>{producto.precio}</p>

                            </div>

                        </>

                    ))}
               
                
            </div>
        </div>
    );
}

export default Products;
