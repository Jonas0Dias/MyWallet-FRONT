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
        <HomeStyled>
            <p className="title">Nova Entrada</p>
            <div className="data">
                <input type='number' placeholder="Valor"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, value: parseInt(e.target.value) })}></input>
                <input placeholder="Descrição"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, description: e.target.value })}></input>
                <button onClick={() => {
                    console.log({...props.dadosentrada, ...props.dadosusuario.id, type: 'entry'})
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
                {/* Tem que fazer um post pra /newentry e enviar o valor, a decrição e o  id do usuário(esse vem de dadosusuario) */}

            </div>
        </HomeStyled>
    )
}
