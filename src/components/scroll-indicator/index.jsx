import { useEffect, useState } from "react";
import './style.css';

export default function ScrollIndicator({ url }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [scrollPercentage, setScrollPercentage] = useState(0);

    function handleScrollPercentage() {
        const scrollFromTop = document.body.scrollTop || document.documentElement.scrollTop;

        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const scrollPercentage = scrollFromTop / height * 100;

        setScrollPercentage(scrollPercentage);

        // console.log(scrollPercentage);
    }

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData(getUrl) {
    
            try {
    
                setLoading(true);
                const response = await fetch(getUrl, {
                    signal: signal
                });
                const data = await response.json();
    
                if (data && data.products && data.products.length > 0) {
                    setData(data.products);
                    setLoading(false);
                }
    
            } catch (error) {
                console.log(error);
                setErrorMessage(error.message);
                setLoading(false);
            }
    
        }

        fetchData(url);

        return () => controller.abort();

    }, [url]);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollPercentage);

        return () => {
            window.removeEventListener('scroll', () => {});
        };
    });

    // FOR DEVELOPMENT PURPOSE ONLY!
    if (errorMessage && errorMessage !== 'The operation was aborted.') {
        return <div>An error occured: {errorMessage}</div>;
    }

    if (loading) {
        return <div>Data is loading, please wait...</div>;
    }

    return (
        <div>
            <div className="top-scroll-container">
                <h1>Custom Scroll Indicator</h1>
                <div className="scroll-tracking-container">
                    <div 
                    className="current-scroll-progress"
                    style={{width:`${scrollPercentage}%`}}>
                    </div>
                </div>
            </div>
            <div className="data-container">
                {
                    data && data.length > 0 ? 
                    data.map(dataItem => <p>{dataItem.title}</p>)
                    : null
                }
            </div>
        </div>
    );
}