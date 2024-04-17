import { Link } from "react-router-dom";
import Header from "../components/Header";
function Cadastro() {
  return (
    <div>
      <Header />
      <main className="main_cadastro">
        <h1>Cadastro</h1>
        <p>Crie sua conta agora. </p>
        <div className="cadastro-login">
        <div className="rodape-form-login">
            <form className="form-login">
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
                <button type="submit">Criar conta</button>
              </div>
            </form>
          </div>
          
        </div>
      </main>
    </div>
  );
}
export default Cadastro;