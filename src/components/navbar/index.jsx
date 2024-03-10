import { NavLink } from "react-router-dom";
import ThemeSwitch from './../theme-switch/index.jsx';
import ScrollTracker from './../scroll-tracker/index.jsx';
import ToggleMenu from './../toggle-menu/index.jsx';
import './style.css';
import { useContext } from "react";
import { GlobalContext } from "../../context/index.jsx";

export default function Navbar() {

    const { sideBarOpen } = useContext(GlobalContext);

    return (
        <nav className={sideBarOpen ? 'navbar navbar--small' : 'navbar navbar--large'}>
            <div className="navbar__wrapper">
                {
                    !sideBarOpen && 
                    <>
                        <ToggleMenu />
                        <h1>React N' Relax</h1>
                    </>
                }
                <ul>
                    <li>
                    <NavLink
                    to={'/'}>
                        Home
                    </NavLink>                   
                    </li>
                    <li>
                    <NavLink
                    to={'/discover'}>
                        Discover
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                    to={'/unwind'}>
                        Unwind
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                    to={'/energize'}>
                        Energize
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                    to={'/create'}>
                        Create
                    </NavLink>
                    </li>
                    <li>
                    <NavLink
                    to={'/plan'}>
                        Plan
                    </NavLink>
                    </li>
                </ul>
                <ThemeSwitch />
            </div>
            <ScrollTracker />
        </nav>
    );
}