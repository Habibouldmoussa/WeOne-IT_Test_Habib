import axios from "axios"
import { useState } from "react";
import { useCookies } from 'react-cookie'
import Styles from "./Login.module.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassoword, setShowPassoword] = useState("");
    const [cookies, setCookie] = useCookies(['auth-token'])

    const [error, setError] = useState("")
    const [maxAge, setMaxAge] = useState(" 'max-age': 3600")

    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("https://izeelogo.onrender.com/users/login", {
                email,
                password
            });

            const token = response.data.token;
            const userId = response.data.userId;
            const isAdmin = response.data.isAdmin;

            console.log(maxAge);
            setCookie("auth-token", token, { "path": '/', })
            setCookie("userId", userId, { "path": '/' })
            setCookie("isAdmin", isAdmin, { "path": '/' })

            // Redirection vers la page protegé

            window.location.href = "/logos";
        } catch (err) {
            //throw setError(err)
            throw console.log(err);

        }
    };

    return (
        <form onSubmit={handleSubmitLogin} className={Styles.login} >
            <h2>Login</h2>
            <p>Welcome, please enter  your details.</p>

            <div className={Styles.login__input}>
                <label htmlFor="email" className={Styles.login__input__label}>Email</label>
                <div className={Styles.login__input__flex}>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        id="email"
                    />
                    <span className={Styles.login__icone}><i className="fa-regular fa-envelope" aria-hidden="true"></i></span>
                </div>
            </div>
            <div className={Styles.login__input}>
                <label htmlFor="password" className={Styles.login__input__label}>Password</label>
                <div className={Styles.login__input__flex}>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                    />
                    <span>
                        <input className={Styles.login__showPassword} type="checkbox" onClick={(event) => setShowPassoword(event.target.value)} />
                        <label className={Styles.login__icone}><i className="fa-regular fa-eye" aria-hidden="true"></i></label>
                    </span>
                </div>
            </div>
            <p className={Styles.login__feature}><label><input type="checkbox" onClick={(event) => setMaxAge(" ")} />Remember me</label> <span>Forgot password ?</span></p>
            <button type="submit" className="login__submit" > Log in </button >
            <p className={Styles.login__signup}>Don’t have an account ? Sign up</p>
            {error && (
                <p className='error'>{error} </p>
            )}
        </form >
    )
};
export default Login