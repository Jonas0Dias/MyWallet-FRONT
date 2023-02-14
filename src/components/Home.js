import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';
import { AiFillDelete,AiFillEdit,AiFillCheckCircle } from 'react-icons/ai'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'
import {MdCancel} from 'react-icons/md'


export default function Home(props) {
    const [data, setData] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const [edit, setEdit] = React.useState(false)
    const[editdata, setEditData] = React.useState({value:"",description:"", id:""})
    const[load, setLoad] = React.useState(false)

    const navigate = useNavigate();
    console.log(total)
    const config = {
        headers: {
            id: props.dadosusuario.id
        }
    }
    

    let values = 0
    const renderHome= function () {
        axios.get(`${process.env.REACT_APP_API_URL}/home`, config).then((res) => {
            console.log(res)
            res.data.map(i => 
                {

                    if (i.type === 'entry') {
                        console.log(values)
                        values += parseFloat(i.value)
                    } else {
                        console.log(values)
                        values -= parseFloat(i.value)
                    }

                }
                
                )
            // console.log(values)
            setTotal(values)
            setData(res.data)
        })
    }


    React.useEffect(() => {
       
        renderHome()
    }, [])

    
    return (
        
        <HomeStyled >
            <DivOpacity0 edit={edit}>
            <Animated  className="divEdit" animationIn="bounceInDown" animationOut="bounceOutDown" animationInDuration={1000} animationOutDuration={1000} isVisible={true}>
                <DivEdit edit={edit}>
                <input 
                type="number"
                placeholder="Insira o valor" 
                value={editdata.value}
                onChange={e => setEditData({...editdata, value:e.target.value})}
                >

                </input>
                <input 
                type="text"
                placeholder="Insira a descrição"
                value={editdata.description}
                onChange={e => setEditData({...editdata, description:e.target.value})}
                ></input>
                <div>

                <Cancelar><MdCancel className="cancel" onClick={() => {
                    setEdit(!edit)
                }}></MdCancel></Cancelar>

                <Confirmar>{}<AiFillCheckCircle className="confirm" onClick={() => {
                    axios.put(`${process.env.REACT_APP_API_URL}/${editdata.id}`, {value:editdata.value, description:editdata.description}).then(resp => {
                        setEdit(!edit)
                        renderHome();
                        setEditData({value:"",description:"", id:""})
                    })
                }}></AiFillCheckCircle></Confirmar>
                </div>
                
                </DivEdit></Animated></DivOpacity0>
            
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

                            data.map(i => <Expense type={i.type}><h1>{i.date}</h1><h2>{i.description} </h2><h3>{`R$ ${i.value}`}</h3><div className="edit"> <span className="load
                            ">  <AiFillEdit  onClick={() => {
                                setEdit(true)
                                setEditData({...editdata, id: i._id})
                                console.log('teste')
                            }}></AiFillEdit></span>
                               <span className="load"> {load ?  <ThreeDots
                               className="loader"
                                            height="100%"
                                            width="50%"
                                            align-items="right"
                                            radius="9"
                                            color="red"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClassName=""
                                            visible={true}
                                    /> :   
                                    <AiFillDelete onClick={() => {
                                setLoad(!load)
                                axios.delete(`${process.env.REACT_APP_API_URL}/${i._id}`, config).then(res => {
                                    
                                    res.data.map(i => {

                                        if (i.type === 'entry') {
                                            values += parseFloat(i.value)
                                        } else {
                                            values -= parseFloat(i.value)
                                        }
                    
                                    })
                                    console.log(values)
                                    setTotal(values)
                                    setData(res.data)
                                    setLoad(false)
                                })


                            }} className="trash"></AiFillDelete>}</span>
                           

                            </div> </Expense>

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


const DivOpacity0= styled.div`
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    position: absolute;
    z-index: 3;
    opacity: 0.5;
    display: ${props => props.edit ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    padding-left: 24px;
    padding-right: 24px;
    .divEdit{
        width: 100%;
    }
`

const DivEdit= styled.div`

width: 100%;
height: 200px;
z-index: 4;
opacity: 1;
display: ${props => props.edit ? "flex" : "none"};
flex-direction: column;
input{
    height: 33%;
    border-radius: 10px;
    text-align: center;
    &::placeholder{
    font-size: 20px;
    text-align: center;
}
}
div{
    height: 33%;
}


`
const Confirmar = styled.button`
 height: 100%;
    width: 50%;
    background-color: #3a9a1f;
    border-radius: 10px;
    .confirm{
        color:green;
        font-size: 50px;
        background-color: white;
        border-radius: 50%;
    }
`
const Cancelar = styled.button`
 height: 100%;
    width: 50%;
    background-color: #3a9a1f;
    border-radius: 10px;
    .cancel{
        color:red;
        font-size: 50px;
        background-color: white;
        border-radius: 50%;
    }
`


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
padding: 5px;
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
   

    h3{
        color: ${props => props.type === 'entry' ? '#03AC00' : '#C70000'} ;
        width: 20%;
        text-align: left;
    }
    h2{
        text-align: left;
        color: #000000;
        width: 20%;
        overflow-x: auto;
    }
    h1{
        color: #C6C6C6;
        width: 20%;
        text-align: left;
    }
.edit{
    display: flex;
    justify-content: space-between;
    width: 20%;
    .trash{
        color:red;
    }
    .load{
        width: 50%;
        text-align: center;
        justify-content: center;
        align-items: center;
        display:flex;
        .loader{

            background-color: none;
        }
    }
}
`

const HomeStyled = styled.div`
position: relative;
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