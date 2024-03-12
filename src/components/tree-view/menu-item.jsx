import { useState } from "react";
import MenuList from "./menu-list";
import { FaMinus, FaPlus } from 'react-icons/fa';
import './style.css';

export default function MenuItem({ item }) {

    const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

    function handleToggleChildren(getCurrentLabel) {
        // console.log(displayCurrentChildren);
        // console.log(getCurrentLabel);
        // console.log(!displayCurrentChildren[getCurrentLabel]);
        setDisplayCurrentChildren({
            ...displayCurrentChildren,
            [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel]
        });
    }

    return (
        <li>
            <div className="treeView__item">
                <p>{item.label}</p>
                {
                    item && item.children && item.children.length > 0 ? 
                        <span onClick={() => handleToggleChildren(item.label)}>
                            {
                                displayCurrentChildren[item.label] ? <FaMinus size={15}/> 
                                : <FaPlus size={15}/>
                            }
                        </span> 
                    : null
                }
            </div>
            {
                item && item.children && item.children.length > 0 && displayCurrentChildren[item.label] ?
                <MenuList list={item.children} />
                : null
            }
        </li>
    );
}