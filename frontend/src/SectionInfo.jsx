import React from 'react';
import './SectionInfo.css';

export const SectionInfo = () => {
    return (
        <div className="section-info">
            <div className="quality-beans">
                <h2>¡Bienvenido a nuestra tienda de café, donde cada producto cuenta una historia única!</h2>
                <p>En nuestra tienda online, te invitamos a explorar un mundo de aromas y sabores que capturan la esencia de los mejores cafés del mundo.</p>
            </div>
            <div className="extra-taste">
                <h2></h2>
                <p>Sumérgete en nuestro catálogo, donde cada producto cuenta su propia historia de origen, métodos de cultivo y notas de sabor.</p>
                <button>LEGGI DI PIÙ</button>
            </div>
        </div>
    );
}

export default SectionInfo;
