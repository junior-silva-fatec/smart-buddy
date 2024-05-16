import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import bcrypt from "bcryptjs"; // Para hash da senha
import Modal from "react-modal"; // Biblioteca para criar modais

Modal.setAppElement("#root"); // Defina o elemento raiz para acessibilidade

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash da senha
      const response = await fetch("http://localhost:80/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: hashedPassword,
        }),
      });
      if (response.ok) {
        console.log("Usuário criado com sucesso");
        closeModal();
      } else {
        console.error("Erro ao criar usuário");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

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
          <button onClick={openModal} className="button">
            Criar Conta
          </button>
          <Link to="/login" className="button">
            Login
          </Link>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Criar Conta"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Criar Conta</button>
          <button type="button" onClick={closeModal}>
            Cancelar
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Home;
