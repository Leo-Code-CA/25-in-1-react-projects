import { useRef, useState } from "react";
import './style.css';
import useOutisdeClick from ".";



export default function TryCustomHookOutsideClick() {

    const [showContent, setShowContent] = useState(false);
    const ref = useRef();
    useOutisdeClick(ref, () => setShowContent(false));

    return (
        <div className="window-container">
            {
                showContent ?
                <div ref={ref}>
                    <h1>Random Content</h1>
                    <p>Please, click outside of this window to close this. If you click inside of it, it won&apos;t close.</p>
                </div>
                : <button
                onClick={() => setShowContent(true)}>
                    Show Content
                </button>
            }
        </div>
    );
}