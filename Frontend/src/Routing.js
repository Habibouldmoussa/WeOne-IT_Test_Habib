//Importation des dépendances react
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Importation des pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Error from './pages/Error/Error';
import Logos from './pages/Logos/Logos';
import Header from './components/Header/Header';
import AdminAdd from './pages/Admin/Admin_add';
import AdminModif from './pages/Admin/Admin_modif';
import Footer from './components/Footer/Footer';
//Routing
function Routing() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} /> { /*Route vers la page d'accueil*/}
                <Route path='/About' element={<About />} />{ /*Route vers la page apropos */}
                <Route path='/Logos' element={<Logos />} /> { /*Route vers la page */}
                <Route path='/adminAdd' element={<AdminAdd />} />{ /*Route vers la page */}
                <Route path='/admin/logos/:id' element={<AdminModif />} />{ /*Route vers la page */}
                <Route path='*' element={<Error />} /> { /*Route vers la page d'erreur*/}
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
export default Routing;

