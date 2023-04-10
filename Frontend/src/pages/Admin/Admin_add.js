import { useState } from "react";
import { useTitleChange } from '../../utils/Hooks/Hooks';
import axios from 'axios';
import { Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';
import CryptoJS from 'crypto-js';
import Styles from './Admin_add.module.css';

function AdminAdd({ modif }) {
    useTitleChange()
    const [cookies] = useCookies(['auth-token'])
    const [Logo, setLogo] = useState();
    const [body, setBody] = useState("");
    const token = cookies['auth-token'];
    const timestemps = Date.now().toString()
    const secretKey = cookies['userId'].slice(0, 16);
    const key = CryptoJS.AES.encrypt(timestemps, secretKey);

    const handleUploadClick = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('https://izeelogo.onrender.com/Logos', Logo, {
                headers: {
                    'authorization': 'Bearer ' + token,
                    'x-general-key': key
                }
            })
            window.location.href = "/logos";
        } catch (err) {
            console.log(err);
        }
    };

    const handleChangeLogo = async (e) => {
        if (e.target.name === 'svg') {
            const file = e.target.files[0].text();
            file.then(svgText => {
                setBody(svgText)
                setLogo({ "svg": svgText });
            })
        } else {
            setBody(e.target.value)
            setLogo({ "svg": e.target.value });
        }
    };

    return (token ? (
        <main className={Styles.admin}>
            <section className={Styles.formAdd}>
                <h2>Créer un logo</h2 >
                <form onSubmit={handleUploadClick}>
                    <textarea name="body" onChange={handleChangeLogo} value={body} rows="20" cols="40" placeholder="Insert inline svg here" required  ></textarea><br />
                    <label for="svg">Upload only SVG files</label><br />
                    <input type="file" name="svg" onChange={handleChangeLogo} accept=".svg" id="svg" />
                    <button type="submit" className={Styles.formAdd} >Créer un logo</button>
                </form>
            </section >
        </main >
    ) : (
        <Navigate replace to="/" />
    )
    )
}
export default AdminAdd 