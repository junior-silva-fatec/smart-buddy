import { Link } from "react-router-dom";
import Header from "../components/Header";

function Home() {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <h1>Welcome to Smart Buddy</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          nec feugiat velit. Nullam gravida tortor magna, eget tincidunt purus
          tempor eget.
        </p>
        <div className="button-group">
          <Link to="/cadastro" className="button">Criar Conta</Link>
          <Link to="/login" className="button">Login</Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
