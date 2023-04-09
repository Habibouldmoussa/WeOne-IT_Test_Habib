//Importation des composants react
import { useTitleChange, useFinditem } from '../../utils/Hooks/Hooks'
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";
import CryptoJS from 'crypto-js';
import { useCookies } from 'react-cookie';
import Styles from './Admin_modif.module.css'
//import path from 'path';
function AdminModif() {
    useTitleChange()
    const [cookies] = useCookies(['auth-token'])
    const [Logo, setLogo] = useState("");
    const [body, setBody] = useState("");

    const token = cookies['auth-token'];
    const timestemps = Date.now().toString()
    const secretKey = cookies['userId'].slice(0, 16);
    const key = CryptoJS.AES.encrypt(timestemps, secretKey);
    //Récuperation de l'id de l'URL 
    const { id } = useParams()

    //Récuperation du Logo par son id
    const { isLoadingItem, dataItem, errorItem } = useFinditem('http://127.0.0.1:3000/Logos/', id, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'x-general-key': key
        },
    })

    useEffect(() => {
        setLogo(dataItem.svg);
        setBody(dataItem.svg);
    }, [dataItem])
    if (errorItem) {
        return <span>Oups il y a eu un problème</span>
    }

    const handleUploadClick = (e) => {
        e.preventDefault()
        axios.put('http://127.0.0.1:3000/Logos/' + id, Logo, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'x-general-key': key
            },
        })
            .then((data) => { console.log(data); window.location.href = "/logos"; })
            .catch((err) => console.error(err));

    };
    const handleChangeLogo = async (e) => {
        if (e.target.name === 'file') {
            const file = e.target.files[0].text();
            file.then(svgText => {
                setBody(svgText)
            })
        } else {
            setBody(e.target.value)
            setLogo({ ...Logo, "svg": e.target.value });
        }
    }
    return (
        <main className={Styles.AdminModif}>
            {isLoadingItem ? (
                <div className='loader'></div>
            ) : (dataItem || token ? (
                <main className={Styles.admin}>
                    <section className="">
                        <h2>Modifier un logo</h2>
                        <form onSubmit={handleUploadClick} className={Styles.admin__modif}>
                            <textarea name="body" onChange={handleChangeLogo} value={body} rows="20" cols="40" required ></textarea><br />
                            <input type="file" name="svg" onChange={handleChangeLogo} accept=".svg" />
                            <button type="submit" >Modifier cet logo</button>
                        </form>
                    </section>
                </main>
            ) : (
                <Navigate replace to="/" />
            )
            )}
        </main>
    )

}
export default AdminModif