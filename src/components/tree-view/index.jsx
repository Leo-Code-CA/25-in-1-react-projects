import MenuList from "./menu-list";
import menus from "./data";
import './style.css';

export default function TreeView() {

    return (
        <div className="treeView">
            <h3>Website's plan</h3>
            <MenuList list={menus} />
        </div>
    );

}