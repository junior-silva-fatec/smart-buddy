import { Link } from "react-router-dom";
import Header from "../components/Header";

function Login() {
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
                <Link to="/eventos"><button type="submit">Login</button></Link>
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
}

export default Login;
