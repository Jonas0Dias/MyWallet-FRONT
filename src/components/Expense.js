import axios from "axios"
import React from "react"
import { ThreeDots } from "react-loader-spinner"
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import styled from "styled-components"

export default function Expense(props){

    const [load, setLoad] = React.useState(false)
    let values=props.total
    console.log(values)
    return(

        <ExpenseStyled type={props.type}>
        <h1>{props.date}</h1><h2>{props.description} </h2><h3 >{`R$ ${props.value}`}</h3><div className="edit"> <span className="load
                            ">  <AiFillEdit onClick={() => {
                                    props.setEdit(true)
                                    props.setEditData({ ...props.editdata, id: props.id })
                                    console.log('teste')
                                }}></AiFillEdit></span>
                                <span className="load"> {load ? <ThreeDots
                                    className="loader"
                                    height="100%"
                                    width="50%"
                                    align-items="right"
                                    radius="9"
                                    color="red"
                                    background="none"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{ backgroundColor: 'transparent' }}
                                    wrapperClassName=""
                                    visible={true}
                                /> :
                                    <AiFillDelete onClick={() => {
                                        setLoad(!load)
                                        axios.delete(`${process.env.REACT_APP_API_URL}/${props.id}`, props.config).then(res => {

                                            if(props.type === 'entry'){
                                                props.setTotal(values-props.value)
                                            }else{
                                                props.setTotal(values+props.value)
                                            }
                                            
                                            console.log(values)
                                            props.setData(res.data)
                                            setLoad(false)
                                        })


                                    }} className="trash"></AiFillDelete>}</span>


                            </div> 
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
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
        background-color: none;

       
    }
}
`
