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

        function handleRgbToHex(r, g, b) {
            const buildHex = [r, g, b].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? `0${hex}` : hex;
            });
            return `#${buildHex.join('')}`;
        }

        function handleHextoRbg(hex) {

            const regexPattern = /^#([a-f\d])([a-f\d])([a-f\d])/i;

            return hex
            .replace(regexPattern, `$1`); 


//                 const hexToRgb = hex =>
//   hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
//              ,(m, r, g, b) => '#' + r + r + g + g + b + b)
//     .substring(1).match(/.{2}/g)
//     .map(x => parseInt(x, 16))


        }

        const paragraph = "#bb55df";
        console.log(handleHextoRbg(paragraph));

        function handleSwitch() {
            setTypeOfColor(c => c === 'hex' ? 'rgb' : 'hex');
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
                        onClick={() => setTypeOfColor(c => c === 'hex' ? 'rgb' : 'hex')}
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
                <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    );
}
    
    
    
    