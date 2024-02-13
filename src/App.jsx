import Accordion from "./components/accordion/index.jsx";
import RandomColor from "./components/random-color/index.jsx";
import StarRating from "./components/star-rating/index.jsx";

export default function App() {

    return (
        <>
            <h1>25-in-1 React Projects</h1>
            <Accordion />
            <RandomColor />
            <StarRating 
            noOfStars={10}
            />
        </>
    );
}