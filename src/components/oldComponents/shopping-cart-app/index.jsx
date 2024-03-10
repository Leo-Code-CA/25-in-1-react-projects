import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Header from "./components/header";
import { Provider } from "react-redux";
import store from "./store";

export default function ShoppingCartApp() {


    return (
        <Provider store={store}>
            <div>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />}/>
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Provider>
    );
}