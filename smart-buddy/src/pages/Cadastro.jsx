import { Link } from "react-router-dom";
import Header from "../components/Header";
function Cadastro() {
  return (
    <div>
      <Header />
      <main className="main_home">
        <h1>Cadastro</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis rem ipsum tempora, distinctio nobis, deserunt odio quia voluptate sequi nam sunt quo earum ab. </p>
        <div className="cadastro-login">
            
        <Link to="/cadastro">Criar conta</Link>{" "}
        <Link to="/login">Login</Link>{" "}
        </div>
      </main>
    </div>
  );
}
export default Cadastro;
