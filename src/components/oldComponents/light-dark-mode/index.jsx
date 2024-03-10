import useLocalStorage from "./useLocalStorage.jsx";
import './style.css';

export default function LightDarkMode() {

    const [theme, setTheme] = useLocalStorage('key', 'dark');

    function handleToggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    // console.log(theme);

    return (
        <div className="light-dark-mode"
        data-theme={theme}>
            <div className="container-theme">
                <p>Hello Girl!</p>
                <button
                onClick={handleToggleTheme}
                >Change Theme</button>
            </div>
        </div>
    );
}