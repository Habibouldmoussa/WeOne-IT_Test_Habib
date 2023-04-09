//Importation des composants react
import pen from '../../assets/pen-tool-2.svg'
import pourcent from '../../assets/discount-shape.svg'
import magicpen from '../../assets/magicpen.svg'
import Styles from './Home.module.css'
import { useTitleChange } from '../../utils/Hooks/Hooks'
import { NavLink } from "react-router-dom";
function Home() {
    useTitleChange()
    return (
        <main className={Styles.home}>
            <section className={Styles.home__create}>
                <h1>Create your logo online in a
                    Few clicks for Free.</h1>
                <NavLink to="/Logos" >
                    <button className={Styles.home__create__button}>Create your free logo →</button>
                </NavLink>
            </section>
            <section className={Styles.home__pointe}>
                <div className={Styles.home__pointe__item}>
                    <div className={Styles.home__pointe__img}><img src={pen} alt="pen" /></div>
                    <p>Create a Professional
                        Logo Easily and for Free</p>
                </div>
                <div className={Styles.home__pointe__item}>
                    <div className={Styles.home__pointe__img}><img src={pourcent} alt="pourcent"></img></div>
                    <p>A Highly Efficient and
                        Totally Free Logo Creator</p>
                </div>
                <div className={Styles.home__pointe__item}>
                    <div className={Styles.home__pointe__img}><img src={magicpen} alt="magicpen"></img></div>
                    <p>A Team of Graphic
                        Designers Ready to Help </p>
                </div>
                <div></div>
            </section>
        </main>

    )
}
export default Home 