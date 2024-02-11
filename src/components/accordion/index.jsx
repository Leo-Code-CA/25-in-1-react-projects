import { useState } from "react";
import data from './data.js';
import './style.css';

export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId) {

        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

        if (findIndexOfCurrentId === -1) {
            cpyMultiple.push(getCurrentId);
        } else {
            cpyMultiple.splice(findIndexOfCurrentId, 1)
        }

        setMultiple(cpyMultiple)
    }

    console.log(`selected is: ${selected}`);
    console.log(`multiple is: ${multiple}`);
    console.log(`multienable is: ${enableMultipleSelection}`)

    return (
        <div className="wrapper">
            <button
            onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}>
                Enable Multi Selection
            </button>
            <div className="accordion">
                {
                    data && data.length > 0 ? 
                    data.map(dataItem =>
                        <div className="item">
                            <div
                                className="title"
                                onClick={enableMultipleSelection 
                                ? () => handleMultiSelection(dataItem.id) 
                                : () => handleSingleSelection(dataItem.id)}>
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                enableMultipleSelection ?
                                multiple.indexOf(dataItem.id) !== -1 && (<div className="content">{dataItem.answer}</div>)
                                : selected === dataItem.id &&
                                (<div className="content">{dataItem.answer}</div> )
                            }
                        </div>
                    )
                    : <div>No data found!</div>
                }
            </div>
        </div>
    )
}