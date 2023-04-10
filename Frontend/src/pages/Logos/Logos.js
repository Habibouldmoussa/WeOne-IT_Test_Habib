//Importation des composants react
import { useTitleChange, useFetch } from '../../utils/Hooks/Hooks';
import { NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie';
import CryptoJS from 'crypto-js';
import Styles from './Logos.module.css'
import Carrousel from '../../components/Carrousel/Carrousel'
function Logos() {
    useTitleChange()
    const [cookies] = useCookies(['auth-token'])
    const token = cookies['auth-token'];
    const timestemps = Date.now().toString()
    const secretKey = cookies['userId'] && cookies['userId'].slice(0, 16);
    const key = secretKey && CryptoJS.AES.encrypt(timestemps, secretKey);
    const { isLoading, data, error } = useFetch('https://izeelogo.onrender.com/logos/', {
        headers: {
            'authorization': 'Bearer ' + token,
            'x-general-key': key
        }
    });
    if (error) {
        return (
            <main className={Styles.logo} >
                <span>To view the logos, please log in or create an account.
                </span>
            </main>
        )
    }

    /* On verifie si le Article existe sinon on redirige l'utilisateur vers la page d'erreur
    *et on affiche le loader en attendant les données  
    */
    return (

        isLoading ? (
            <main>
                <div className='loader'></div>
            </main>
        ) : (
            data.length !== 0 ? (
                <Carrousel data={data} />
            ) : (
                <main className={Styles.logo}>
                    <NavLink to="/adminAdd" >➕ Ajouter un logo</NavLink>
                </main>
            )
        ))

}
export default Logos 