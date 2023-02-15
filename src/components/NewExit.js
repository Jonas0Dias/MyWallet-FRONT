import styled from "styled-components"
import { Link } from "react-router-dom"
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';
import { New } from "./NewEntry";
import { Buttons } from "./NewEntry";
import { IoReturnDownBackOutline } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'

export default function NewEntry(props) {
    const navigate = useNavigate();
    const [entrar, setEntrar] = React.useState('Salvar Saída')
    console.log(props.dadossaida)
    const config = {
        headers: {
            id: props.dadosusuario.id
        }
    }
    return (
        <New>


            <div className="data">

                <Animated animationIn="bounceInDown" animationOut="bounceOutUp" animationInDuration={1500} animationOutDuration={1000} isVisible={true}>
                    <p className="title">Nova Saída</p>

                    <input type='number' placeholder="Valor" disabled={props.habilitado} onChange={e => props.setDadosSaida({ ...props.dadossaida, value: parseFloat(e.target.value) })}></input>
                    <input placeholder="Descrição" disabled={props.habilitado} onChange={e => props.setDadosSaida({ ...props.dadossaida, description: e.target.value })}></input>
                </Animated>

                <Buttons>
                    <Animated animationIn="bounceInLeft" animationOut="bounceOutUp" animationInDuration={1500} animationOutDuration={1000} isVisible={true}>
                        <button onClick={() => {
                            console.log({ ...props.dadosentrada, ...props.dadosusuario.id })
                            setEntrar('')
                            props.setHabilitado(true)
                            axios.post(`${process.env.REACT_APP_API_URL}/newentryorexit`, { ...props.dadossaida, type: 'exit' }, config).then((res) => {
                                props.setHabilitado(false);
                                navigate('/home')
                            }).catch(() => {
                                alert('Não foi possível cadastrar a entrada')
                                props.setHabilitado(false)
                                setEntrar('Salvar Saída')

                            })
                        }} >{entrar === 'Salvar Saída' ? <BsCheckLg></BsCheckLg> : <ThreeDots
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
        </New >
    )
}
