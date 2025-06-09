import React, { useState, useMemo } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

function SubscriptionCalendarView({ filterType, subscriptions }) {
  // État du mois affiché : année et mois (0 = Janvier)
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth());

  // Changer le mois en avant ou arrière
  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Calcul des jours à afficher pour le calendrier (cases vides avant/fin)
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Jour de la semaine du 1er jour du mois (0=dimanche, 1=lundi...)
    const startWeekDay = firstDay.getDay();

    // On commence la grille par lundi (décaler dimanches à la fin)
    const offset = startWeekDay === 0 ? 6 : startWeekDay - 1;

    const totalBoxes = Math.ceil((offset + daysInMonth) / 7) * 7;

    const daysArray = [];

    for (let i = 0; i < totalBoxes; i++) {
      const dayNumber = i - offset + 1;
      if (dayNumber > 0 && dayNumber <= daysInMonth) {
        daysArray.push(dayNumber);
      } else {
        daysArray.push(null);
      }
    }

    return daysArray;
  }, [currentYear, currentMonth]);

  // Filtrer les abonnements par type et par date de début dans le mois affiché
  const subsByDay = useMemo(() => {
    const map = {};
    subscriptions
      .filter((sub) => sub.type === filterType && sub.startDate)
      .forEach((sub) => {
        const d = new Date(sub.startDate);
        if (d.getFullYear() === currentYear && d.getMonth() === currentMonth) {
          const day = d.getDate();
          if (!map[day]) map[day] = [];
          map[day].push(sub);
        }
      });
    return map;
  }, [subscriptions, filterType, currentYear, currentMonth]);

  // Format mois pour affichage
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>
          <Calendar className="me-2" />
          Calendrier mensuel - {filterType} - {monthNames[currentMonth]} {currentYear}
        </h3>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => changeMonth(-1)}
            aria-label="Mois précédent"
          >
            <ChevronLeft />
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => changeMonth(1)}
            aria-label="Mois suivant"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            {DAYS.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Construction des lignes (semaine par semaine) */}
          {Array.from({ length: calendarDays.length / 7 }).map((_, weekIndex) => (
            <tr key={weekIndex}>
              {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, i) => {
                const subs = day ? subsByDay[day] || [] : [];
                return (
                  <td
                    key={i}
                    className={subs.length > 0 ? 'bg-info text-white' : undefined}
                    style={{ verticalAlign: 'top', height: '100px', cursor: 'default' }}
                    title={
                      subs.length > 0
                        ? `${subs.length} abonnement${subs.length > 1 ? 's' : ''} ce jour`
                        : undefined
                    }
                  >
                    {day}
                    {subs.length > 0 && (
                      <div className="mt-1">
                        <span className="badge bg-light text-dark">
                          {subs.length} abonnement{subs.length > 1 ? 's' : ''}
                        </span>
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

export default SubscriptionCalendarView;
