import { Route, Routes } from "react-router-dom";
import Navbar from './components/navbar/index.jsx';
import Sidebar from './components/sidebar/index.jsx';
import Home from './pages/home.jsx';
import Discover from './pages/discover.jsx';
import Unwind from './pages/unwind.jsx';
import Energize from './pages/energize.jsx';
import Create from './pages/create.jsx';
import Plan from './pages/plan.jsx';
import { useContext } from "react";
import { GlobalContext } from "./context/index.jsx";

// check that about cleanup affer fetch: https://react.dev/learn/synchronizing-with-effects

export default function App() {

    const { sideBarOpen } = useContext(GlobalContext);

    return (
        <div className={sideBarOpen ? 'app app--small' : 'app app--large'}>
            <Navbar />
            {
                sideBarOpen && <Sidebar />
            }
            <Routes>
                <Route
                path="/"
                element={<Home />} />
                <Route 
                path="/discover"
                element={<Discover />} />
                <Route 
                path="/unwind"
                element={<Unwind />} />
                <Route 
                path="/energize"
                element={<Energize />} />
                <Route 
                path="/create"
                element={<Create />} />
                <Route 
                path="/plan"
                element={<Plan />} />
            </Routes>
        </div>
    );
}



// <>
//             <h1>25-in-1 React Projects</h1>
//             <Accordion />
//             <RandomColor />
//             <StarRating 
//             noOfStars={10}
//             />
//             <ImageSlider url={'https://picsum.photos/v2/list'} limit={10} page="1"/>
//             <LoadMoreData />
//             <TreeView menus={menus}/>
//             <QrCodeGenerator />
//             <LightDarkMode />
//             <ScrollIndicator url="https://dummyjson.com/products?limit=100"/>
//             <TabTest />
//             <ModalTest />
//             <GitHubProfileFinder />
//             <SearchAutocomplete />  
//             <TicTacToe /> 
//             <FeatureFlagGlobalState>
//                 <FeatureFlags /> 
//             </FeatureFlagGlobalState> 
//             <TryCustomHookFetch />
//             <TryCustomHookOutsideClick />
//             <TryCustomHookWindowResize />
//             <ScrollToTopAndBottom />
//             <ScrollToSection />
//             <Weather />
//             <RecipeApp />
//             <ShoppingCartApp />
//             <ExpenseTrackerApp />
//             <MernBlogApp />
//         </>





// import Accordion from "./components/accordion/index.jsx";
// import RandomColor from "./components/random-color/index.jsx";
// import StarRating from "./components/star-rating/index.jsx";
// import ImageSlider from './components/image-slider/index.jsx';
// import LoadMoreData from "./components/load-more-data/index.jsx";
// import menus from "./components/tree-view/data.js";
// import TreeView from "./components/tree-view/index.jsx";
// import QrCodeGenerator from "./components/qr-code-generator/index.jsx";
// import LightDarkMode from "./components/light-dark-mode/index.jsx";
// import ScrollIndicator from "./components/scroll-indicator/index.jsx";
// import TabTest from "./components/custom-tabs/tab-test.jsx";
// import ModalTest from "./components/custom-modal-popup/modal-test.jsx";
// import GitHubProfileFinder from "./components/github-profile-finder/index.jsx";
// import SearchAutocomplete from "./components/search-autocomlete/index.jsx";
// import TicTacToe from "./components/tic-tac-toe/index.jsx";
// import FeatureFlags from "./components/feature-flag/index.jsx";
// import FeatureFlagGlobalState from "./components/feature-flag/context/index.jsx";
// import TryCustomHookFetch from "./components/use-fetch/test.jsx";
// import TryCustomHookOutsideClick from "./components/use-outside-click/test.jsx";
// import TryCustomHookWindowResize from "./components/use-window-resize/test.jsx";
// import ScrollToTopAndBottom from "./components/scroll-to-top-and-bottom/index.jsx";
// import ScrollToSection from "./components/scroll-to-top-and-bottom/scroll-to-section.jsx";
// import Weather from "./components/weather-app/index.jsx";
// import RecipeApp from "./components/recipe-app/index.jsx";
// import ShoppingCartApp from "./components/shopping-cart-app/index.jsx";
// import ExpenseTrackerApp from "./components/expense-tracker-app/index.jsx";
// import MernBlogApp from "./components/mern-blog-app/client/index.jsx";