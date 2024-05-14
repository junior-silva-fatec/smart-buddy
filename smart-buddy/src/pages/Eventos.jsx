import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

function Eventos() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
        setEvents(events.filter(event => event._id !== eventId));
        console.log("Event deleted successfully");
      } else {
        console.error("Failed to delete event:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com/events/${updatedEvent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedEvent)
        }
      );
      if (response.ok) {
        setEvents(events.map(event => (event._id === updatedEvent._id ? updatedEvent : event)));
        setIsEditModalOpen(false);
        console.log("Event updated successfully");
      } else {
        console.error("Failed to update event:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <Header />
      <main className="main_eventos">
        <button>+</button>

        <div className="events-list">
          {events.map((event) => (
            <Event key={event._id} event={event} onDelete={() => handleDeleteEvent(event._id)} onEdit={() => openEditModal(event)} />
          ))}
        </div>

        {isEditModalOpen && (
          <EditEventModal
            event={selectedEvent}
            onClose={closeEditModal}
            onSave={handleEditEvent}
          />
        )}
      </main>
    </div>
  );
}

const Event = ({ event, onDelete, onEdit }) => {
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
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

const EditEventModal = ({ event, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" name="title" value={formData.title} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={formData.description} onChange={handleChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <label>
            Time:
            <input type="time" name="time" value={formData.time} onChange={handleChange} />
          </label>
          <label>
            Duration (hours):
            <input type="number" name="duration" value={formData.duration} onChange={handleChange} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Eventos;
