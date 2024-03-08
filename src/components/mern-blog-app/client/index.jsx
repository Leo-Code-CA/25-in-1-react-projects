import GlobalState from "./context";
import Header from './components/header.jsx';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home.jsx';
import CreateBlog from './pages/createBlog.jsx';

export default function MernBlogApp() {


    return (
        <GlobalState>
            <div>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path='/add-blog' element={<CreateBlog />} />
                </Routes>
            </div>
        </GlobalState>
    );
}