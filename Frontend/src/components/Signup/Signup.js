//Importation des composants react
import Styles from './Signup.module.css'
import axios from "axios"
import { useState } from "react";
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassoword, setShowPassoword] = useState("");
    const [showConfirmPassoword, setShowConfirmPassoword] = useState("");
    const [error, setError] = useState("")
    const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const handleSubmitSignup = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            throw setError("Passwords don't match")
        }
        console.log(regexMail.test(email))
        if (!regexMail.test(email)) {
            throw setError("The E-mail is not conformed")
        } else {

            try {
                const response = await axios.post("http://127.0.0.1:3000/users/signup", {
                    email,
                    password
                });
                // Redirection vers la page protegé  
                window.location.href = "/";

            } catch (err) {
                setError("Server error perhapse Email exist")
                throw console.log(err);

            }

        }


    };
    return (
        <form onSubmit={handleSubmitSignup} className={Styles.signup} >
            <h2>Sign up</h2>
            <p>Welcome, please enter  your details.</p>

            <div className={Styles.signup__input}>
                <label htmlFor="email" className={Styles.signup__input__label}>Email</label>
                <div className={Styles.signup__input__flex}>
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        id="email"
                    />
                    <span className={Styles.signup__icone}><i className="fas fa-envelope" aria-hidden="true"></i></span>
                </div>
            </div>

            <div className={Styles.signup__input}>
                <label htmlFor="password" className={Styles.signup__input__label}>Password</label>
                <div className={Styles.signup__input__flex}>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password"
                    />
                    <span>
                        <input className={Styles.signup__showPassword} type="checkbox" onClick={(event) => setShowPassoword(event.target.value)} />
                        <label className={Styles.signup__icone}><i className="fas fa-eye" aria-hidden="true"></i></label>
                    </span>
                </div>
            </div>

            <div className={Styles.signup__input}>
                <label htmlFor='confirmPassword' className={Styles.signup__input__label}> Confirm password</label>
                <div className={Styles.signup__input__flex}>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        id="confirmPassword"
                    />
                    <span>
                        <input className={Styles.signup__showPassword} type="checkbox" onClick={(event) => setShowConfirmPassoword(event.target.value)} />
                        <label className={Styles.signup__icone}><i className="fa-regular fa-eye" aria-hidden="true"></i></label>
                    </span>
                </div>
            </div>

            < button type="submit" className="signup__submit" > Create an account</button >
            <p className={Styles.login__signup}>Already have an account ?  signup </p>
            {
                error && (
                    <p className='error'>{error} </p>
                )
            }


        </form >

    )
}
export default Signup
