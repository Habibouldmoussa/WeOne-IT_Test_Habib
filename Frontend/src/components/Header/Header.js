//Importation des composants react
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useCookies, withCookies, Cookies } from 'react-cookie'

import logo from "../../assets/logo.svg";
import keyz from "../../assets/key.png";
import Styles from "./Header.module.css";

import Login from '../../components/Login/Login';
import Adminuser from '../../components/Adminuser/Adminuser';
import Signup from '../../components/Signup/Signup';
import ShowProfil from '../../components/ShowProfil/ShowProfil';

//On integre les balises de navigation de react route
function Header() {
    const [isShowFormLogin, setShowFormLogin] = useState(false);
    const [isShowFormSignup, setShowFormSignup] = useState(false);
    const [isShowProfil, setShowProfil] = useState(false);
    const [isAdminUser, setAdminUser] = useState(false);
    const [cookies] = useCookies(['auth-token']);
    const [body, setBody] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const cookie = new Cookies();
    let token = cookies['auth-token'];
    const userId = cookies['userId'];
    const isAdmin = cookies['isAdmin'];
    const togglePopup = (type) => {
        if (type === 'signin') {
            setShowFormLogin(true)
        } else if (type === 'signup') {
            setShowFormSignup(true)
        } else if (type === 'profil') {
            if (isAdmin === 'true') {
                setAdminUser(true)
            } else {
                setShowProfil(true)
            }
        } else {
            setShowFormLogin(false);
            setShowFormSignup(false);
            setAdminUser(false);
            setShowProfil(false);
        }
        setIsOpen(!isOpen);
    }

    const logout = () => {
        cookie.remove('auth-token');
        cookie.remove('userId');
        cookie.remove('isAdmin');

        token = false;
        window.location.href = "/";
    };

    return (
        <header className={Styles.header}>
            {isOpen && (
                <div className={Styles.popup__wrapper}>
                    <div className={Styles.popup} >
                        <span onClick={togglePopup} className={Styles.popup__close}><i className="fa-regular fa-circle-xmark"></i></span>
                        {isShowFormLogin && (
                            <Login key="1" />
                        )}
                        {isShowFormSignup && (
                            <Signup key="2" />
                        )}
                        {isAdminUser && (
                            <Adminuser key="3" />
                        )}
                        {isShowProfil && (
                            <ShowProfil key="4" />
                        )}
                    </div>
                </div >
            )}

            <nav className={Styles.header__nav}>
                <input className={Styles.checkbox} type="checkbox" name="" id="" />
                <div className={Styles.hamburgerlines}>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <NavLink to="/" className={Styles.header__nav__logo}>
                    <img src={logo} alt="logo" />
                </NavLink>
                <div className={Styles.menu_items}>
                    <ul className={Styles.header__menu}>
                        <NavLink to="/">
                            {({ isActive }) => (
                                <li className={isActive ? Styles.header__menu__item__active : Styles.header__menu__item}>
                                    Home
                                </li>
                            )}
                        </NavLink>
                        <NavLink to="logos">
                            {({ isActive }) => (
                                <li
                                    className={
                                        isActive ? Styles.header__menu__item__active : Styles.header__menu__item
                                    }
                                >
                                    Gallery
                                </li>
                            )}
                        </NavLink>
                        <NavLink to="About">
                            {({ isActive }) => (
                                <li
                                    className={
                                        isActive ? Styles.header__menu__item__active : Styles.header__menu__item
                                    }
                                >
                                    About
                                </li>
                            )}
                        </NavLink>
                    </ul>
                    <div className={Styles.header__session}>
                        {token ? (
                            <>
                                <button className={Styles.header__session__profil} onClick={() => togglePopup('profil')}>
                                    <i className="fas fa-user" aria-hidden="true"></i>
                                </button>
                                <button
                                    onClick={() => {
                                        logout();
                                    }}
                                    className={Styles.header__session__signin}
                                >
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <button className={Styles.header__session__signup} onClick={() => togglePopup('signup')}>
                                    <img src={keyz} alt="key" />
                                </button>
                                <button className={Styles.header__session__signin} onClick={() => togglePopup('signin')}>Sign in</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header >
    );
}
export default Header;
