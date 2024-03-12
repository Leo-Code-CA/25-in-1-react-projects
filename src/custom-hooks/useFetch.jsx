import { useEffect, useState } from "react";

export default function useFetch(url, options = undefined) {

    const [data, setData] = useState(null);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function fetchData() {

            setPending(true);
    
            try {
                const response = await fetch(url, {...options});
                if (!response.ok) throw new Error(response.statusText);
                const result = await response.json();
                // if (!result) throw new Error("The JSON data is empty.");
                setData(result);
                setError(null);
                setPending(false);
            } catch (error) {
                setError(`An error occured: ${error}`);
                setPending(false);
            }
        }

        fetchData();

    }, [url, options]);

    // console.log(url, options);

    return { data, error, pending };

}