import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/index.jsx';
import Home from './pages/home';
import Details from './pages/details';
import Favorites from './pages/favorites';
import './../../output.css';
import GlobalState from './context/index.jsx';

export default function RecipeApp() {

    return (
        <GlobalState >
            <div>
                <div className='min-h-screen p-6 bg-white text-gray-600 text-lg'>
                    <Navbar />
                    <Routes>
                        <Route 
                        path='/'
                        element={
                            <Home />
                        }
                        />
                        <Route 
                        path='/favorites'
                        element={
                            <Favorites />
                        }
                        />
                        <Route 
                        path='/recipe-item/:id'
                        element={
                            <Details />
                        }
                        />
                    </Routes>
                </div>
            </div>
        </GlobalState>
    );
}