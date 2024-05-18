import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Verificar se há um email do usuário armazenado no localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrorMessage(""); // Limpar mensagem de erro ao fechar o modal
  };

  const handleLogout = () => {
    // Remover o email do usuário do localStorage e atualizar o estado
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    // Redirecionar para a página inicial
    window.location.href = "/";
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(
        "https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        // Armazena o email do usuário no localStorage
        localStorage.setItem("userEmail", email);
        setUserEmail(email);
        // Fechar o modal
        handleCloseModal();
        // Redirecionar para a página de eventos
        window.location.href = "/eventos";
      } else {
        // Exibir mensagem de erro se a resposta não for 200
        const data = await response.json();
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
      {!userEmail ? (
        <button onClick={handleLoginClick}>Login</button>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modalLogin">
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
        </div>
      )}
    </div>
  );
}

export default Header;
