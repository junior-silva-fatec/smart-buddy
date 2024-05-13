import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header"; // Importe o componente Header aqui

function Cadastro() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCadastroSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        setSuccessMessage("Cadastro realizado com sucesso.");
        setErrorMessage("");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Não foi possível fazer o cadastro.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Não foi possível fazer o cadastro.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Header /> {/* Renderize o componente Header aqui */}
      <main className="main_cadastro">
        <h1>Cadastro</h1>
        <p>Crie sua conta agora.</p>
        <div className="cadastro-login">
          <form className="form-login" onSubmit={handleCadastroSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="button-group">
              <button type="submit" className="button">
                Criar Conta
              </button>
            </div>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </div>
      </main>
    </div>
  );
}

export default Cadastro;





