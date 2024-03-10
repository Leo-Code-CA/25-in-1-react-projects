import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [favoritesList, setFavoritesList] = useState([]);

    const navigate = useNavigate();

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
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }

        // console.log(recipeList);
    }

    function handleAddToFavorites(getCurrentItem) {

        // console.log(getCurrentItem);
        let copyFavoritesList = [...favoritesList];
        const index = copyFavoritesList.findIndex(item => item.id === getCurrentItem.id);

        if (index === -1) {
            copyFavoritesList.push(getCurrentItem);
        } else {
            copyFavoritesList.splice(getCurrentItem, 1);
        }
        
        setFavoritesList(copyFavoritesList);

    }
    
    return (
        <GlobalContext.Provider value={{ 
            searchParam, 
            loading, 
            recipeList, 
            setSearchParam, 
            handleSubmit,
            recipeDetails,
            setRecipeDetails,
            handleAddToFavorites,
            favoritesList }}>
            { children }
        </GlobalContext.Provider>
    );

}