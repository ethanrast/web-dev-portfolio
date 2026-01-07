import { useState } from "react";
import Navigation from "../nav-components/NavigationUser";
import { days, months } from "./calendarLogic";
import { useCalendar } from "./calendarWeeks";
import { useCalendarEvents } from "./calendarMergeEvents";
import { format } from "date-fns";

import "./Calendar.css";
import EventPopUp from "./EventPopUp";

type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  creatorName: string;
};

function Calendar() {
  const { dates, nextWeek, prevWeek } = useCalendar();
  const { datesWithEvents, error } = useCalendarEvents(dates);

  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEvent | null>(null);

  if (error) return <div>{error}</div>;

  return (
    <div className="App row">
      <Navigation />

      <div className="container col-md-9 py-3">
        <div className="calendar-controls">
          <button onClick={prevWeek}>Prev Week</button>
          <button onClick={nextWeek}>Next Week</button>
        </div>

        <h1 className="calendar-year">
            {format(datesWithEvents[0].date, "yyyy MMMM")}

        </h1>

        <div className="calendar-grid">
          {datesWithEvents.map((d, dayIndex) => (
            <div key={dayIndex} className="box">
              <div className="calendar-day-header">
                {days[d.date.getDay()]} {d.date.getDate()}    {months[d.date.getMonth()]}
              </div>

              {d.events.map((e) => (
                <div
                  key={e.id}
                  className="calendar-event"
                  onClick={() => setSelectedEvent(e)}
                >
                  <div className="calendar-event-title">{e.title}</div>
                  <div className="calendar-event-time">
                    {format(e.start, "HH:mm")} – {format(e.end, "HH:mm")}
                  </div>
                  <div className="calendar-event-creator">
                    {e.creatorName}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventPopUp
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default Calendar;
