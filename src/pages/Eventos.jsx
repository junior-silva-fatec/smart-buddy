import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the calendar CSS

function Eventos() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState([]);

  const email = localStorage.getItem("userEmail");
  const urlAPI =
    "https://web-qx4yu7fnv0m1.up-us-nyc1-k8s-1.apps.run-on-seenode.com";
  const urlEventos = `${urlAPI}/events/owner/${email}`;
  const urlEditEventos = `${urlAPI}/events`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(urlEventos);
        if (response.ok) {
          const data = await response.json();
          setEvents(sortEventsByDate(data));
          filterEventsByDate(new Date());
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
        filterEventsByDate(date);
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
      const response = await fetch(`${urlEditEventos}/${updatedEvent._id}`, {
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
        filterEventsByDate(date);
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
      const response = await fetch(`${urlAPI}/events`, {
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
        filterEventsByDate(date);
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

  const filterEventsByDate = (selectedDate) => {
    const filtered = events.filter((event) => {
      const eventDate = new Date(event.date);
  
      // Extrair componentes de data
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth();
      const selectedDay = selectedDate.getDate();
  
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate() + 1;
  
      console.log("Event Date:", eventYear, eventMonth, eventDay);
      console.log("Selected Date:", selectedYear, selectedMonth, selectedDay);
  
      return (
        eventYear === selectedYear &&
        eventMonth === selectedMonth &&
        eventDay === selectedDay
      );
    });
  
    console.log("Filtered Events:", filtered);
    setFilteredEvents(filtered);
  };
  
  
  
  
  
  

  const handleDateChange = (date) => {
    setDate(date);
    filterEventsByDate(date);
  };
  

  const showAllEvents = () => {
    setFilteredEvents(events);
  };

  return (
    <div>
      <Header />
      <main className="main_eventos">
        <button className="button" onClick={openCreateModal}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <button className="button" onClick={showAllEvents}>
          mostrar todos os eventos
        </button>

        <div className="events-container">
          <div className="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={date}
              locale="en-US" // Set the locale to ensure the week starts on Sunday
            />
          </div>

          <div className="events-list">
            {filteredEvents.map((event) => (
              <Event
                key={event._id}
                event={event}
                onDelete={() => openDeleteModal(event)}
                onEdit={() => openEditModal(event)}
              />
            ))}
          </div>
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
        <p>{event.duration} {event.duration >= 2 ? "horas": "hora"} </p>
      </div>
      <div className="colDescricaoEvento">
        <h2>{event.title}</h2>
        {/* <p>{event.description}</p> */}
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
    <div className="modal-overlay">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Editar Evento</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Descrição:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Data:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label>
            <label>
              Hora:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </label>
            <label>
              Duração (horas):
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </label>
            <div className="confirm-cancel-buttons">
              <button type="submit">Salvar</button>
              <button type="button" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Evento</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Data:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </label>
          <label>
            Hora:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </label>
          <label>
            Duração (horas):
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </label>
          <div className="confirm-cancel-buttons">
            <button type="submit">Criar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteEventModal = ({ event, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
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
