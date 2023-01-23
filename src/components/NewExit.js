import styled from "styled-components"
import { Link } from "react-router-dom"
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';
import { New } from "./NewEntry";

export default function NewEntry(props){
    const navigate = useNavigate();
    const [entrar, setEntrar] = React.useState('Salvar Saída')
    console.log(props.dadossaida)
    const config = {
        headers: {
            id: props.dadosusuario.id}
    }
    return(
        <New>
            <p className="title">Nova Saída</p>
            <div className="data">
                <input type='number' placeholder="Valor"  disabled={props.habilitado} onChange={e => props.setDadosSaida({ ...props.dadossaida, value: parseInt(e.target.value) })}></input>
                <input placeholder="Descrição"  disabled={props.habilitado} onChange={e => props.setDadosSaida({ ...props.dadossaida, description: e.target.value })}></input>
                <button onClick={() => {
                    console.log({...props.dadosentrada, ...props.dadosusuario.id})
                        setEntrar('')
                        props.setHabilitado(true)
                        axios.post(`https://carterita-api.onrender.com/newentryorexit`, {...props.dadossaida, type: 'exit'}, config).then((res) => {
                            props.setHabilitado(false);
                            navigate('/home')
                        }).catch(() => {
                            alert('Não foi possível cadastrar a entrada')
                            props.setHabilitado(false)
                            setEntrar('Salvar Saída')

                        })
                    }} >{entrar === 'Salvar Saída' ? entrar : <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />}</button>
                <button>Voltar</button>
                {/* Tem que fazer um post pra /newentry e enviar o valor, a decrição e o  id do usuário(esse vem de dadosusuario) */}

            </div>
        </New>
    )
}
