import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';

export default function Home() {
    return (
        <HomeStyled>
            <header>
                <p>Olá, Fulano</p>
                <img src="assets/img/sair.png"></img>
            </header>

            <section>
            <p>Não há registros de entrada ou saída</p>
            </section>

            <footer>
            <div><img src="assets/img/+.png"></img></div>
            <div><img src="assets/img/-.png"></img></div>

            </footer>
        </HomeStyled>
    )
}

const HomeStyled = styled.div`
background:#f98c00;
height: 100vh;
padding-left: 24px;
padding-right: 24px;
header{
    height: 12%;
    color: #FFFFFF;
    display:flex;
    justify-content:space-between;
    align-items:center;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 55px;
    }
    img{
        width: 50px;
    }
}
section{
    height:67%;
    background:white;
    border-radius: 5px;
    display:flex;
    justify-content:center;
    align-items:center;
    p{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    text-align: center;
    color: #868686;
    }
}
footer{
    height: 21%;
    padding-top: 14px;
    padding-bottom: 14px;
    box-sizing: border-box;
    display:flex;
    justify-content:space-between;
    align-items:center;
    div{
        background:#ffb12a;
        height: 100%;
        width: 49%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        img{
            width:50px;
        }
    }
}
`