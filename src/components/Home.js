import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';

export default function Home(props) {
    const [data, setData] = React.useState([1])
    console.log(data)
    const config = {
        headers: {
            id: props.dadosusuario.id}
    }
    React.useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/home`, config).then((res) => {
            console.log(res)
            setData(res.data)
    })
    }, [])

    return (
        <HomeStyled type = {data.type}>
            <header>
                <p>{`Hola, ${props.dadosusuario.name}!`}</p>
                <img src="assets/img/sair.png"></img>
            </header>

            <section>
            {data.length===0 ? <p>Não há registros de entrada ou saída</p> : 
            <>
            {data.map(i => <><div><h1>{i.date}</h1><h2>{i.description}</h2><h3>{`R$ ${i.value}`}</h3>  </div></>)}
            </>}
            </section>

            <footer>
            <div><Link to='/nova-entrada'><img title="Adicionar nova entrada" src="assets/img/+.png"></img></Link></div>
            <div><Link to='/nova-saida'><img title="Adicionar nova saída" src="assets/img/-.png"></img></Link></div>

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
    padding:20px;
    height:67%;
    background:white;
    border-radius: 5px;
    display:flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items:center;
    p{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    text-align: center;
    color: #868686;
    }
    div{
        width:100%;
        display:flex;
        justify-content: space-between;
        margin-top:10px;
    }
    h3{
       
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