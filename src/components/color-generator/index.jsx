import { useEffect, useState } from "react";
import './style.css';

export default function ColorGenerator() {
    
    const [typeOfColor, setTypeOfColor] = useState("hex");
    const [color, setColor] = useState('#000000');
    
        function randomColorUtility(length) {
            return Math.floor(Math.random() * length);
        }
    
        function handleCreateRandomHexColor() {
            const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
            let hexColor = "#";
            for (let i = 0; i < 6; i++) {
                hexColor += hex[randomColorUtility(hex.length)];
            }
            setColor(hexColor);
        }
    
        function handleCreateRandomRgbColor() {
            const r = randomColorUtility(256);
            const g = randomColorUtility(256);
            const b = randomColorUtility(256);
            setColor(`rgb(${r}, ${g}, ${b})`);
        }

        // function handleRgbToHex(r, g, b) {
        //     const buildHex = [r, g, b].map(x => {
        //         const hex = x.toString(16);
        //         return hex.length === 1 ? `0${hex}` : hex;
        //     });
        //     return `#${buildHex.join('')}`;
        // }

        function handleRgbToHex(rgb) {

            const extractColor = rgb?.match(/(\d{1,3})/g);
            const buildHex = extractColor.map(x => {
                const hex = Number(x).toString(16);
                return hex.length === 1 ? `0${hex}` : hex;
            });
            return `#${buildHex.join('')}`;
        }

        function handleHextoRbg(hex) {
            const buildRgb = hex
                .slice(1).match(/.{2}/g)
                .map(x => parseInt(x, 16))
                .join(',');
            return `rgb(${buildRgb})`;
        }

        function handleSwitch() {
            setTypeOfColor(c => c === 'hex' ? 'rgb' : 'hex');
            typeOfColor === 'hex' ? setColor(handleHextoRbg(color))
            : setColor(handleRgbToHex(color));
        }
    
    return (
        <div className="colorGenerator">
            <h2>Color Generator</h2>
            <div className="colorGenerator__controls">
                <div className="colorGenerator__switchWrapper">
                    <p>HEX</p>
                    <div className={typeOfColor === 'hex' ? 'colorGenerator__switch' 
                    : 'colorGenerator__switch colorGenerator__switch--right'}>
                        <button
                        style={{ 
                            left: typeOfColor === 'hex' ? '0' : '100%',
                            transform: typeOfColor === 'hex' ? 'translate(0)' : 'translate(-100%)'
                        }}
                        onClick={handleSwitch}
                        ></button>
                    </div>
                    <p>RGB</p>
                </div>
                <button
                className="colorGenerator__btn"
                onClick={typeOfColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor}>
                    Generate Random Color
                </button>
            </div>
            <div className="colorGenerator__color" style={{background: color}}>
                <h4>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h4>
                <h3>{color}</h3>
            </div>
        </div>
    );
}
    
    
    
    