function Event({ event }) {
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
}

export default Event;
