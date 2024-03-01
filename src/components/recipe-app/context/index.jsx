import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);

    async function handleSubmit(e) {

        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
            const data = await response.json();

            if(data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam("");
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }

        console.log(recipeList);
    }
    
    return (
        <GlobalContext.Provider value={{ searchParam, loading, recipeList, setSearchParam, handleSubmit }}>
            { children }
        </GlobalContext.Provider>
    );

}