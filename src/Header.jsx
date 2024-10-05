import React from 'react';
import './Header.css';
import logo from '/logo.png';

export const Header = ({ ver }) => {
    return (
        <header className="header">

            <nav className="nav">
                <img width={200} src={logo} alt="" srcset="" />
                <ul>

                    <li>Inicio</li>
                    <li><a href="#nosotros">Nosotros</a></li>
                    <li><a href="#contacto">Contacto</a></li>
                    <li><a href="#productos">Comprar</a></li>
                    <li><button onClick={ver}>Ingresar</button></li>
                </ul>

            </nav>
        </header>
    );
}

export default Header;
