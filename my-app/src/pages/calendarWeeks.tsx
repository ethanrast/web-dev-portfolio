import { useState } from "react";
import { DatesThatShow } from "./calendarLogic";

export function useCalendar() {
  const [dates, setDates] = useState(DatesThatShow);

  function nextWeek() {
    setDates(prev => prev.map(d => d.addDays(d.date, 7)));
  }

  function prevWeek() {
    setDates(prev => prev.map(d => d.addDays(d.date, -7)));
  }

  return {
    dates,
    nextWeek,
    prevWeek,
  };
}
