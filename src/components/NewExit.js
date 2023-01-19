import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Animated } from "react-animated-css";
import env from 'react-dotenv';
import { HomeStyled } from "./Home";

export default function NewEntry(){
    return(
        <HomeStyled>
            <p className="title">Nova Saída</p>
            <div className="data">
                <input placeholder="Valor"></input>
                <input placeholder="Descrição"></input>
                <button>Salvar Saída</button>
            </div>
        </HomeStyled>
    )
}
