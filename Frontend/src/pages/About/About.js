//Importation des composants react
import Styles from './About.module.css';
import { useTitleChange } from '../../utils/Hooks/Hooks'
//Integration du banner et des collapses 
function About() {
        useTitleChange()
        return (
                <main className={Styles.about}>



                </main>
        )
}
export default About 