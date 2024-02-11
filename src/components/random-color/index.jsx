import { useEffect, useState } from "react";
import './style.css';

export default function RandomColor() {

    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('#000000');

    function randomColorUtility(length) {
        return Math.floor(Math.random() * length);
    }

    function handleCreateRandomHexColor() {

        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

        let hexColor = '#'

        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)]
        }

        setColor(hexColor);
    }

    function handleCreateRandomRgbColor() {

        const r = randomColorUtility(256);
        const g = randomColorUtility(256);
        const b = randomColorUtility(256);

        console.log("generating new RGB")

        // setColor(`rbg(${r}, ${g}, ${b})`);
        const a = 0;
        const bB = 0;
        const c = 0;
        setColor("rbg(" + a + "," + bB + "," + c + ")");

    }

    useEffect(() => {

        if (typeOfColor === 'hex') handleCreateRandomHexColor();
        else handleCreateRandomRgbColor();

    }, [typeOfColor]);

    console.log(color);
    console.log(typeOfColor)


    return (
        <div 
        className="container"
        style={{
            background: color
        }}>
            <button
            onClick={() => setTypeOfColor('hex')}>
                Create HEX Color
                </button>
            <button
            onClick={() => setTypeOfColor('rgb')}>
                Create RGB Color
            </button>
            <button 
            onClick={typeOfColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor}>
                Generate Random Color
            </button>
            <div className="currentColor">
                <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    )
}

// What would you do?
// 2 or 3 states containing the color code
// onClick of the associated button, probably use Math.random and Math.floor to generate an aleatory number within a range

// Find out why it does not work for RGB ! Good luck :)