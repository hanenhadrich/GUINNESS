import React from 'react';

const SubscriptionCalendar7Days = ({ filterType, subscriptions }) => {
  const groupedSubscriptions = subscriptions
    .filter((sub) => sub.type === filterType)
    .reduce((groups, sub) => {
      const startKeyDate = new Date(sub.startDate);
      startKeyDate.setHours(0, 0, 0, 0);
      const startKey = startKeyDate.toLocaleDateString('fr-CA');
      if (!groups[startKey]) groups[startKey] = [];
      groups[startKey].push(sub);
      return groups;
    }, {});

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

  const sortedEntries = Object.entries(groupedSubscriptions).sort(
    ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
  );

  const styles = {
    tableContainer: {
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      borderRadius: '10px',
      overflow: 'hidden',
    },
    table: {
      width: '100%',
      fontSize: '0.9rem',
      borderCollapse: 'collapse',
    },
    thead: {
      background: 'linear-gradient(90deg, #deeafb, #d6e4f0)',
      color: '#1e3a8a',
      fontWeight: '600',
    },
    th: {
      padding: '10px 8px',
      borderBottom: '1px solid #cbd5e1',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
    td: {
      padding: '8px 6px',
      borderBottom: '1px solid #e2e8f0',
      minWidth: '40px',
    },
    rowHover: {
      cursor: 'default',
      transition: 'background-color 0.2s ease',
    },
  };

  return (
    <div className="container my-4 mb-5">
      {sortedEntries.map(([startKey, subs], index) => {
        const startDate = new Date(startKey);
        const maxEndDate = new Date(
          Math.max(...subs.map((s) =>
            new Date(s.startDate).getTime() + s.duration * 86400000
          ))
        );
        const dateRange = getDateRange(startDate, maxEndDate);

        return (
          <div key={startKey} className={`mb-5 ${index === sortedEntries.length - 1 ? 'mb-5' : ''}`}>
            <h5 className="mb-3" style={{ color: '#1e3a8a', fontWeight: 'bold' }}>
              Début des abonnements : {startDate.toLocaleDateString('fr-FR')}
            </h5>
            <div style={styles.tableContainer}>
              <table style={styles.table} className="text-center align-middle mb-2" >
                <thead style={styles.thead}>
                  <tr>
                    <th style={{ ...styles.th, textAlign: 'left' }}>Adhérent</th>
                    {dateRange.map((date, i) => (
                      <th key={i} style={styles.th}>
                        {date.toLocaleDateString('fr-FR')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subs.map((sub) => {
                    const subStart = new Date(sub.startDate);
                    const subEnd = new Date(subStart.getTime() + sub.duration * 86400000);
                    const adherentName = sub.adherent
                      ? `${sub.adherent.nom || ''} ${sub.adherent.prenom || ''}`.trim()
                      : 'Inconnu';

                    return (
                      <tr
                        key={sub._id}
                        style={styles.rowHover}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                      >
                        <td style={{ ...styles.td, textAlign: 'left', fontWeight: '600' }}>
                          {adherentName}
                        </td>
                        {dateRange.map((date, j) => {
                          const isActive = date >= subStart && date <= subEnd;
                          const isPast = date < today;

                          let bgColor = '';
                          let textColor = '';
                          if (isActive) {
                            if (isPast) {
                              bgColor = '#a0aec0'; 
                              textColor = '#2d3748'; 
                            } else {
                              bgColor = '#4dabf7'; 
                              textColor = 'white';
                            }
                          }

                          return (
                            <td
                              key={j}
                              style={{
                                ...styles.td,
                                backgroundColor: bgColor,
                                color: textColor,
                                borderRadius: isActive ? '6px' : '0',
                              }}
                            />
                          );
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
