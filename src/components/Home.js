import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';
import { AiFillDelete } from 'react-icons/ai'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'


export default function Home(props) {
    const [data, setData] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [render, setRender] = React.useState(true)
    const navigate = useNavigate();
   
    const config = {
        headers: {
            id: props.dadosusuario.id
        }
    }

    let values = 0

    function soma(i){
    
        if (i.type === 'entry') {
            return values += parseFloat(i.value)
        } else {
            return values -= parseFloat(i.value)
        }
    
    }


    React.useEffect(() => {
       
        axios.get(`${process.env.REACT_APP_API_URL}/home`, config).then((res) => {
            console.log(res)
            setData(res.data)
            res.data.map(i => soma(i))
            setTotal(values.toFixed(2))
        })
    }, [])

    
    return (
        <HomeStyled >
            <header>
                <p>{`Hola, ${props.dadosusuario.name}!`}</p>
                <img src="assets/img/sair.png" onClick={() => {
                    navigate('/')
                    window.location.reload(true)
                }}></img>
            </header>

            <section>
                {data.length === 0 ? <p>Não há registros de entrada ou saída</p> :
                    <ExpenseList>
                        {

                            data.map(i => <Expense type={i.type}><h1>{i.date}</h1><h2>{i.description}</h2><h3>{`R$ ${i.value}`}</h3><AiFillDelete onClick={() => {
                                axios.delete(`${process.env.REACT_APP_API_URL}/${i._id}`, config).then(res => {
                                    setData(res.data)
                                    res.data.map(i => soma(i))
                                    setTotal(values.toFixed(2))
                                })


                            }} className="trash"></AiFillDelete>  </Expense>

                            )

                        }
                    </ExpenseList>}
                <Total total={total}><h1>SALDO</h1><h2>{`R$ ${total}`}</h2></Total>
            </section>

            <footer>
                <div className="plusdiv"><Link to='/nova-entrada'><FaPlusCircle className="plus"></FaPlusCircle></Link></div>
                <div className="minusdiv"><Link to='/nova-saida'><FaMinusCircle className="minus"></FaMinusCircle></Link></div>

            </footer>
        </HomeStyled>
    )
}

const Filtro = styled.input`
`

const Total = styled.div`
    margin-top: 10px;
    width:100%;
    display:flex;
    justify-content: space-between;
    h2{
        color: ${props => props.total > 0 ? '#03AC00' : '#C70000'}
    }
`

const ExpenseList = styled.div`
    overflow-y: auto;
    width:100%;
    justify-content: flex-start;
    flex-direction: column;
    align-items:center;
    display:flex;
    z-index: 2;
    div:nth-child(2n+1){
        background-color: #daefd4;
        
    }
    
`

const Expense = styled.div`
border-radius: 10px;
    align-items: center;
    width:100%;
    display:flex;
    justify-content: space-between;
    margin-top:10px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 19px;
    text-align: right;
    animation: animation-expense 2s linear forwards;
    @keyframes animation-expense {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
    }
    .trash{
        color:red;
        width: 25%;
        display: flex;
        text-align: right;
    }

    h3{
        color: ${props => props.type === 'entry' ? '#03AC00' : '#C70000'} ;
        width: 25%;
        text-align: left;
    }
    h2{
        text-align: left;
        color: #000000;
        width: 25%;
    }
    h1{
        color: #C6C6C6;
        width: 25%;
        text-align: left;
    }

`

const HomeStyled = styled.div`

.minus{
    color:red;
}

min-height: 100vh;
background:#1b7a00;
padding-left: 24px;
padding-right: 24px;
header{
    height: 10vh;
    color: #FFFFFF;
    display:flex;
    justify-content:space-between;
    align-items:center;
    
    p{
        
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        animation: animation-title 3s ease-in-out forwards;
        position: absolute;
        left: -100%;
        opacity: 0;
    }

    @keyframes animation-title {
    0% {
        left: -100%;
        opacity: 0;
    }
    100% {
        left: 50%;
        transform: translateX(-50%);
        opacity: 1;
    }
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
    height: 75vh;
    padding:20px;
    background:white;
    border-radius: 5px;
    display:flex;
    justify-content: space-between;
    flex-direction: column;
    align-items:center;
    box-shadow: 0px 0px 5px 3px rgb(0 0 0 / 40%);

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
    height: 15vh;
    padding-top: 14px;
    padding-bottom: 14px;
    box-sizing: border-box;
    display:flex;
    justify-content:space-between;
    align-items:center;
    

    .plus, .minus{
    color: green;
    font-size: 45px;
    background-color: white;
    border-radius: 50%;
    right: 5%;
    bottom: 5%;

}
.minus{
    color: red;
}

div{
    animation: animation-div 2s ease-in-out forwards;
    background:#3a9a1f;
    height: 100%;
     width: 49%;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 5px;
    background-size: 110% 200%;
    @keyframes animation-div {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
    }
    }
    
}
`