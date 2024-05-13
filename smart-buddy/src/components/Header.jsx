import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage(""); // Limpar mensagem de erro ao fechar o modal
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        // Redirecionar para a página de eventos
        window.location.href = "/eventos";
      } else {
        // Exibir mensagem de erro se a resposta não for 200
        const data = await response.json();
        window.location.href = "/eventos";
        setErrorMessage(data.message || "Ocorreu um erro durante o login.");
      }
    } catch (error) {
      // Exibir mensagem de erro se houver erro na requisição
      setErrorMessage("Ocorreu um erro durante o login.");
    }
  };

  return (
    <div id="header">
            <Link to="/">
        <h2>Smart Buddy</h2>
      </Link>{" "}
      <button onClick={handleLoginClick}>Login</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
              </div>
              {errorMessage && <p className="error">{errorMessage}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;



"https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/login"