import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';

export default function Home(props) {
    const [data, setData] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const navigate=useNavigate();
    console.log(total)
    const config = {
        headers: {
            id: props.dadosusuario.id}
    }
    React.useEffect(() => {
        axios.get(`https://carterita-api.onrender.com/home`, config).then((res) => {
            console.log(res)
            setData(res.data)
            let values=0

            res.data.map(i => {
                if (i.type==='entry'){
                    return values += parseInt(i.value)
                } else{
                    return values -= parseInt(i.value)
                }
                 
                  
    })
            setTotal(values)
    })}, [])

    return (
        <HomeStyled >
            <header>
                <p>{`Hola, ${props.dadosusuario.name}!`}</p>
                <img src="assets/img/sair.png" onClick={() => {
                    navigate('/')
                    window.location.reload(true)}}></img>
            </header>

            <section>
            {data.length===0 ? <p>Não há registros de entrada ou saída</p> : 
            <ExpenseList>
            {
                
            data.map(i => <Expense type = {i.type}><h1>{i.date}</h1><h2>{i.description}</h2><h3>{`R$ ${i.value}`}</h3>  </Expense>
            
            )
            
            }
            </ExpenseList>}
            <Total total={total}><h1>SALDO</h1><h2>{`R$ ${total}`}</h2></Total>
            </section>

            <footer>
            <div><Link to='/nova-entrada'><img title="Adicionar nova entrada" src="assets/img/+.png"></img></Link></div>
            <div><Link to='/nova-saida'><img title="Adicionar nova saída" src="assets/img/-.png"></img></Link></div>

            </footer>
        </HomeStyled>
    )
}


const Total=styled.div`
    margin-top: 10px;
    width:100%;
    display:flex;
    justify-content: space-between;
    h2{
        color: ${props => props.total>0 ?  '#03AC00' : '#C70000'}
    }
`

const ExpenseList=styled.div`
    overflow-y: auto;
    width:100%;
    justify-content: flex-start;
    flex-direction: column;
    align-items:center;
    display:flex;
`

const Expense=styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    margin-top:10px;
    font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
    h3{
        color: ${props => props.type==='entry' ? '#03AC00' : '#C70000' } 
    }
    h2{
        color: #000000;
    }
    h1{
        color: #C6C6C6;
    }

`

const HomeStyled = styled.div`
height: 650px;
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