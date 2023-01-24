import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import Home from "./components/Home";
import NewEntry from "./components/NewEntry";
import NewExit from "./components/NewExit";
function App() {

  const[habilitado, setHabilitado] = React.useState(false)
  const [login, setLogin] = React.useState({email:'' , password:''})
  const [dadosusuario, setDadosUsuario] =  React.useState()
  const [dadosentrada, setDadosEntrada] = React.useState()
  const [dadossaida, setDadosSaida] = React.useState()
  


  return (

    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login habilitado={habilitado} setHabilitado={setHabilitado} login={login} setLogin={setLogin} dadosusuario={dadosusuario} setDadosUsuario={setDadosUsuario}></Login>}></Route>
      <Route path="/cadastro" element={<Cadastro habilitado={habilitado} setHabilitado={setHabilitado}></Cadastro>}></Route>
      <Route path="/home" element={<Home dadosentrada={dadosentrada} dadossaida={dadossaida} dadosusuario={dadosusuario}></Home>}></Route>
      <Route path="/nova-entrada" element={<NewEntry dadosentrada={dadosentrada} setDadosEntrada={setDadosEntrada} dadosusuario={dadosusuario} habilitado={habilitado} setHabilitado={setHabilitado}></NewEntry>}></Route>
      <Route path="/nova-saida" element={<NewExit dadossaida={dadossaida} setDadosSaida={setDadosSaida} dadosusuario={dadosusuario} habilitado={habilitado} setHabilitado={setHabilitado}></NewExit>}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
