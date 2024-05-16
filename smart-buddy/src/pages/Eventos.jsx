import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";

function Eventos() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const email = localStorage.getItem("userEmail");
  const urlEventos = `http://localhost:80/events/owner/${email}`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(urlEventos);
        if (response.ok) {
          const data = await response.json();
          setEvents(sortEventsByDate(data));
        } else {
          console.error("Failed to fetch events:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEvents();
  }, [email, urlEventos]);

  const sortEventsByDate = (events) => {
    return events.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(`${urlEventos}/${eventId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setEvents(
          sortEventsByDate(events.filter((event) => event._id !== eventId))
        );
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
      const response = await fetch(`${urlEventos}/${updatedEvent._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });
      if (response.ok) {
        setEvents(
          sortEventsByDate(
            events.map((event) =>
              event._id === updatedEvent._id ? updatedEvent : event
            )
          )
        );
        setIsEditModalOpen(false);
        console.log("Event updated successfully");
      } else {
        console.error("Failed to update event:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCreateEvent = async (newEvent) => {
    const email = localStorage.getItem("userEmail");
    newEvent.owner = email;

    try {
      const response = await fetch("http://localhost:80/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      if (response.ok) {
        const createdEvent = await response.json();
        setEvents(sortEventsByDate([...events, createdEvent]));
        setIsCreateModalOpen(false);
        console.log("Event created successfully");
      } else {
        console.error("Failed to create event:", response.statusText);
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

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
  };

  const confirmDelete = () => {
    handleDeleteEvent(selectedEvent._id);
    closeDeleteModal();
  };

  return (
    <div>
      <Header />
      <main className="main_eventos">
        <button className="button" onClick={openCreateModal}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <div className="events-list">
          {events.map((event) => (
            <Event
              key={event._id}
              event={event}
              onDelete={() => openDeleteModal(event)}
              onEdit={() => openEditModal(event)}
            />
          ))}
        </div>

        {isEditModalOpen && (
          <EditEventModal
            event={selectedEvent}
            onClose={closeEditModal}
            onSave={handleEditEvent}
          />
        )}

        {isCreateModalOpen && (
          <CreateEventModal
            onClose={closeCreateModal}
            onSave={handleCreateEvent}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteEventModal
            event={selectedEvent}
            onClose={closeDeleteModal}
            onConfirm={confirmDelete}
          />
        )}
      </main>
    </div>
  );
}

const Event = ({ event, onDelete, onEdit }) => {
  const diaDoMes = Number(event.date.substring(8, 10));
  const nomesMes = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
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
      </div>
      <div className="colBotoes">
        <button className="botaoDelete" onClick={onDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="botaoEdit" onClick={onEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
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
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <label>
            Duration (hours):
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const CreateEventModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: "",
  });

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
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <label>
            Duration (hours):
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const DeleteEventModal = ({ event, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Deseja apagar o evento "{event.title}"?</p>
        <button onClick={onConfirm}>Sim, apagar</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Eventos;
