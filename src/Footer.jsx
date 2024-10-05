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
                <p>Email: <a href="mailto:cafélaspalmas@gmail.com">cafélaspalmas@gmail.com</a> </p>
            </div>
            <div className="social-media">
                <a href="https://www.instagram.com/luisagomezu19/">Instagram</a>
                <a href="https://wa.me/573146579611">WhatsApp</a>
            </div>
        </footer>
    );
}

export default Footer;
