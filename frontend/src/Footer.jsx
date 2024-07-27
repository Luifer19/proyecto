import React from 'react';
import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer"
            id='contacto'
        >
            <div className="contact-info">
                <p>Calle16#19A</p>
                <p>La palmas, Colombia</p>
                <p>Tel: 3146579611</p>
                <p>Email: cafélaspalmas@gmail.com</p>
            </div>
            <div className="social-media">
                <a href="#">Instagram</a>
                <a href="#">WhatsApp</a>
            </div>
        </footer>
    );
}

export default Footer;
