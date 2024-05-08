import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
//require("dotenv/config");
//require('dotenv').config();

function Eventos() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Função para obter os eventos do endpoint
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/events");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEvents(); // Chama a função para obter os eventos ao montar o componente
  }, []);

  return (
    <div>
      <Header />
      <main className="main_eventos">
        <button>+</button>
        <h1>Eventos</h1>

        <div className="cadastro-login">
          <Link to="/cadastro">Criar conta</Link>{" "}
          <Link to="/login">Login</Link>{" "}
        </div>

        {/* Renderiza os eventos */}
        <div className="events-list">
          {events.map((event) => (
            <Event key={event._id} event={event} />
          ))}
        </div>
      </main>
    </div>
  );
}

// Componente Event para exibir um evento individual
const Event = ({ event }) => {
  return (
    <div className="event">
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Duration: {event.duration} hours</p>
      <p>Owner: {event.owner}</p>
    </div>
  );
};

export default Eventos;
