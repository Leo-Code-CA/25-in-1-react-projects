import './style.css';
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useContext } from 'react';
import { GlobalContext } from '../../context/index.jsx';

export default function ToggleMenu() {

    const { sideBarOpen, setSideBarOpen } = useContext(GlobalContext);

    return (
        <button
        className="toggleMenu"
        onClick={() => setSideBarOpen(o => !o)}
        >
            {
                sideBarOpen ? 
                <AiOutlineMenuFold />
                : <AiOutlineMenuUnfold />
            }
        </button>
    );

}