import { useRef } from 'react';
import useFetch from '../use-fetch/index.jsx';

export default function ScrollToTopAndBottom() {

    const topRef = useRef(null);
    const bottomRef = useRef(null);

    const { data, error, pending } = useFetch("https://dummyjson.com/products?limit=100", {});

    function handleScrollToTop() {
        const top = topRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }

    function handleScrollToBottom() {
        const bottom = bottomRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: bottom,
            behavior: 'smooth'
        });
    }

    if (pending) return <h1>Loading, please wait...</h1>;
    if (error) return <h1>An error occured, please try again</h1>;

    return (
        <div>
            <h1>Scroll to top and bottom feature</h1>
            <h3 ref={topRef}>This is the top section</h3>
            <button
            onClick={handleScrollToBottom}
            >Scroll to bottom</button>
            <ul>
                {
                    data && data.products && data.products.length ? data.products.map(item => 
                    <li key={item.key}>{item.title}</li>)
                    : null
                }
            </ul>
            <button
            onClick={handleScrollToTop}>Scroll to top</button>
            <h3 ref={bottomRef}>This is the bottom section</h3>
        </div>
    );

}