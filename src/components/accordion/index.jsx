import { useState } from "react";
import data from './data.js';
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import './style.css';

export default function Accordion() {

    const [selected, setSelected] = useState([]);
    const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);

    function handleSingleSelection(getCurrentId) {
        setSelected(selected[0] === getCurrentId ? [] : [getCurrentId]);
    }

    function handleMultiSelection(getCurrentId) {

        const findIndexOfCurrentId = selected.indexOf(getCurrentId);

        findIndexOfCurrentId === -1 ? setSelected([...selected, getCurrentId])
        : setSelected(selected.slice(0, findIndexOfCurrentId).concat(selected.slice(findIndexOfCurrentId + 1)));

    }

    return (
        <div className="accordion">
            <button
            className="accordion__settings"
            onClick={() => setEnableMultipleSelection(!enableMultipleSelection)}>
                {enableMultipleSelection ? 'Disable' : 'Enable'} Multiple Selection
            </button>
            <div className="accordion__content">
                {
                    data && data.length > 0 ? 
                    data.map(dataItem =>
                        <dl className="accordion__item" key={dataItem.id}>
                            <dt
                                className="accordion__itemTitle"
                                onClick={enableMultipleSelection 
                                ? () => handleMultiSelection(dataItem.id) 
                                : () => handleSingleSelection(dataItem.id)}>
                                <h3>{dataItem.question}</h3>
                                <span>
                                    {
                                        selected.indexOf(dataItem.id) !== -1 ? <FaSquareMinus /> : <FaSquarePlus />
                                    }
                                </span>
                            </dt>
                            {
                                enableMultipleSelection ?
                                selected.indexOf(dataItem.id) !== -1 && <dd className="accordion__itemData">{dataItem.answer}</dd>
                                : selected[0] === dataItem.id && <dd className="accordion__itemData">{dataItem.answer}</dd>
                            }
                        </dl>
                    )
                    : <div>No data found!</div>
                }
            </div>
        </div>
    );
}