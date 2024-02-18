import { useEffect, useState } from "react";
import './style.css';

export default function LoadMoreData() {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchProducts() {

            try {
                setLoading(true);
                const response = await fetch(
                    `https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`, {
                        signal: signal
                    }
                    );
                const result = await response.json();
    
                if (result && result.products && result.products.length) {
                    setProducts((prevData) => [...prevData, ...result.products]);
                    setLoading(false);
                }
            
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        }

        fetchProducts();

        return () => controller.abort();

    }, [count]);


    useEffect(() => {
        if (products && products.length === 100) setDisableButton(true);
    }, [products]);

    if (loading) {
        return <div>Data is loading...</div>;
    }

    console.log(products.length);

    return (
        <div className="data-container">
            <div className="product-container">
                {
                    products && products.length ? products.map(item => 
                    (<div key={item.id} className="product">

                        <img 
                        src={item.thumbnail}
                        alt={item.title} />
                        <p>{item.title}</p>
                        
                    </div>))
                    : null
                };
            </div>
            <div>
                <button 
                onClick={() => setCount(count + 1)}
                className="button-container"
                disabled={disableButton}>
                    Load More Products
                </button>
                {
                    disableButton ? <p>You have reached 100 products!</p> : null
                }
            </div>
        </div>
    );
}