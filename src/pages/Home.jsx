import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import bcrypt from "bcryptjs"; // For password hashing
import Modal from "react-modal"; // Library for creating modals

//Modal.setAppElement("#root"); // Set the root element for accessibility

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  //const urlAPI = process.env.REACT_APP_API_URL;
  const urlAPI =
    "https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com";
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
      const hashedPassword = await bcrypt.hash(formData.password, 10); // Hash the password
      const response = await fetch(`${urlAPI}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: hashedPassword,
        }),
      });
      if (response.ok) {
        console.log("User created successfully");
        closeModal();
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <h1>Smart Buddy</h1>
        <p>Organize seu tempo, transforme sua vida.</p>
        <div className="button-group">
          <button onClick={openModal} className="button">
            Criar Conta
          </button>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Criar Conta"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>Criar Conta</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Sobrenome:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
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
              Senha:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <div className="confirm-cancel-buttons">
              <button type="submit">Criar Conta</button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
