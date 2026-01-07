import { useEffect, useMemo, useState } from "react";
import Navigation from "../nav-components/NavigationUser";
import PageTitle from "../components/PageTitle";

type Status = "Office" | "Remote" | "Absent";

type Row = {
  id: string;
  date: string;
  day: string;
  status: Status;
  in?: string;
  out?: string;
  dbId?: number;
};

type AttendanceApiItem = {
  id: number;
  userId: number;
  date: string;
  status: Status;
  checkIn: string | null;
  checkOut: string | null;
};

const API_BASE = "http://localhost:5189";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function toISODateOnly(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function toDateOnly(iso: string) {
  return iso.split("T")[0];
}
function toHHmm(time: string) {
  return time.slice(0, 5);
}
function startOfWeekMonday(d: Date) {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  const dow = (copy.getDay() + 6) % 7;
  copy.setDate(copy.getDate() - dow);
  return copy;
}
function addDays(d: Date, days: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
}
function addWeeks(d: Date, weeks: number) {
  return addDays(d, weeks * 7);
}
function addMonths(d: Date, months: number) {
  const copy = new Date(d);
  copy.setMonth(copy.getMonth() + months);
  return copy;
}

function buildWeekRows(weekStartMonday: Date): Row[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const rows: Row[] = [];
  for (let i = 0; i < 5; i++) {
    const d = addDays(weekStartMonday, i);
    const iso = toISODateOnly(d);
    rows.push({
      id: iso,
      date: iso,
      day: days[i],
      status: "Office",
      in: "09:00",
      out: "17:00",
    });
  }
  return rows;
}

export default function Attendance() {
  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeekMonday(new Date()));

  const [rows, setRows] = useState<Row[]>(() => buildWeekRows(startOfWeekMonday(new Date())));

  const [allAttendance, setAllAttendance] = useState<AttendanceApiItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/OfficeAttendance`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Failed to fetch attendance:", await res.text());
          setLoading(false);
          return;
        }

        const data: AttendanceApiItem[] = await res.json();
        setAllAttendance(data);
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const base = buildWeekRows(weekStart);

    setRows(
      base.map((row) => {
        const saved = allAttendance.find((item) => toDateOnly(item.date) === row.date);
        if (!saved) return row;

        return {
          ...row,
          status: saved.status as Status,
          dbId: saved.id,
          in: saved.checkIn ? toHHmm(saved.checkIn) : row.in,
          out: saved.checkOut ? toHHmm(saved.checkOut) : row.out,
        };
      })
    );
  }, [weekStart, allAttendance]);

  const upsertLocalCache = (item: AttendanceApiItem) => {
    setAllAttendance((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = item;
        return copy;
      }
      return [...prev, item];
    });
  };

  const saveToBackend = async (
    date: string,
    status: Status,
    checkIn?: string,
    checkOut?: string,
    dbId?: number
  ) => {
    const payload = {
      date,
      status,
      checkIn: status === "Office" ? (checkIn ?? null) : null,
      checkOut: status === "Office" ? (checkOut ?? null) : null,
    };

    try {
      if (dbId) {
        const res = await fetch(`${API_BASE}/api/OfficeAttendance/${dbId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Failed to update attendance:", await res.text());
          return;
        }

        const updated: AttendanceApiItem = await res.json();
        upsertLocalCache(updated);
      } else {
        const res = await fetch(`${API_BASE}/api/OfficeAttendance`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error("Failed to create attendance:", await res.text());
          return;
        }

        const created: AttendanceApiItem = await res.json();
        upsertLocalCache(created);
      }
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const setRow = (id: string, patch: Partial<Row>) => {
    setRows((list) =>
      list.map((r) => {
        if (r.id !== id) return r;

        const updated: Row = { ...r, ...patch };

        if (patch.status && patch.status !== r.status) {
          const nextIn = patch.status === "Office" ? updated.in ?? "09:00" : "";
          const nextOut = patch.status === "Office" ? updated.out ?? "17:00" : "";
          const finalRow: Row = { ...updated, in: nextIn, out: nextOut };

          saveToBackend(finalRow.date, finalRow.status, finalRow.in, finalRow.out, finalRow.dbId);
          return finalRow;
        }

        if (patch.in !== undefined || patch.out !== undefined) {
          if (updated.dbId) {
            saveToBackend(updated.date, updated.status, updated.in, updated.out, updated.dbId);
          } else if (updated.status === "Office") {
            saveToBackend(updated.date, updated.status, updated.in, updated.out, undefined);
          }
        }


        return updated;
      })
    );
  };

  const setAllStatus = (status: Status) => {
    setRows((prev) =>
      prev.map((r) => {
        const nextRow: Row =
          status === "Office"
            ? { ...r, status, in: r.in || "09:00", out: r.out || "17:00" }
            : { ...r, status, in: "", out: "" };

        saveToBackend(nextRow.date, nextRow.status, nextRow.in, nextRow.out, nextRow.dbId);
        return nextRow;
      })
    );
  };

  const goPrevWeek = () => setWeekStart((d) => startOfWeekMonday(addWeeks(d, -1)));
  const goNextWeek = () => setWeekStart((d) => startOfWeekMonday(addWeeks(d, 1)));

  const goPrevMonth = () =>
    setWeekStart((d) => {
      const firstOfThisMonth = new Date(d.getFullYear(), d.getMonth(), 1);
      const firstOfPrevMonth = addMonths(firstOfThisMonth, -1);
      return startOfWeekMonday(firstOfPrevMonth);
    });

  const goNextMonth = () =>
    setWeekStart((d) => {
      const firstOfThisMonth = new Date(d.getFullYear(), d.getMonth(), 1);
      const firstOfNextMonth = addMonths(firstOfThisMonth, 1);
      return startOfWeekMonday(firstOfNextMonth);
    });

  const weekLabel = useMemo(() => {
    const start = toISODateOnly(weekStart);
    const end = toISODateOnly(addDays(weekStart, 4));
    return `${start} → ${end}`;
  }, [weekStart]);

  if (loading) {
    return (
      <div className="App row">
        <Navigation />
        <div className="container col-md-9 py-3 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App row ">
      <Navigation />
      <div className="container col-md-9 py-3">
        <PageTitle name="Attendance" />

        {/* Week/Month navigation */}
        <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
          <button className="btn btn-outline-secondary" onClick={goPrevMonth}>
            ◀ Prev Month
          </button>
          <button className="btn btn-outline-secondary" onClick={goPrevWeek}>
            ◀ Prev Week
          </button>

          <div className="mx-2 fw-semibold">{weekLabel}</div>

          <button className="btn btn-outline-secondary" onClick={goNextWeek}>
            Next Week ▶
          </button>
          <button className="btn btn-outline-secondary" onClick={goNextMonth}>
            Next Month ▶
          </button>

          <div className="ms-auto d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-primary" onClick={() => setAllStatus("Office")}>
              All Office
            </button>
            <button className="btn btn-outline-primary" onClick={() => setAllStatus("Remote")}>
              All Remote
            </button>
            <button className="btn btn-outline-primary" onClick={() => setAllStatus("Absent")}>
              All Absent
            </button>
          </div>
        </div>

        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: 120 }}>Date</th>
              <th style={{ width: 80 }}>Day</th>
              <th style={{ width: 160 }}>Status</th>
              <th style={{ width: 140 }}>Check-in</th>
              <th style={{ width: 140 }}>Check-out</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <span className="badge bg-dark">{r.date}</span>
                </td>
                <td>{r.day}</td>
                <td>
                  <select
                    className="form-select"
                    value={r.status}
                    onChange={(e) => setRow(r.id, { status: e.target.value as Status })}
                  >
                    <option>Office</option>
                    <option>Remote</option>
                    <option>Absent</option>
                  </select>
                </td>
                <td>
                  <input
                    type="time"
                    className="form-control"
                    value={r.in || ""}
                    onChange={(e) => setRow(r.id, { in: e.target.value })}
                    disabled={r.status !== "Office"}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    className="form-control"
                    value={r.out || ""}
                    onChange={(e) => setRow(r.id, { out: e.target.value })}
                    disabled={r.status !== "Office"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-muted small">Changes are saved automatically to the database.</p>
      </div>
    </div>
  );
}
