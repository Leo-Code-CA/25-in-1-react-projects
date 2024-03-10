import { Link } from 'react-router-dom';
import classes from './style.module.css';

export default function Header() {

    return (
        <div className={classes.header}>
            <h1>MERN Blog App</h1>
            <ul>
                <Link to={'/'}>
                    <li>Home</li>
                </Link>
                <Link to={'/add-blog'}>
                    <li>Create New Blog</li>
                </Link>
            </ul>
        </div>
    );
}