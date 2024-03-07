import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from './../../components/recipe-item/index.jsx';

export default function Favorites() {

    const { favoritesList } = useContext(GlobalContext);

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {
                favoritesList && favoritesList.length > 0 ? (
                    favoritesList.map(item => <RecipeItem item={item} />)
                ) : (
                    <div>
                        <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
                            Nothing to show. Please add some favorite recipes and come back.
                        </p>
                    </div>
                )
            }
        </div>
    );
}