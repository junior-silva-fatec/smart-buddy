import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Eventos() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/events"
        );
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

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/events/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove o evento excluído da lista de eventos
        setEvents(events.filter(event => event._id !== eventId));
        console.log("Event deleted successfully");
      } else {
        console.error("Failed to delete event:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header />
      <main className="main_eventos">
        <button>+</button>

        <div className="events-list">
          {events.map((event) => (
            <Event key={event._id} event={event} onDelete={() => handleDeleteEvent(event._id)} />
          ))}
        </div>
      </main>
    </div>
  );
}

const Event = ({ event, onDelete }) => {
  const diaDoMes = Number(event.date.substring(8, 10));
  const nomesMes = [
    "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"
  ];
  const mes = nomesMes[Number(event.date.substring(5, 7)) - 1];

  return (
    <div className="event">
      <div className="colDatasEvento">
        <p className="diaDoMes">{diaDoMes}</p>
        <p className="nomeMes">{mes}</p>
      </div>
      <div className="colHorario">
        <p>{event.time}</p>
        <p>{event.duration} hours</p>
      </div>
      <div className="colDescricaoEvento">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Eventos;
