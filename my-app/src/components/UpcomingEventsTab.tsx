import { useState, useEffect } from "react";
import EventPopUp from "./EventPopUp";
import { useAuth } from "../context/AuthContext";
function UpcomingEventsTab() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5189/api/Event", {
          credentials: "include",
        });

        if (!res.ok) {
          setError("Failed to load events");
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log(data);
        const attendedEvents = data.filter(
  (event: any) => event.participants.some((participant: any) => participant.userId === user?.id)
);
        setEvents(attendedEvents);
      } catch (err) {
        console.error(err);
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="upcomingEvents col-md-6">
      <h2 className="bg-dark rounded-top text-white p-2 m-0">Upcoming Events</h2>

      <div className="eventList">
        {loading && <p className="text-center p-3">Loading events...</p>}
        {error && <p className="text-danger text-center p-3">{error}</p>}

        {!loading && !error && (
          <ul className="rounded-bottom list-group overflow-auto"
          style={{ maxHeight: "70vh" }}>
            {events.map((event: any, index: number) => (
              <li key={index} className="list-group-item">
                <strong>{event.title}</strong>
                <p>Event Start time: {event.startTime?.split("T")[0]}</p>
                <p>Description: {event.description}</p>
                <p>Created by: {event.creator.name}</p>


                <EventPopUp {...event} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UpcomingEventsTab;
