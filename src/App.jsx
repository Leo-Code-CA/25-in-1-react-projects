import Accordion from "./components/accordion/index.jsx";
import RandomColor from "./components/random-color/index.jsx";
import StarRating from "./components/star-rating/index.jsx";
import ImageSlider from './components/image-slider/index.jsx';
import LoadMoreData from "./components/load-more-data/index.jsx";
import menus from "./components/tree-view/data.js";
import TreeView from "./components/tree-view/index.jsx";
import QrCodeGenerator from "./components/qr-code-generator/index.jsx";
import LightDarkMode from "./components/light-dark-mode/index.jsx";
import ScrollIndicator from "./components/scroll-indicator/index.jsx";
import TabTest from "./components/custom-tabs/tab-test.jsx";
import ModalTest from "./components/custom-modal-popup/modal-test.jsx";
import GitHubProfileFinder from "./components/github-profile-finder/index.jsx";
import SearchAutocomplete from "./components/search-autocomlete/index.jsx";
import TicTacToe from "./components/tic-tac-toe/index.jsx";

export default function App() {

    return (
        <>
            <h1>25-in-1 React Projects</h1>
            <Accordion />
            <RandomColor />
            <StarRating 
            noOfStars={10}
            />
            <ImageSlider url={'https://picsum.photos/v2/list'} limit={10} page="1"/>
            <LoadMoreData />
            <TreeView menus={menus}/>
            <QrCodeGenerator />
            <LightDarkMode />
            <ScrollIndicator url="https://dummyjson.com/products?limit=100"/>
            <TabTest />
            <ModalTest />
            <GitHubProfileFinder />
            <SearchAutocomplete />  
            <TicTacToe />      
        </>
    );
}