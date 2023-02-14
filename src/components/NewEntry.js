import styled from "styled-components"
import { Link } from "react-router-dom"
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import {IoReturnDownBackOutline} from 'react-icons/io5'
import {BsCheckLg} from 'react-icons/bs'



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
                <input type='number' placeholder="Valor"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, value: parseFloat(e.target.value) })}></input>
                <input placeholder="Descrição"  disabled={props.habilitado} onChange={e => props.setDadosEntrada({ ...props.dadosentrada, description: e.target.value })}></input>
                <Buttons>
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
                <Link to='/home'><button className="return"><IoReturnDownBackOutline ></IoReturnDownBackOutline></button></Link>
                </Buttons>
                
                
                {/* Tem que fazer um post pra /newentry e enviar o valor, a decrição e o  id do usuário(esse vem de dadosusuario) */}

            </div>
        </New>
    )
}


export const Buttons=styled.div`
display: flex;
justify-content: space-between;
`


export const New = styled.div`
min-height: 100vh;
background:#1b7a00;
padding-left: 24px;
padding-right: 24px;
.data{
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
    }
        
    button{
        margin-top:10px;
        width: 100px;
        height: 100px;
        background: #3a9a1f;
        border-radius: 50%;
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