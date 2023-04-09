//Importation des composants react
import Styles from './Carrousel.module.css'
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import CryptoJS from 'crypto-js';
import React from 'react';
import { useRef } from 'react';
import rgb2hex from '../../utils/rgb2hex'
import styled from 'styled-components'
function Carousel({ data }) {
    const svgRef = useRef(null);
    //On crée un state pour stocker l'image courente 
    let [current, setCurrent] = useState(0)
    const [cookies] = useCookies(['auth-token'])
    const token = cookies['auth-token'];
    const isAdmin = cookies['isAdmin'];
    const timestemps = Date.now().toString();
    const secretKey = cookies['userId'].slice(0, 16);
    const key = CryptoJS.AES.encrypt(timestemps, secretKey);
    const [color1, setColor1] = useState();
    const [color2, setColor2] = useState();
    const [style1, setStyle1] = useState();
    const [style2, setStyle2] = useState();
    const [style3, setStyle3] = useState();
    const [style4, setStyle4] = useState();
    const deleteLogo = (id) => {
        axios.delete('http://127.0.0.1:3000/logos/' + id, {
            headers: {
                'authorization': 'Bearer ' + token,
                'x-general-key': key
            },
        })
            .then((data) => { console.log(data); window.location.href = "/logos"; })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        const palette = svgRef.current.querySelector("path.cls-1")
        const style = getComputedStyle(palette).fill
        const color1 = rgb2hex(style)
        setColor1(color1)
        const palette2 = svgRef.current.querySelector("path.cls-2")
        const style2 = getComputedStyle(palette2).fill
        const color2 = rgb2hex(style2)
        setColor2(color2)
        const font1 = svgRef.current.querySelector("#text>text")
        const style3 = getComputedStyle(font1).fontFamily
        setStyle1(style3)
        const style4 = getComputedStyle(font1).color
        setStyle2(style4)
        const font2 = svgRef.current.querySelector("#text-2>text")
        const style5 = getComputedStyle(font2).fontFamily
        setStyle3(style5)
        const style6 = getComputedStyle(font2).color
        setStyle4(style6)
    }, [svgRef, current]);

    const Palette1 = styled.div`        
        background-color: ${color1};
        box-shadow: 0px 24px 40px rgba(72, 52, 193, 0.25);
        border-radius: 24px;    
        width : 80%;
        height : 80%;
        margin: 50px 0px 50px 0 ; 
    `
    const Palette2 = styled.div`        
        background-color: ${color2};    
        border-radius: 24px;
        box-shadow: 0px 24px 40px rgba(72, 52, 193, 0.25);
        width : 80%;
        height : 80%;
        margin: 50px 0px 50px 0 ; 
        
    `
    const Font1 = styled.li`        
        font-family: ${style1};    
        color: ${style2}
        font-weight : bold;
    `
    const Font2 = styled.li`        
        font-family: ${style3};    
        color: ${style4};      
    `
    //On calcule le nombre d'SVG 
    let length = +data.length;

    //On créer les deux fonction pour naviguer dans le carrousel  
    const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
    const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
    //On verifie si le nombre d'images dépassent une si oui on affiche les bouton de navigation et le compteur
    return (data && (
        <main className={Styles.carousel} >
            <section className={Styles.carousel__description}>
                {isAdmin === "true" && (
                    <NavLink to="/adminAdd" > ➕ Ajouter un logo</NavLink>
                )}
                <h3>Color palette</h3>
                <div className={Styles.carousel__description__palette}>
                    <div className={Styles.carousel__description__palette__item}>
                        <Palette1></Palette1>
                        <span>{color1}</span>
                    </div>
                    <div className={Styles.carousel__description__palette__item}>
                        <Palette2></Palette2>
                        <span>{color2}</span>
                    </div>
                </div>
                <div className={Styles.carousel__description__font}>
                    <h3>Fonts</h3>
                    <ul>
                        <Font1>{style1}</Font1>
                        <Font2>{style3}</Font2>
                    </ul>
                </div>
            </section>
            <section className={Styles.carousel__logo}>
                {isAdmin === "true" && (
                    <div className={Styles.carousel__logo__admin}>
                        <NavLink to={`/admin/logos/${data[current]._id}`} ><button><i className="fa-solid fa-pen"></i></button></NavLink>
                        <button onClick={() => { deleteLogo(data[current]._id) }} className="admin__button-sup"><i className="fa-solid fa-trash"></i></button>
                    </div>
                )}

                <div dangerouslySetInnerHTML={{ __html: data[current].svg }} ref={svgRef} />
                {length >= 1 && (
                    <div className={Styles.carousel__logo__button}>
                        <button onClick={() => prevSlide()}>◀</button>
                        <button onClick={() => nextSlide()}>▶</button>
                    </div>
                )}

            </section>
        </main>
    ))

}
export default Carousel