import MenuItem from "./menu-item";
import './style.css';

export default function MenuList({ list = [] }) {

    return (
        <ul className="treeView__list">
            {
                list && list.length ? 
                list.map(listItem =>
                    <MenuItem item={listItem} />
                )
                : null
            }
        </ul>
    );
}