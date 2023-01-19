import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';


export default function Login(props) {
    const navigate = useNavigate();
    const [entrar, setEntrar] = React.useState('Entrar')
    return (

        <Animated animationIn="bounceInLeft" animationOut="bounceOutLeft" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
            <Home>
                <Imagem>
                    <img src="./assets/img/MyWallet.png"></img>
                </Imagem>
                <Inputs>

                    <input data-test='email-input' type='email' placeholder="email" disabled={props.habilitado} onChange={e => props.setLogin({ ...props.login, email: e.target.value })}></input>
                    <input data-test='password-input' type='password' placeholder="senha" disabled={props.habilitado} onChange={e => props.setLogin({ ...props.login, password: e.target.value })}></input>

                    <Button data-test='login-btn' onClick={() => {
                        setEntrar('')
                        props.setHabilitado(true)
                        axios.post(`${process.env.REACT_APP_API_URL}/login`, props.login).then((resp) => {
                            props.setDadosUsuario(resp)
                            props.setHabilitado(false);
                            console.log(resp)
                            navigate('/home')
                        }).catch(() => {
                            alert('Usuário ou senha incorretos')
                            props.setHabilitado(false)
                            setEntrar('Entrar')

                        })
                    }} > {entrar === 'Entrar' ? entrar : <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="white"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />}</Button>

                </Inputs>
                <Link to='/cadastro' data-test='signup-link'><p className="cadastro" > Não tem uma conta? Cadastre-se</p></Link>

            </Home>

        </Animated>



    )
}


const Home = styled.div`
height:100vh;
display:flex;
justify-content: center;
flex-direction: column;
align-items: center;
background: #f98c00;
.cadastro{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
}
`

const Imagem = styled.div`

h1{
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 68.982px;
    line-height: 86px;
    text-align: center;
    color: #126BA5;
`


const Inputs = styled.div`

min-height:160px;
display:flex;
justify-content: space-between;
flex-direction: column;
margin-bottom:25px;
margin-top:30px;
input{
    width: 303px;
    height: 45px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color:  #000000;
}
`

const Button = styled.button`
    background: #f4b961;
    border-radius: 4.63636px;
    width: 303px;
    height: 45px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20.976px;
    color: #FFFFFF;
    display:flex;
    justify-content: center;
    align-items:center;
    transition: all 0.3s linear;
    :hover{
        scale: 0.9;
        
    }
`