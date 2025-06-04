import React from 'react';

const SubscriptionCalendar7Days = ({ filterType, subscriptions }) => {
  // Grouper les abonnements par date de début (en évitant le décalage UTC)
  const groupedSubscriptions = subscriptions
    .filter((sub) => sub.type === filterType)
    .reduce((groups, sub) => {
      const startKeyDate = new Date(sub.startDate);
      startKeyDate.setHours(0, 0, 0, 0);
      const startKey = startKeyDate.toLocaleDateString('fr-CA'); // format YYYY-MM-DD

      if (!groups[startKey]) groups[startKey] = [];
      groups[startKey].push(sub);
      return groups;
    }, {});

  // Fonction utilitaire pour générer un tableau de dates entre deux dates
  const getDateRange = (start, end) => {
    const dates = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div style={{ margin: '20px' }}>
      {Object.entries(groupedSubscriptions).map(([startKey, subs]) => {
        const startDate = new Date(startKey);
        const maxEndDate = new Date(
          Math.max(...subs.map((s) =>
            new Date(s.startDate).getTime() + s.duration * 86400000
          ))
        );
        const dateRange = getDateRange(startDate, maxEndDate);

        return (
          <div key={startKey} className="mb-4 ">
            <h5>Début des abonnements : {startDate.toLocaleDateString()}</h5>
            <div className="table-responsive">
              <table className="table table-bordered text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Adhérent</th>
                    {dateRange.map((date, i) => (
                      <th key={i}>{date.toLocaleDateString()}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subs.map((sub) => {
                    const subStart = new Date(sub.startDate);
                    const subEnd = new Date(
                      subStart.getTime() + sub.duration * 86400000
                    );
                    const adherentName = sub.adherent
                      ? `${sub.adherent.nom || ''} ${sub.adherent.prenom || ''}`.trim()
                      : 'Inconnu';

                    return (
                      <tr key={sub._id}>
                        <td>{adherentName}</td>
                        {dateRange.map((date, j) => {
                          const isActive = date >= subStart && date <= subEnd;
                          const isPast = date < today;
                          const cellClass = isActive
                            ? isPast
                              ? 'bg-danger text-white'
                              : 'bg-success text-white'
                            : '';
                          return <td key={j} className={cellClass}></td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionCalendar7Days;
