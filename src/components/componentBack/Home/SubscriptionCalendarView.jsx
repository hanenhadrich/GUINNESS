import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import '../../../css/subscriptionCalendar.css';
const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTH_NAMES = [
  "Janvier","Février","Mars","Avril","Mai","Juin",
  "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
];

const createTooltip = (subs) => {
  if (!subs || subs.length === 0) return "";
  const counts = subs.reduce((acc, sub) => {
    acc[sub.type] = (acc[sub.type] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([type, count]) => `${count} abonnement${count > 1 ? "s" : ""} (${type})`)
    .join("\n");
};

function SubscriptionCalendarView({ subscriptions }) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) { newMonth = 11; newYear -= 1; }
    if (newMonth > 11) { newMonth = 0; newYear += 1; }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekDay = firstDay.getDay();
    const offset = startWeekDay === 0 ? 6 : startWeekDay - 1;
    return Array.from(
      { length: Math.ceil((offset + daysInMonth) / 7) * 7 },
      (_, i) => i - offset + 1
    ).map((d) => (d > 0 && d <= daysInMonth ? d : null));
  }, [currentYear, currentMonth]);

  const subsByDay = useMemo(() => {
    const map = {};
    subscriptions
      .filter((s) => s.startDate)
      .forEach((s) => {
        const d = new Date(s.startDate);
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
          const day = d.getDate();
          map[day] = [...(map[day] || []), s];
        }
      });
    return map;
  }, [subscriptions, currentYear, currentMonth]);

  return (
    <div className=" subscription-calendar container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="d-flex align-items-center">
          <Calendar className="me-2 fs-3" />
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h4>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-primary me-2" onClick={() => changeMonth(-1)}>
            <ChevronLeft />
          </button>
          <button className="btn btn-outline-primary me-2" onClick={() => changeMonth(1)}>
            <ChevronRight />
          </button>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>{DAYS.map((d) => <th key={d}>{d}</th>)}</tr>
        </thead>
        <tbody>
          {Array.from({ length: calendarDays.length / 7 }, (_, w) => (
            <tr key={w}>
              {calendarDays.slice(w * 7, w * 7 + 7).map((day, i) => {
                if (!day) return <td key={i} className="bg-light"></td>;
                const subs = subsByDay[day] || [];
                return (
                  <td
                    key={i}
                    className={`p-2 ${subs.length ? "bg-info text-white" : ""}`}
                    title={createTooltip(subs)}
                  >
                    <strong>{day}</strong>
                    {subs.length > 0 && (
                      <div className="calendar-day-count">
                        {subs.length} abonnement{subs.length > 1 ? "s" : ""}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

SubscriptionCalendarView.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      startDate: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
};

export default SubscriptionCalendarView;
