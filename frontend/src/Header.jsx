import React from 'react';
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    <li>HOME</li>
                    <li>CHI SIAMO</li>
                    <li>DOVE SIAMO</li>
                    <li>PRODOTTI</li>
                    <li>CONTATTI</li>
                    <li>SHOP</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
