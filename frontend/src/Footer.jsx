import React from 'react';
import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="contact-info">
                <p>Via San Toto, Seduta 12</p>
                <p>Parma, Italia</p>
                <p>Tel: 039.1234567</p>
                <p>Email: info@mokapcoffee.it</p>
            </div>
            <div className="social-media">
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
            </div>
        </footer>
    );
}

export default Footer;
