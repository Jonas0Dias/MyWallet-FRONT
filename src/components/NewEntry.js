import styled from "styled-components"
import { Link } from "react-router-dom"
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';
import { HomeStyled } from "./Home";

export default function NewEntry(props){
    const navigate = useNavigate();
    const [entrar, setEntrar] = React.useState('Salvar Entrada')
    console.log(props.dadosusuario)
    const config = {
        headers: {
            id: props.dadosusuario.id}
    }
    console.log({...props.dadosentrada, id: props.dadosusuario.id, type: 'entry'})
    return(
        <New>
            <p className="title">Nova Entrada</p>
            <div className="data">
                <input type='number' placeholder="Valor"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, value: parseInt(e.target.value) })}></input>
                <input placeholder="Descrição"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, description: e.target.value })}></input>
                <button onClick={() => {
                    console.log({...props.dadosentrada, ...props.dadosusuario.id, type: 'entry'})
                        setEntrar('')
                        props.setHabilitado(true)
                        axios.post(`https://carterita-api.onrender.com/newentryorexit`, {...props.dadosentrada, type: 'entry'}, config).then((res) => {
                            props.setHabilitado(false);
                            navigate('/home')
                        }).catch(() => {
                            alert('Não foi possível cadastrar a entrada')
                            props.setHabilitado(false)
                            setEntrar('Salvar Entrada')

                        })
                    }} >{entrar === 'Salvar Entrada' ? entrar : <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />}</button>
                <Link to='/home'><button>Voltar</button></Link>
                {/* Tem que fazer um post pra /newentry e enviar o valor, a decrição e o  id do usuário(esse vem de dadosusuario) */}

            </div>
        </New>
    )
}

export const New = styled.div`
min-height: 100vh;
background:#1b7a00;
padding-left: 24px;
padding-right: 24px;
header{
    height: 80px;
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
    button {
       
        display:flex;
    justify-content: center;
    align-items:center;
    }
}
section{
    height: 431px;
    padding:20px;
    background:white;
    border-radius: 5px;
    display:flex;
    justify-content: space-between;
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
    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
    }
}
footer{
    height: 100px;
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
    a{
        text-decoration: none;
    }
    display:flex;
    flex-direction:column;
    height:188px;
    justify-content: space-between;
    input{
        margin-top:10px;
        width: 100%;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
    }
        
    button{
        margin-top:10px;
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
        justify-content: center;
        align-items: center;
        display:flex;
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