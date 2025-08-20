import { BrowserRouter, Routes, Route } from "react-router"
import Home from "../pages/Home"
import UltimosLanzamientos from "../pages/UltimosLanzamientos"
import Populares from "../pages/Populares"
import Buscar from "../pages/Buscar"
import Favorites from "../pages/Favorites"
import DetailMovie from "../pages/DetailMovie";

import Layout from "../components/Layout";

import Error404 from "../components/Error404";

import SplashScreen from "../components/SplashScreen";


function Router() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<SplashScreen />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/ultimos" element={<UltimosLanzamientos />} />
                    <Route path="/populares" element={<Populares />} />
                    <Route path="/buscar" element={<Buscar />} />
                    <Route path="/favoritos" element={<Favorites />} />
                    <Route path="/detail/:id" element={<DetailMovie />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Layout>
        </BrowserRouter >
    );
}

export default Router