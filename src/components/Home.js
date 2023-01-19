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
            <div><Link to='/nova-entrada'><img src="assets/img/+.png"></img></Link></div>
            <div><Link to='/nova-saida'><img src="assets/img/-.png"></img></Link></div>

            </footer>
        </HomeStyled>
    )
}

export const HomeStyled = styled.div`
background:#1b7a00;
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
        font-size: 25px;
    }
    img{
        width: 25px;
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
    font-size: 25px;
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
        background:#3a9a1f;
        height: 100%;
        width: 49%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        img{
            width:25px;
        }
    }
}

.data{
    display:flex;
    flex-direction:column;
    height:188px;
    justify-content: space-between;
    input{
        width: 100%;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
    }
    button{
        width: 101.5%;
        height: 46px;
        background: #3a9a1f;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
        border-style: none;
    }
    
}
.title{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    padding-bottom: 24px;
    padding-top: 24px;
}


`