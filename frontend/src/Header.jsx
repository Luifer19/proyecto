import React from 'react';
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    <li>HOME</li>
                    <li>PRODUCTO</li>
                    <li>CONTACTO</li>
                    <li>COMPRAR</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
