import { useState, useEffect } from "react";
import EventAddPopUp from "./EventAddPopUp";
import EventPopUp from "./EventPopUp";
import EventEditPopUp from "./EventEditPopUp";
function EventslistAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const handleDeleteEvent = async (eventId: number) => {
    try {
      const res = await fetch(`http://localhost:5189/api/Event/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      // Remove the deleted event from the state
      setEvents(events.filter((event: any) => event.id !== eventId));
    } catch (err) {
      console.error(err);
      setError("Error deleting event");
    }
  }

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("http://localhost:5189/api/Event", {
          credentials: "include",
        });

        if (!res.ok) {
          setError("Failed to load events");
          return;
        }

        const data = await res.json();
        setEvents(data);
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
    <div className="row g-3 align-items-start">
      <div className="col-12 col-lg-8">
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <h5 className="m-0">Upcoming Events</h5>
          </div>

          <div className="card-body p-0">
            {loading && <p className="text-center p-3 m-0">Loading events...</p>}
            {error && <p className="text-danger text-center p-3 m-0">{error}</p>}

            {!loading && !error && (
              <ul
                className="list-group list-group-flush overflow-auto"
                style={{ maxHeight: "70vh" }}
              >
                {events.map((event: any, index: number) => (
                  <li key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <div className="fw-bold">{event.title}</div>
                        <div className="text-muted small">
                          {event.startTime?.split("T")[0]}
                        </div>
                        <p className="mb-1">{event.description}</p>
                        <div className="d-flex">
                          <EventEditPopUp event={event} />
                          <button className="btn btn-danger ms-2" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                        </div>
                      </div>

                      <EventPopUp {...event} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="m-0">Admin Tools</h5>
          </div>
          <div className="card-body">
            <p className="text-muted small mb-3">
              Create a new event. It will appear in the list after refresh.
            </p>

            <EventAddPopUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventslistAdmin;
