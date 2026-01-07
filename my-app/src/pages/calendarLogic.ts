import { addDays, startOfWeek } from "date-fns";

const StartOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

export type Event = {
  EventName: string;
  EventTimeStart: Date;
  EventTimeEnd: Date;
};

export type DateAndEvents = {
  date: Date;
  events: Event[];
  addDays(date: Date, jump: number): DateAndEvents;
};

const EventDates: DateAndEvents = {
  date: StartOfCurrentWeek,
  events: [],
  addDays(date: Date, jump: number): DateAndEvents {
    return {
      ...this,
      date: addDays(date, jump),
    };
  },
};

export const DatesThatShow: DateAndEvents[] = [
  EventDates,
  EventDates.addDays(StartOfCurrentWeek, 1),
  EventDates.addDays(StartOfCurrentWeek, 2),
  EventDates.addDays(StartOfCurrentWeek, 3),
  EventDates.addDays(StartOfCurrentWeek, 4),
  EventDates.addDays(StartOfCurrentWeek, 5),
  EventDates.addDays(StartOfCurrentWeek, 6),
];

export const days = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
