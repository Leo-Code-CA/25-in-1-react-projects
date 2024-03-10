import './style.css';
import ToggleMenu from './../toggle-menu/index.jsx';
import SearchBar from './../search-bar/index.jsx';
import Weather from './../weather/index.jsx';
import TreeView from './../tree-view/index.jsx';

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className='sidebar__titleAndToggle'>
                <h1>React N' Relax</h1>
                <ToggleMenu />
            </div>
            <SearchBar />
            <Weather />
            <TreeView />
        </div>
    );
}