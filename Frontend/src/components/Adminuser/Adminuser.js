//Importation des composants react
import Styles from './Adminuser.module.css'
import { Navigate } from "react-router-dom"
import { useState } from "react";
import CryptoJS from 'crypto-js';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useFetch } from '../../utils/Hooks/Hooks';

function Adminuser() {
    const [cookies] = useCookies(['auth-token'])
    const token = cookies['auth-token'];
    const isAdmin = cookies['isAdmin'];
    const timestemps = Date.now().toString();
    const secretKey = cookies['userId'].slice(0, 16);
    const key = CryptoJS.AES.encrypt(timestemps, secretKey);
    const [email, setEmail] = useState("");
    const [Role, setRole] = useState("");
    const [user, setUser] = useState();
    const [password, setPassword] = useState("");

    const { isLoading, data, error } = useFetch('https://izeelogo.onrender.com/users/', {
        headers: {
            'authorization': 'Bearer ' + token,
            'x-general-key': key
        }
    });
    if (error) {
        return <span>Oups il y a eu un problème</span>
    }
    const deleteUser = (id) => {
        axios.delete('https://izeelogo.onrender.com/users/' + id, {
            headers: {
                'authorization': 'Bearer ' + token,
                'x-general-key': key
            },
        })
            .then((data) => { console.log(data); window.location.href = "/"; })
            .catch((err) => console.error(err));
    }
    const handleCreateUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://izeelogo.onrender.com/users', user, {
                headers: {
                    'authorization': 'Bearer ' + token,
                    'x-general-key': key
                },
            })
            window.location.href = "/"
        } catch (err) {
            console.log(err);
        }
    }

    const handleChangeUser = async (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            setUser({ ...user, [e.target.name]: e.target.value });
        } else if (e.target.name === 'isAdmin') {
            setRole(e.target.value);
            setUser({ ...user, [e.target.name]: e.target.value });
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (isLoading ? (
        <div className='loader'></div>
    ) : (
        data ? (
            <>
                <table width="100%">
                    <tbody>
                        <tr>
                            <td width="50%">Email</td>
                            <td>Role</td>
                            <td align='center'>Admin</td>
                        </tr>
                    </tbody>
                </table>

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input type="email" name="email" onChange={handleChangeUser} />
                                <input type="password" name="password" onChange={handleChangeUser} />
                            </td>
                            <td>
                                <select name="isAdmin" onChange={handleChangeUser}>
                                    <option value="false" >Costumer</option>
                                    <option value="true" >Administrator</option>
                                </select>
                            </td>
                            <td>
                                <button type="submit" onClick={handleCreateUser} className={Styles.adminuser__adduser} >➕</button>
                            </td>
                        </tr>
                    </tbody>
                </table >

                {
                    data.map((element) => (
                        element._id !== "642bfbe47180b9d5fe876ca7" && (
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            {element.email}
                                        </td>
                                        <td align='right'>
                                            {element.isAdmin ? "Adminstrator" : "Customer"}
                                        </td>
                                        <td align='right'>
                                            <a href="#" onClick={(e) => { deleteUser(element._id) }} className="admin__button-sup"><i className="fa-solid fa-trash"></i></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        ))
                    )
                }
            </>
        ) : (
            <Navigate replace to="/" />
        )
    ))
}
export default Adminuser