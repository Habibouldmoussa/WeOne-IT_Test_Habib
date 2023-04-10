//Importation des composants react
import axios from "axios"
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import CryptoJS from 'crypto-js';
import Styles from './ShowProfil.module.css'

function ShowProfil() {
    const [userData, setUserData] = useState("");
    const [cookies, setCookie] = useCookies(['auth-token'])
    let token = cookies['auth-token'];
    const timestemps = Date.now().toString()
    const secretKey = cookies['userId'] && cookies['userId'].slice(0, 16);
    const key = secretKey && CryptoJS.AES.encrypt(timestemps, secretKey);
    const userId = cookies['userId'];
    useEffect(() => {
        async function getUsers() {
            const response = await axios.get("https://izeelogo.onrender.com/users/" + userId, {
                headers: {
                    'authorization': 'Bearer ' + token,
                    'x-general-key': key
                }
            })
            const user = response.data;
            console.log(user);
            setUserData(user)

        }
        getUsers()
    }, []);

    return (
        <>
            <h2>Profil</h2>
            <h3>Email</h3>
            <p>{userData.email}</p>
            <h3>Role</h3>
            <p>{userData.isAdmin ? "Adminstrator" : "Costumer"}</p>

        </>
    )
}
export default ShowProfil
