import { Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import React, { useState } from 'react';

import 'dotenv/config'

function Login() {
/*
function handleSubmit () {
  alert('oi')
}



const [showMessage, setShowMessage] = useState(false);
const urlBase = process.env.URL_BASE_API

const handleClick =  async () => {
  setShowMessage(true);
//TODO ARRUMAR ESSAS VARIÁVEIS
  //await axios.post('http://localhost:3000/contatos', {
    await axios.post(`${urlBase}/contatos`, {
    nome: "Teste url env",
    email: "oi@email.com",
    telefone: "111231342",
    foto: "#"
  }) 
}

  return (
    <div>
      <Header />
      <main className="main_home">
        <h1>Login</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          rem ipsum tempora, distinctio nobis, deserunt odio quia voluptate
          sequi nam sunt quo earum ab.
        </p>
        <div className="cadastro-login">
          <div className="rodape-form-login">
            <form className="form-login" onSubmit={handleClick}>
              <div className="email-senha-inputs">
                {" "}
                <div>
                  <label htmlFor="email">E-mail:</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div>
                  <label htmlFor="password">Senha:</label>
                  <input type="password" id="password" name="password" />
                </div>
              </div>
              <div className="espaco"></div>
              <div>                
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
          <div className="criar-conta-cancelar">
            <Link to="/cadastro">Criar conta</Link>{" "}
            <Link to="/">Cancelar</Link>{" "}
          </div>
        </div>
      </main>
    </div>
  );
  */

  return (
    <>
    <p>login</p>
    </>
  )
}

export default Login;
