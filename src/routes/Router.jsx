import { BrowserRouter, Routes, Route } from "react-router"

import Header from "../components/Header"
import Footer from "../components/Footer"; // ✅ nuevo
import Home from "../pages/Home"
import UltimosLanzamientos from "../pages/UltimosLanzamientos"
import Populares from "../pages/Populares"
import Buscar from "../pages/Buscar"
import Favorites from "../pages/Favorites"
import DetailMovie from "../pages/DetailMovie";

import Layout from "../components/Layout";


function Router() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ultimos" element={<UltimosLanzamientos />} />
                    <Route path="/populares" element={<Populares />} />
                    <Route path="/buscar" element={<Buscar />} />
                    <Route path="/favoritos" element={<Favorites />} />
                    <Route path="/detail/:id" element={<DetailMovie />} />
                </Routes>
            </Layout>
        </BrowserRouter >
    );
}

export default Router