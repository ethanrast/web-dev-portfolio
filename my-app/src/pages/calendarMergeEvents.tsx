import { useMemo } from "react";
import { isSameDay } from "date-fns";
import { DateAndEvents } from "./calendarLogic";
import { useEvents } from "./calendarEvents";

export function useCalendarEvents(dates: DateAndEvents[]) {
  const { events, loading, error } = useEvents();

  const datesWithEvents = useMemo(() => {
    return dates.map(day => ({
      ...day,
      events: events
        .map(e => ({
          id: e.id,
          title: e.title,
          start: new Date(e.startTime),
          end: new Date(e.endTime),
          creatorName: e.creator.name,
        }))
        .filter(ev => isSameDay(ev.start, day.date))
        .sort((a, b) => a.start.getTime() - b.start.getTime()),


    }));
  }, [dates, events]);

  return { datesWithEvents, loading, error };
}
