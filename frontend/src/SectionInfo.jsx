import React from 'react';
import './SectionInfo.css';

export const SectionInfo = () => {
    return (
        <div className="section-info">
            <div className="quality-beans">
                <h2>Chicchi di qualità scelti per voi</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="extra-taste">
                <h2>Il gusto in più della tua giornata</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <button>LEGGI DI PIÙ</button>
            </div>
        </div>
    );
}

export default SectionInfo;
