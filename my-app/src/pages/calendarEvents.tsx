import { useEffect, useState } from "react";

export type Event = {
  id: number;
  title: string;
  eventDate: Date
  startTime: Date;
  endTime: Date;
  creator: {name: string};
};

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading, error };
}
