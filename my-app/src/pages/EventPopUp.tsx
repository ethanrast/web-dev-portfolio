import { format } from "date-fns";
import "./Calendar.css";
import { useEffect, useState } from "react";

type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  creatorName: string;
};

type Props = {
  event: CalendarEvent;
  onClose: () => void;
};

const API_BASE = "http://localhost:5189/api/Event";

function EventPopUp({ event, onClose }: Props) {
  const [isAttending, setIsAttending] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1️⃣ Check attendance on open
  useEffect(() => {
    const checkAttendance = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/${event.id}/check`,
          { credentials: "include" }
        );

        if (!res.ok) throw new Error("Check failed");

        const result: boolean = await res.json();
        setIsAttending(result);
      } catch {
        setError("Could not load attendance status");
      }
    };

    checkAttendance();
  }, [event.id]);

  // 2️⃣ Attend
  const attendEvent = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/${event.id}/attend`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Attend failed");

      setIsAttending(true);
    } catch {
      setError("Could not attend event");
    } finally {
      setLoading(false);
    }
  };

  const cancelAttendance = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/${event.id}/cancel`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Cancel failed");

      setIsAttending(false);
    } catch {
      setError("Could not cancel attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="black_overlay" onClick={onClose} />

      <div className="white_content">
        <h2>{event.title}</h2>
        <h3>ID: {event.id}</h3>

        <p>
          {format(event.start, "HH:mm")} – {format(event.end, "HH:mm")}
        </p>

        <p>Created by: {event.creatorName}</p>

        {isAttending === null && <p>Checking attendance...</p>}
        {isAttending === true && <p className="yes">✅ You are attending</p>}
        {isAttending === false && <p className="no">❌ You are not attending</p>}
        {error && <p className="error">{error}</p>}

        {isAttending !== null && (
          <button
            disabled={loading}
            onClick={isAttending ? cancelAttendance : attendEvent}
          >
            {loading
              ? "Processing..."
              : isAttending
              ? "Cancel Attendance"
              : "Attend Event"}
          </button>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}

export default EventPopUp;
