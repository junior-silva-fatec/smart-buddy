import { Link } from "react-router-dom";
import Header from "../components/Header";

function Cadastro() {
  return (
    <div>
      <Header />
      <main className="main_cadastro">
        <h1>Cadastro</h1>
        <p>Crie sua conta agora.</p>
        <div className="cadastro-login">
          <form className="form-login">
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="button-group">
              <Link to="/eventos" className="button">
                Criar Conta
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Cadastro;
