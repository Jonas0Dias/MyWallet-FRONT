import styled from "styled-components"
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import {IoReturnDownBackOutline} from 'react-icons/io5'
import {BsCheckLg} from 'react-icons/bs'
import { Animated } from "react-animated-css";

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
           
            <div className="data">

            <Animated animationIn="bounceInDown" animationOut="bounceOutUp" animationInDuration={1500} animationOutDuration={1000} isVisible={true}>

            <p className="title">Nova Entrada</p>

            
                <input type='number' placeholder="Valor"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, value: parseFloat(e.target.value) })}></input>
                <input placeholder="Descrição"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, description: e.target.value })}></input>
                </Animated>
                <Buttons>
                <Animated animationIn="bounceInLeft" animationOut="bounceOutUp" animationInDuration={1500} animationOutDuration={1000} isVisible={true}>
                <button onClick={() => {
                        setEntrar('')
                        props.setHabilitado(true)
                        axios.post(`${process.env.REACT_APP_API_URL}/newentryorexit`, {...props.dadosentrada, type: 'entry'}, config).then((res) => {
                            props.setHabilitado(false);
                            navigate('/home')
                        }).catch(() => {
                            alert('Não foi possível cadastrar a entrada')
                            props.setHabilitado(false)
                            setEntrar('Salvar Entrada')

                        })
                    }} >{entrar === 'Salvar Entrada' ? <BsCheckLg></BsCheckLg> : <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />}</button>
                </Animated>
                <Animated animationIn="bounceInRight" animationOut="bounceOutUp" animationInDuration={1500} animationOutDuration={1000} isVisible={true}>
                <button className="return" onClick={() => navigate('/home')}><IoReturnDownBackOutline ></IoReturnDownBackOutline>
                </button>
                </Animated>
                </Buttons>
                
                
                {/* Tem que fazer um post pra /newentry e enviar o valor, a decrição e o  id do usuário(esse vem de dadosusuario) */}

            </div>
        </New>
    )
}


export const Buttons=styled.div`
display: flex;
width: 100%;
justify-content: space-between;
/* justify-content: space-between; */
`


export const New = styled.div`
min-height: 100vh;
background:#1b7a00;
padding-left: 24px;
padding-right: 24px;
display: flex;
align-items: center;
.data{
    width: 100%;
    a{
        text-decoration: none;
        
    }
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    input{
        margin-top:10px;
        width: 100%;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
        &::placeholder{
            font-size: 20px;
            text-align: center;
        }
    }
        
    button{
        margin-top:10px;
        width: 40vw;
        height: 100px;
        background: #3a9a1f;
        border-radius: 15px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 23px;
        color: #FFFFFF;
        border-style: none;
        justify-content: center;
        align-items: center;
        display:flex;
    }
    .return{
        background-color: #dd2d2d;
        /* width: 50%; */
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
    text-align: center;
}


`